const Thought = require('../models/Thought');

module.exports = {
    async getAllThoughts(req,res){
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThought(req,res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({messgage: 'No thought with that ID'});
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try {
            const {thoughttText, username, userId } = req.body;
            //verify user + username
            const associatedUser = await User.findOne({
                _id: userId,
                username
            });

            if(!associatedUser){
                return res.status(404).json({message: 'No user with that ID/name'})
            }
            
            const newThought = await Thought.create({
                thoughttText,
                username,
                userId,
            });

            //add to user
            associatedUser.thoughts.push(newThought._id)

            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try {
            // check for no change, save a call
            const updatedThought = await Thought.findOneAndUpdate();

            res.status(200).json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req,res){
        try {
            //check if exists
            const deletedThought = await Thought.find();
            res.status(200).json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addToReactions(req,res){
        try {
            const thought = await Thought.find();
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFromReactions(req,res){
        try {
            // if virtual 'reactionCt <=0' dont search
            // return 404
            const thought = await Thought.find();
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};