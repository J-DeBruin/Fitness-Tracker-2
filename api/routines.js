/* ROUTINES
will need:
 - patch (update)
 - delete
 - get

 Patch /api/posts/:postId {:postId. Express uses strings like that to transform
    whatever is in that position to a variable we can get of the request object}
*/

const express = require('express');
const routinesRouter = express.Router();

// const { getAllUsers } = require('../db');

const { requireUser } = require('./utils');

routinesRouter.post('/', requireUser, async (req, res, next) => {
  res.send({ message: 'under construction' });
});

routinesRouter.use((req, res, next) => {
  console.log("A request is being made to /routines");

  next()
});

routinesRouter.get('/', async (req, res) => {
    //modify for correct api call to routines
    const users = await getAllRoutines();
  
    res.send({
      routines
    });
  });

//DELETE PULLED FROM JUICEBOX
postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    try {
      const post = await getPostById(req.params.postId);
  
      if (post && post.author.id === req.user.id) {
        const updatedPost = await updatePost(post.id, { active: false });
  
        res.send({ post: updatedPost });
      } else {
        // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
        next(post ? { 
          name: "UnauthorizedUserError",
          message: "You cannot delete a post which is not yours"
        } : {
          name: "PostNotFoundError",
          message: "That post does not exist"
        });
      }
  
    } catch ({ name, message }) {
      next({ name, message })
    }
  });

  //end

module.exports = routinesRouter;