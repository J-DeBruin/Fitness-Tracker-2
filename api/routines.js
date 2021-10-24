const express = require('express');
const routinesRouter = express.Router();

// const { getAllUsers } = require('../db');

routinesRouter.use((req, res, next) => {
  console.log("A request is being made to /routines");

  next()
});

routinesRouter.get('/', async (req, res) => {
    const users = await getAllRoutines();
  
    res.send({
      routines
    });
  });

module.exports = routinesRouter;