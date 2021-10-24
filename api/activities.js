/*
will need:
 - GET

*/

const express = require('express');
const activitiesRouter = express.Router();

// const { getAllUsers, createActivities, updatePost, getPostById } = require('../db');

//below ensures a user is logged in / modified with items needed for
//tags from post.js (juicebox)
const { requireUser } = require('./utils');

activitiesRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = ""} = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};

    if (tagArr.length) {
        postData.tags = tagArr;
    }
    try {
        // add authorId, title, content to postData object
        // const post = await createPost(postData);
        // this will create the post and the tags for us
        // if the post comes back, res.send({ post });
        // otherwise, next an appropriate error object 
      } catch ({ name, message }) {
        next({ name, message });
    }
});

// stop

activitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /activities");

  next()
});

activitiesRouter.get('/', async (req, res) => {
    //modify with api call to activities
    const users = await getAllUsers();
  
    res.send({
      activities
    });
  });


  //PATCH BROUGHT IN FROM JUICEBOX FOR CONTEXT
  postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;
  
    const updateFields = {};
  
    if (tags && tags.length > 0) {
      updateFields.tags = tags.trim().split(/\s+/);
    }
  
    if (title) {
      updateFields.title = title;
    }
  
    if (content) {
      updateFields.content = content;
    }
  
    try {
      const originalPost = await getPostById(postId);
  
      if (originalPost.author.id === req.user.id) {
        const updatedPost = await updatePost(postId, updateFields);
        res.send({ post: updatedPost })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a post that is not yours'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = activitiesRouter;