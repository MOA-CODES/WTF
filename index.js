require('dotenv').config() 
require('express-async-errors')

const cors = require('cors')
const express = require('express')

const fs = require('fs')

const app = express()

app.use(express.json())

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
}

console.log(process.env.path)

const filepath = process.env.filePath || './kannel.conf'

const writeToKannelHandler = async(req, res)=>{
    const {payload} = req.body

    fs.writeFile(filepath, payload, (err)=>{
        if(err){
            console.error('Error writing to file:', err)
            res.status(500).json({error:{name:err.name, msg:err.message}})

        }else{
            res.status(200).send('Write to Kannel configuration successful.' )
        }
    })
}

const port = process.env.PORT || 3001

app.use(cors(corsOptions))

app.get('/', (req,res)=>{
    res.send('Kannel Configuration Service')
   }
)

app.post('/api/v1/writeToKannel', writeToKannelHandler)

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
    console.log(process.env.filePath)
})
//made by moyo for bolu then edited by sir peter to use direct path or kannel.conf