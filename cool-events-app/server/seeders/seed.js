const db = require('../config/connection');
const { Event } = require('../models');
const eventSeeds = require('./eventSeeds.json');

db.once('open', async () => {
  try{
  await Event.deleteMany({});
  await Event.create(eventSeeds);

  console.log('all done!');
  process.exit(0);
  } catch(err) {
    throw err;
  }
});
