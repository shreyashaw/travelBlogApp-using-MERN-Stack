const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const authRoute= require('./routes/auth');
const userRoute= require('./routes/users');
const postRoute= require('./routes/posts');

const app = express();
app.use(express.json()); //accept json object from body
app.use(morgan('dev')); // access log

try{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, // check the documentation for more info
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
}
catch(error) {
    console.log(error.message);
    process.exit(1);
}
  
const PORT = process.env.PORT || 5000; // port number

app.get('/', (req, res) => {
    res.send('Travel_blog api is working fine !!');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
