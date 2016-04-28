const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});


userSchema.pre('save', function(next) {
  //get access to user model
  const user = this;

  // generate salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    //hash password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plain text password wiht encrypted
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
}

//create model class
const ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;