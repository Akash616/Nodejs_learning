//sets up passport with a local authentication strategy.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  //Username-password-strategy
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    //authentication logic here
    try{
      //console.log('Received credentials: ', USERNAME, PASSWORD);
      const user = await Person.findOne({username: USERNAME});
      if(!user){
        return done(null, false, { message: 'Incorrect username.' });
      }
  
      const isPasswordMatch = await user.comparePassword(PASSWORD);
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null, false, { message: 'Incorrect password.' });
      }
  
    }catch(err){
      return done(err);
    }
  }));
  
  module.exports = passport;
  