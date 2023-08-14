const router = require('express').Router();
const {  } = require('../controllers/thoughtContoller');

router
    .route('/')
    .get()
    .post;

router
    .route('/:thoughtId')
    .get()
    .put()
    .delete();


router
    .route('/:thoughtId/reactions')
    .post()
    .delete();
    
module.exports = router;