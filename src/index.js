const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limit: {
        fileSize: 10000000 // about 10 MB
    },
    fileFilter(req, file, callback) { // restrict file extension 
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('Please upload a word document!'))
        }

        // callback(new Error('.pdf required'))
        // callback(undefined, true)
        // callback(undefined, false)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
