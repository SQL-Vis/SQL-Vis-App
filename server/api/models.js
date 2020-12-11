const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const {formatTablesColumns} = require('./parserHelper')
const db = require('../db')
var _ = require('lodash')

router.get('/example', async (req, res, next) => {
  try {
    const ast = parser.astify(
      'select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age = 28'
    )
    res.send(ast)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const [results, metadata] = await db.query(
      "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='public'"
    )
    let prettierArray = formatTablesColumns(results)
    _.forEach(prettierArray, function(value) {
      _.forEach(value, function(value, key) {
        value.sort().unshift(value.splice(value.indexOf('id'), 1)[0])
      })
    })
    res.send(prettierArray)
  } catch (err) {
    next(err)
  }
})
