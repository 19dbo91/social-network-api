const User = require('../models/User');

module.exports = {
    async getAllUsers(req,res){
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUser(req,res){
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req,res){
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email
            });
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req,res){
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res){
        try {
            const deletingUser = await User.findOneAndDelete({ _id: req.body.userId });
            res.status(200).json(deletingUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addToFriends(req,res){
        try {
            
            const existingUser = await User.findOne({ _id: req.params.userId });
            
            if (!existingUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            // Checking users friends first, quicker/shorter to check first
            const friends = existingUser.friends;
            const foundFriendIndex = friends.findIndex( (friend) => {
                friend === req.params.friendId
            });
            
            if (foundFriendIndex >= 0){
                return res.status(200).json({ message: 'User already is friend with that user' });
            }
            

            // Checking if friend exists 
            const friend = await User.findOne({ _id: req.params.friendId });
            
            if (!friend){
                return res.status(404).json({ message: 'No friend with that ID' });
            }


            friends.push(req.params.friendId);

            res.status(200).json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFromFriends(req,res){
        try {
            const existingUser = await User.findOne({ _id: req.params.userId });

            if (!existingUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            } 

            const foundFriendIndex = existingUser.friends.findIndex( (friend) => {
                friend === req.params.friendId
            }); // O(n) + c

            if(foundFriendIndex === -1){
                return res.status(404).json({ message: 'No friend with that ID' });
            }else{
                friends.splice(foundFriendIndex)
            } // Splice uses neg.values too, keep in 'else' to avoid
                
            res.status(200).json({message: 'Deleted friend with that ID from that user friend list'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};