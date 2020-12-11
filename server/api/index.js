const router = require('express').Router()

router.use('/models', require('./models'))
router.use('/query', require('./query'))

router.use('/api', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router // function (req, res, next) {}
