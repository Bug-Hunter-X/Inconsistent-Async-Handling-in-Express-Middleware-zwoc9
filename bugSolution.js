const express = require('express');
const app = express();
const port = 3000;

const asyncMiddleware = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

app.get('/', asyncMiddleware(async (req, res) => {
  const data = await someAsyncOperation(); // Simulate an async operation
  res.send(`Hello, world! Data: ${data}`);
}));

function someAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve('This is from async operation');
        }, 1000)
    })
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});