//! SCHEMA ONLY
const { Schema } = require('mongoose');
const reactionSchema = new Schema (
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            required: true,            
        },
        reactionBody: { // The user that created this thought
            type: String,
            required: true,
            maxLength: 280,
        },
        username: { // The user that created this thought
            type: String,
            required: true,
        },    
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        id: false,
    }
);

module.exports = reactionSchema;