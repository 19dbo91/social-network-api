const { Schema, Types } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema (
    {
        user: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: true,
        },
        thoughts: [{ // Array of `_id` values referencing the `Thought` model
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{ // Array of `_id` values referencing the `User` model (self-reference)
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
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

module.exports = User;