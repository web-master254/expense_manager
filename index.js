const express = require('express')
const handleAuth = require('./middlewares/auth.js')
const app = express()
require('dotenv').config();
const cors = require('cors')




app.use(express.json())
app.use(cors({}))
app.use('/expenses',require('./routes/routes.js'))
app.use('/income',require('./routes/income_routes.js'))


app.get(
    '/',
    (req,res)=>{
        
        res.status(200).send('Welcome to expense tracker. Track your expenses with ease. Thank you.')
    }
)

app.get('*',(req,res)=>{ res.status(404).send('Ooops!! Not found')})

app.listen(5000)