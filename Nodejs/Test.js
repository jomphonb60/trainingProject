
/*const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());
const {MONGOURI} = require('./key')
require('./models/users')


const option={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(MONGOURI, option)
mongoose.connection.on('connected',()=>{

    console.log("connected to  mongodb successfull");
})

mongoose.connection.on('error',(err)=>{
    console.log("error connected",console.err);
})*/


///////////////////////////////////////////////////////////////////////

/*server.get('/', (req,res)=>{
    res.send('Hello World!');
    console.log("get response");
})

const UserModel = mongoose.model('users',
    new mongoose.Schema({
    name:String,
    age: Number,
    Weight: Number,
    Height:Number,
    })
);*/

/*const customMiddleware=(req,res,next)=>{
    console.log("middleware excute");
    next();
}*/

/*server.get('/about',customMiddleware, (req,res)=>{
    res.send('This is a About');
    console.log("about response");
})*/

/*const Net = new UserModel({
    name: 'Net',
    age: 22,
    Weight: 85,
    Height: 170,
});
Net.save().then(()=> console.log("save Net"));*/

/*const James = new UserModel({
    name: 'James',
    age: 23,
    Weight: 68,
    Height: 172,
});
James.save().then(()=> console.log("save James"));*/


//Query
/*server.get('/User',(req,res)=>{
    UserModel.find({})
    .then((users) => res.json((users))
    .catch((error) => 
    res.status(400).json({messege: 'something wrong!' }))
    );
});

server.get('/User/id/:id',(req,res)=>{
    const {id} = req.params;
    UserModel.findById(id)
    .then(data => res.json(data))
    .catch(error=> res.status(400).json({messege:'something wrong!'}));
});

server.get('/User/name/:name',(req,res)=>{
    const {name} = req.params;
    console.log('req.params',req.params);
    UserModel.findOne({'name': name})
    .then(data => res.json(data))
    .catch(error=> res.status(400).json({messege:'something wrong!'}));
    
});*/

/*server.post('/User', async (req,res)=>{
    const {name ,age , Weight, Height} = req.body;
    const user = new UserModel({
        name ,
        age ,
        Weight ,
        Height
    })
     await user.save();
     res.json({messege: 'saved'});
})

server.get('/',(req, res) => {    
    res.json({messege: 'GG'});
});

server .get('/about',(req, res) => {    
    res.send('ABOUT PAGE');
});
*/

//server.listen(5000,()=> console.log('ok'));










