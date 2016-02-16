var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  id: String,
  text: String,
  author_id: String,
  created: { type: Date, default: Date.now },
  changed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);