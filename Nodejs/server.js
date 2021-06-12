
const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());
const {MONGOURI} = require('./key')

require('./models/users')
const Image = require('./models/userupload')  //เรียกใช้ model users จาก folder models


//connect mongodb
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
})




///////////////////////////////////////////////////////////////////////

server.use(require('./routes/auth'))




server.listen(3000,()=> console.log('ok'));










