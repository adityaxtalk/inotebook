const connectTomongo=require('./db');
const express= require('express');
const cors=require('cors');


connectTomongo();

const app=express();
const port=5000;

// Middleware
app.use(express.json())
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log('Server listening on port 3000');
})