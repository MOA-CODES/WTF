require('dotenv').config() 
require('express-async-errors')

//docs start
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

const path = require('path')
const swaggerPath = path.resolve(__dirname, './swagger.yaml')
const swaggerDoc = YAML.load(swaggerPath)
const swaggerCss = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css"

//docs end

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
    res.send('<center>\
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"\
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"crossorigin="anonymous" />\
    <h1>Kannel Configuration Service</h1>\
    <h3><p><b>Made by <i><a href="https://github.com/MOA-CODES">MOA-CODES</a></i></b></P></h3>\
    </center>')
   }
)

app.post('/api/v1/writeToKannel', writeToKannelHandler)
app.get('/api/v1/writeToKannel', writeToKannelHandler)


app.listen(port, ()=>{
    console.log(`listening on ${port}`)
    console.log(process.env.filePath)
})
//made by moyo for bolu then edited by sir peter to use direct path or kannel.conf