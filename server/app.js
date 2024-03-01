const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/a', (req, res) => {
  res.send({
    code: 1,
    message: '请求成功！'
  })
})

app.post('/b', (req, res) => {
  res.send({
    code: 1,
    message: '请求成功！'
  })
})
app.post('/d', (req, res) => {
  console.log('req', req.rawHeaders)
  setTimeout(() => {
    res.send({
      code: 1,
      message: '请求成功！' + req.body.message
    })
  }, 2000)
})
app.post('/e', (req, res) => {
  setTimeout(() => {
    res.send({
      code: 1,
      message: '请求成功！' + req.body.message
    })
  }, 2000)
})
app.post('/f', (req, res) => {
  res.send({
    code: 1,
    message: '请求成功！' + req.body.message
  })
})

app.get('/c', (req, res) => {
  setTimeout(() => {
    res.send({
      code: 1,
      message: '请求成功！'
    })
  }, 3000)
})

app.listen(3080, () => {
  console.log('server running')
})