const express = require('express')
const router = express.Router()
const Keyword = require('../models/keyword')
const { isLoggedIn, isManager } = require('./middlewares')

router.post('/', isLoggedIn, isManager, async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '키워드 등록 중 오류가 발생했습니다.'
      next(error)
   }
})

router.put('/:id', isLoggedIn, isManager, async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '키워드 수정 중 오류가 발생했습니다.'
      next(error)
   }
})

router.delete('/:id', isLoggedIn, isManager, async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '키워드 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
