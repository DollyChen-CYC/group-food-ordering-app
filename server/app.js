if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  if (process.env.NODE_ENV == 'production') {
    console.log(`App server is running.`)
  } else {
    console.log(`App server is running on http://localhost:${PORT}`)
  }
})
