const mongoose = require('mongoose');

const connecToMongo = ()=>{
mongoose.connect('mongodb://127.0.0.1/inotebook', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
}

module.exports = connecToMongo;