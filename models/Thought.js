const {Schema } = require('mongoose');
//Thoughts


const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [Thought],    // The user that created this thought)
        friends: [User],        // Array of `_id` values referencing the `User` model (self-reference)
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get( function (){
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = Thought;