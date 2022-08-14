const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
require("dotenv").config()

const { Activity } = require("./models/activity")

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const hbs = expressHandlebars.create({
//   helpers: {
//       calculate: function(value) {
//           return value * 5;
//       }
//   }
// })

app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.post('/create-activity', async (req, res) => {
  console.log(req.body)
  await new Activity(req.body).save()
  res.redirect("/")
})

app.get('/update-activity', async (req, res) => {
  // console.log(req.query)
  await Activity.findByIdAndUpdate(req.query.id, {
    status: req.query.status
  })
  res.redirect("/")
})

app.get('/delete-activity', async (req, res) => {
  // console.log(req.query)
  await Activity.findByIdAndDelete(req.query.id)
  res.redirect("/")
})

app.get('/', async (req, res) => {
  // res.send('Hello World!')
  let activites = await Activity.find().lean()
  // console.log(activites)
  res.render("home", {
    title: "Todo App",
    activites,
    helpers: {
      findColor(value) {
        if(value=="pending")
          return "text-warning"
        if(value=="snooze")
          return "text-primary"
        if(value=="done")
          return "text-success"
      }
    }
  })
})

async function startup() {
  try {
    // conditions
    await mongoose.connect(process.env.MONGO_URL)

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

startup()