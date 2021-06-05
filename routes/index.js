var express = require('express');
var router = express.Router();
const fs = require('fs')


// view cat details
router.get('/breeds/:cat', (req, res) => {
  const catName = req.params.cat
  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) return res.status(500).send(err.message)
      const parsedData = JSON.parse(data)
      const theOne = parsedData.catBreeds.find(cat => cat.name === catName)
      res.render('details', theOne)
    })
  })

  //overview of cats
  router.get('/views/:view', (req, res) => {
  const view = req.params.view
  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) return res.status(500).send(err.message)
      const parsedData = JSON.parse(data)
      if (view == "breed") {
        res.render('breeds', parsedData)
      }
      if (view == "indoor") {
        res.render('indoor', parsedData)
      }
      if (view == "hairless") {
        res.render('hairless', parsedData)
      }
      if (view == "rare") {
        res.render('rare', parsedData)
      }
      if (view == "experimental") {
        res.render('experimental', parsedData)
      }
    })
  })
//post route for comments
  router.post('/breeds/:cat/comment', (req, res) => {
    const name = req.body.name
    const comment = req.body.comment
    const catName = req.params.cat

    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) return res.status(500).send(err.message)
      const parsedData = JSON.parse(data)
      const theOne = parsedData.catBreeds.find(cat => cat.name === catName)
      theOne.comments = theOne.comments || {}
      var id = Object.keys(theOne.comments).length || 0
      theOne.comments[id] = theOne.comments[id] || {}
      theOne.comments[id].name = name
      theOne.comments[id].comment = comment
      var newData = JSON.stringify(parsedData, null, 2)
      fs.writeFile('./data.json', newData, (err) => {})
      })
      res.redirect('back')
})

// //delete route for comments
router.post('/breeds/:cat/comment/:id', (req, res) => {
  const name = req.body.name
  const comment = req.body.comment
  const catName = req.params.cat
  const id = req.params.id
console.log('working')
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theOne = parsedData.catBreeds.find(cat => cat.name === catName)
    console.log(theOne.comments[id])
    
    
    // const theComment = theOne.comments.find(comment => comment == id)
    
    // var newData = JSON.stringify(parsedData, null, 2)
    // fs.writeFile('./data.json', newData, (err) => {})
    })
    // res.redirect('back')
})

// GET home page
router.get('/', function(req, res) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
        const parseInfo = JSON.parse(data)
        res.render('home', parseInfo)
  })
});

module.exports = router;
