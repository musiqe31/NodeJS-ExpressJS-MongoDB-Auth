const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.CONNECTIONDB,{useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected To DB!")
})

module.exports = mongoose