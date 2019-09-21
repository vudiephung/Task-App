const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_ADDRESS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})