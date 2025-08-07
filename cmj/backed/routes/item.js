const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const { isLoggedIn, isManager } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res, next) => {
   try {
      console.log('data: ', req.body.name)

      if (!req.body) {
         const error = new Error('파일 업로드에 실패했습니다.')
         error.status = 400
         return next(error)
      }

      const item = await Item.create({
         itemNm: req.body.name,
         price: 1,
         itemSellStatus: 'SELL',
         itemDetail: '',
         userId: req.user.id,
      })

      res.status(200).json({
         success: true,
         item: {
            itemNm: item.itemNm,
            price: item.price,
            itemSellStatus: item.itemSellStatus,
            itemDetail: item.itemDetail,
            userId: item.userId,
         },
         message: '아이템이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = `아이템 등록 중 오류가 발생했습니다. ${error}`
      next(error)
   }
})

module.exports = router
