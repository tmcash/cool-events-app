const db = require('../config/connection');
const { Event, User, Note } = require('../models');
const eventSeeds = require('./eventSeeds.json');
const userSeeds = require('./userSeeds.json');
const noteSeeds = require('./noteSeeds.json');


db.once('open', async () => {
  try {
    await Note.deleteMany({});
    await User.deleteMany({});

    await Event.deleteMany({});

    await User.create(userSeeds);
    await Event.create(eventSeeds);
    await Note.create(noteSeeds);



    for (let i = 0; i < eventSeeds.length; i++) {
      const { _id } = await Event.create(eventSeeds[i]);
      const username = userSeeds[Math.floor(Math.random() * userSeeds.length)].username;
      await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            events: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

