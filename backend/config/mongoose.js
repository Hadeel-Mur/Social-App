const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://social-app-hadeel:social-app-hadeel@cluster0.28fguo1.mongodb.net/')
.then(res =>{console.log('DB is connected')})
.catch(err => {console.log(err)});