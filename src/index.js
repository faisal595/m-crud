
const mongoose = require('mongoose');
const port = 3000
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/mario-crud')
.then(()=> console.log('Connected to Database'))
.catch((err)=> console.log(err))

app.listen(port, () => console.log(`App listening on port ${port}!`));