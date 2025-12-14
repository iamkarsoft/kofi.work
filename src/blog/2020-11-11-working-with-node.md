---
layout: post
title:  "Working with node js"
date:   2020-11-11
categories: nodejs javascript
---

### Initializing

`npm init`



### Installing Dependencies

`npm i express mongoose`



### Development dependencies

`npm i --save-dev dotenv nodemon`



### creating a basic server `server.js`

```javascript
const express = require('express')
const app = express()



app.listen(3000,()=> console.log('Server started'));
```



### connecting to mongo database

```javascript
const mongoose = require('mongoose')

// connect to database
mongoose.connect('mongodb://localhost/subscribers', { useNewUrlParser: true })

// checking db connection
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',(on)=>console.log('Connected to Database'))
```



### using your `.env` file

```javascript
// calling the file
require('dotenv').config()

// using it in the connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
```



### Making app use json

`app.use(express.json())`



### Making routes

After creating the `routes/subscribers.js` file, you require it in your `server.js` =>
`const subscriberRouter = require('./routes/subscribers',subscriberRouter)`



### creating a middleware for subscriber route `routes/subscribers.js`

```javascript
const express = require('express')
const router = express.Router()

module.exports = router
```



### Creating the Rest

```javascript
const express = require('express')
const router = express.Router()

//get all
router.get('/',(req,res)=>{

})

// get one
router.get('/:id',(req,res)=>{

})
// create one
router.post('/',(req,res)=>{

})
// update
router.patch('/:id',(req,res)=>{

})

//deleting
router.delete('/:id',(req,res)=>{

})

module.exports = router
```



### creating a model for subscriber database interaction `models/subscriber.js`

```javascript
const mongoose = require('mongoose')

// interaction with database
const subscriberSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  subscriberToChannel:{
    type: String,
    required: true
  },
  subscribeDate:{
    type: Date,
    required: true,
    default: Date.now
  }
})


module.exports = mongoose.model('Subscriber',subscriberSchema)

```



### Get data from the routes

```javascript
const Subscriber = require('../models/subscriber')
//get all
router.get('/',async(req,res)=>{
  try{
    const subscribers  = await Subscriber.find()
    res.json(subscribers) // if connected get data
  }catch(err){
    res.status(500).json({message: err.message}) // throw error if an error was found
  }
})


// create one
router.post('/',async(req,res)=>{
const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

try{
  const newSubscriber = await subscriber.save()
  res.status(201).json(newSubscriber)
}catch(err){
  rest.status(400).json({message: err.message})
}
})

```



### Creating a middleware

```javascript
async function getSubscriber(req, res, next){
let subscriber
try{
 subscriber = await Subscriber.findById(req.params.id)
 if(subscriber == null){
  return res.status(404).json({message: 'Cannot find subscriber'})
 }
}catch(err){
  return res.status(500).json({message: err.message})
}
res.subscriber = subscriber
next()
}
```



### other routes data

```javascript
// update
router.patch('/:id', async(req,res)=>{
  if(req.body.name != null){
    res.subscriber.name = req.body.name
  }

  if(req.body.subscribedToChannel != null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try{
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  }catch(err){}
    res.status(400).json({message: err.message})
})

//deleting
router.delete('/:id',getSubscriber,async(req,res)=>{
  try{
     await res.subscriber.remove()
    res.json({message: 'Deleted Subscriber'})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

```


### Install body parser package
the body parser package is used to parse data in express framework from form fields
`npm i body-parser` and requiring it is `const bodyParser = require('body-parser')`