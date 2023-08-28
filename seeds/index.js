const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeeds, thoughtSeeds } = require('../seeds');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //Dropping existing db
    let usersCheck = await connection.db.listCollections({name: 'user'}).toArray();
    if(usersCheck.length){ await connection.dropCollection('user') };

    let thoughtsCheck = await connection.db.listCollections({name: 'thought'}).toArray();
    if(thoughtsCheck.length){ await connection.dropCollection('thought') }

    //c

    // Creating db
    await User.collection.insertMany(userSeeds);
    await Thought.collection.insertMany(thoughtSeeds);

    //Show tables
    console.table(userSeeds);
    console.info('Seeds planted! 🌱');
    process.exit(0);
});