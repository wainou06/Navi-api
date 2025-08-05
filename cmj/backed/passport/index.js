const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {
   passport.serializeUser((user, done) => {
      console.log('user : ', user)
      done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
      User.findOne({
         where: { id },
         attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      })
         .then((user) => done(null, user))
         .catch((err) => done(err))
   })
   local()
}
