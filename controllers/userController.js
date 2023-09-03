const User = require('../models/User');

module.exports = {
    async getAllUsers(req,res){ // // TODO: verify route - GOOD
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUser(req,res){ // // TODO: verify route - GOOD
        try {
            const user = await User.findOne({ 
                _id: req.params.userId,
            });

            if (!user) {
                return res.status(404).json({
                    message: 'No user with that ID',
                 });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req,res){ // // TODO: verify route - GOOD
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
            });
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req,res){ // // TODO: verify route - GOOD
        try {
            const userId = req.params.userId;
            const {username, email}= req.body;
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { username, email }
            );
            // console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: 'No user with that ID',
                });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res){  // TODO: verify route - GOOD AND remove associated thoughts (import to use)
        try {
            const deletingUser = await User.findOneAndDelete({
                _id: req.params.userId,
            });
            
            if(!deletingUser){
                res.status(404).json({
                    message: 'No user with that ID',
                }); 
            }
            res.status(200).json(deletingUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addToFriends(req,res){ // // TODO: verify route - GOOD
        try {            
            const existingUser = await User.findOne({ _id: req.params.userId });

            // Checking user exists
            if (!existingUser) { return res.status(404).json({ message: 'No user with that ID' }); };
            
            // Checking users friends first to reduce api calls
            let userFriends = existingUser.friends;
            const friendIndex = userFriends.findIndex( (friend) => 
                friend === req.params.friendId
            );console.log(friendIndex)
            if (friendIndex >= 0){ return res.status(304).json({ message: 'User already is friend with that user' }); };
            

            // Checking if friend exists 
            const newFriend = await User.findOne({ _id: req.params.friendId });
            if (!newFriend){ return res.status(404).json({ message: 'No friend with that ID' }); };
            
            // Update User list
            const newFriendsList = [...usersfriends, req.params.friendId];
            console.log(newFriendsList)
            const updatedFriends = await User.updateOne(
                {_id: req.params.userId},
                {friends: newFriendsList},
                {new: true}
            )
            console.log(updatedFriends)

            res.status(200).json(updatedFriends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFromFriends(req,res){ // TODO: verify route -
        try {
            const existingUser = await User.findOne({ _id: req.params.userId });

            // Checking user exists
            if (!existingUser) { return res.status(404).json({ message: 'No user with that ID' }); };
            console.log("User identified")

            // Checking if friend exists first to reduce api calls
            const newFriend = await User.findOne({ _id: req.params.friendId });
            if (!newFriend){ return res.status(404).json({ message: 'No friend with that ID' }); };
            console.log("Friend user identified")

            
            // Checking null friend list
            if (!existingUser.friendCount){ return res.status(404).json({ message: 'Did not find friend under user list of friends' }); };
            console.log("User is friends with them")

            // Checking 
            let usersFriends = existingUser.friends;
            const friendIndex = usersFriends.findIndex( (friend) => { friend === req.params.friendId });         
            if (friendIndex < 0){ return res.status(404).json({ message: 'Did not find friend under user list of friends' }); };
            console.log(friendIndex)

            friends.splice(friendIndex) //!NOTE: Splice can use negative values to check from right side of array               
            res.status(200).json({message: 'Removed friend from user list of friends'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};