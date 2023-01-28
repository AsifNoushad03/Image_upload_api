const express = require('express')
const app = express();
const mongoose = require('mongoose');
const imageRoute = require('./Routes/image')


app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/files',imageRoute)

mongoose.connect('mongodb://localhost:27017')
    .then(()=>{console.log('Database Connected Sucessfully');})
    .catch((err)=>{console.log(err);})

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})