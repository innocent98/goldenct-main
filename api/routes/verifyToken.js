const jwt = require('jsonwebtoken')

// let time = 1656020743716
// const currentTime = Date.now()
// const totalSeconds = (currentTime - time) / 1000
// const hour = Math.floor((totalSeconds / 3600) % 24)
// const sec = Math.floor(totalSeconds) % 60

// generate uuid
const min = Math.ceil(1000000)
const max = Math.floor(1000000000000)
const uuid = Math.floor(Math.random() * (max - min + 1)) + min

// generate subscription reference num
const subMin = Math.ceil(1000)
const subMax = Math.floor(1000000)
const reference = Math.floor(Math.random() * (subMax - subMin + 1)) + subMin

// generate subscription reference num
const confirmMin = Math.ceil(1000)
const confirmMax = Math.floor(9000)
const confirm = Math.floor(Math.random() * (confirmMax - confirmMin + 1)) + confirmMin

// token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json('Timeout!')
        // return console.log(totalSeconds)
        // return console.log("golden-ct-" + uuid)
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).json('You are not authenticated!')
  }
}

// by any member of the administrative
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'Admin' || req.user.role === 'Validator') {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

// by any member of the administrative or user
const verifyTokenAndAuthorizationAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

// by only admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'Admin') {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

// an admin
const verifyTokenAndAdminAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

// by any user,admin or validator
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

// by any user by body id
const verifyTokenAndUserBody = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.userId) {
      next()
    } else {
      res.status(403).json('You are not allowed to perform this operation!')
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAuthorizationAndUser,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndAdminAndUser,
  verifyTokenAndUserBody,
  uuid,
  reference,
  confirm,
}
