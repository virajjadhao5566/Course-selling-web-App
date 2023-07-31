const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

const app = express();

app.use(cors())
app.use(express.json());

app.use('/admin',adminRoutes)
app.user('/user',userRoutes)

mongoose.connect('mongodb+srv://virajjadhao85:Vir%40j12345@cluster0.hewrcpu.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});