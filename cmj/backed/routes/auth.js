const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { isNotLoggedIn } = require('./middlewares')
const passport = require('passport')
const bcrypt = require('bcrypt')

router.post('/register', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, password } = req.body

      const exUser = await User.findOne({
         where: { email },
      })

      if (exUser) {
         const error = new Error('이미 존재하는 ID입니다.')
         error.status = 409
         return next(error)
      }
      const hash = await bcrypt.hash(password, 12)

      const newUser = await User.create({
         email,
         name: 1,
         nick: 1,
         password: hash,
         phone: 1,
         address: 1,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            nick: newUser.nick,
            password: newUser.password,
            phone: newUser.phone,
            address: newUser.address,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = `회원가입 중 오류가 발생했습니다. ${error}`
      next(error)
   }
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         authError.status = 500
         authError.message = '인증 중 오류 발생'
         return next(authError)
      }
      if (!user) {
         const error = new Error(info.message || '로그인 실패')
         error.status = 401
         return next(error)
      }

      req.login(user, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }

         res.status(200).json({
            success: true,
            message: '로그인 성공',
            member: {
               id: user.id,
            },
         })
      })
   })(req, res, next)
})

module.exports = router
