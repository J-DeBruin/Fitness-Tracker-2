const express = require('express');
const homeRouter = express.Router();

// const { getAllUsers } = require('../db');

homeRouter.use((req, res, next) => {
  console.log("A request is being made to /home");

  next()
});

homeRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
  
    res.send({
      home
    });
  });

module.exports = homeRouter;