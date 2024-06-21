let express=require('express')
const { searchMonth,selectMonth } = require('../controller/monthController')
let route=new express.Router()
route.get('/month',searchMonth)
route.get('/selectmonth',selectMonth)

module.exports=route