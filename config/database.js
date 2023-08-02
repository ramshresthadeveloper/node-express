const mongoose = require('mongoose')
const connectionString = "mongodb://localhost:27017/apidb"
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})