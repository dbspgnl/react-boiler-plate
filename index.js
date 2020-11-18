const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require("./models/User");

//application/x-www-form0urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true
}).then(() => console.log('mongoDB Connected...')).catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!!')
})

app.post('/register', (req, res) => {
  //회원 가입할 때 client에서 받아 DB에 넣어줌
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})