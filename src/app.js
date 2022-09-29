const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// your code goes here
app.get('/mario', (req,res)=> {
    marioModel.find().then((data)=> {
        res.status(201).json(data)
    }).catch((err)=> {
        res.status(400).json(err)
    })
})



app.get('/mario/:id',(req,res)=> {
    let _id=req.params.id
    marioModel.findOne({_id:_id})
    .then((data)=> {
        res.status(201).json(data)
    }).catch((err)=> {
        res.status(400).json({message: `Id Does not match ${err}`})
    })
})



app.post('/mario', (req,res)=> {
    const {name, weight} = req.body

    if (!name || !weight) {
        return res.status(400).json({error:`Either name or weight is missing`})
    }
    marioModel.create({name, weight})
    .then((data)=> {
        res.status(201).json({message: `newly saved Mario character ${data}`})
    }).catch((err)=> {
        res.status(400).json({Error : `${err}`})
    })
})


app.patch('/mario/:id', (req,res)=> {
    let val=req.body
    let id=req.params.id
    marioModel.findOneAndUpdate({_id:id},{$set: val})
    .then(()=> {
        res.status(201).json({message : `Data is Update in Database`})
    }).catch((err)=> {
        res.status(400).json({message: `Id does not available ${err.message}`})
    })
})


app.delete('/mario/:id', (req,res)=> {
    let id=req.params.id
    marioModel.findOneAndDelete({_id:id})
    .then(()=> {
        res.status(200).json({message: 'character deleted'})
    }).catch((err)=> {
        res.status(400).json({message: err.message})
    })
})



module.exports = app;