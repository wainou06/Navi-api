// const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      next()
   } else {
      const error = new Error('로그인이 필요합니다.')
      error.status = 403
      return next(error)
   }
}

exports.isNotLoggedIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      next()
   } else {
      const error = new Error('이미 로그인이 된 상태입니다.')
      error.status = 400
      return next(error)
   }
}

exports.isManager = (req, res, next) => {
   if (req.isAuthenticated()) {
      if (req.user && req.user.access === 'MANAGER') {
         next()
      } else {
         const error = new Error('관리자 권한이 필요합니다.')
         error.status = 403
         return next(error)
      }
   } else {
      const error = new Error('로그인이 필요합니다.')
      error.status = 403
      return next(error)
   }
}

// exports.verifyToken = (req, res, next) => {
//     try {
//         console.log('req.headers.authorization:', req.headers.authorization)
//         req.decoded=jwt.verify(req.headers.authorization,process.env.JWT_SECRET )
//     }
// }
