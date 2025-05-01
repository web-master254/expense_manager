const express = require('express');
require('dotenv').config()
const mysql = require('mysql')
const app = express.Router()

const db = mysql.createPool(
    {
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.INCOME_DB
    }
)


app.get(
    '/',
    (req,res)=>{
        db.query(
           "SELECT * FROM incomes",
            (err,data)=>{
                if(err){
                    res.status(500).send(JSON.stringify({error:err.sqlMessage}))
                }else{
                    res.status(200).send(JSON.stringify(data))
                }
            }
        )
    }
)
app.get('/:month',(req,res)=>{
    const{month} = req.params;
    db.query(
        "SELECT * FROM incomes WHERE month = ?",
        [month],
        (err,data)=>{
            if(err){
                res.status(500).send(JSON.stringify({error:err}))
            }else{
                res.status(200).send(data)
            }
        }
    )
})

app.post(
    '/add',
    (req,res)=>{
        const {month,amount}= req.body;
        const id = new Date().getTime()
        const date = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      db.query(
        'INSERT INTO incomes VALUES(?,?,?,?)',
        [id,date,month,amount],
        (err,data)=>{
            if(err){
                res.status(500).send(JSON.stringify({error:err}))
            }else{
                res.status(200).send(JSON.stringify(data))
            }
        }
      )
    }
)

app.delete(
    ('/:id/delete'),
    (req,res)=>{
        const {id}=req.params;
        db.query(
            "DELETE * FROM incomes WHERE id = ?",
            [id],
            (err,data)=>{
                if(err){
                    res.status(500).send(JSON.stringify({error:err}))
                }else{
                    res.status(200).send(JSON.stringify(data))
                }
            }
        )
    }
)

app.put(
    '/:id/update',
    (req,res)=>{
        const {id}= req.params;
        const {amount,month}=req.body;
        db.query(
            "UPDATE incomes SET amount = ?, month = ? WHERE id = ?",
            [amount,month,id],
            (err,data)=>{
                if(err){
                    res.status(500).send(JSON.stringify({error:err.sqlMessage}))
                }else{
                    res.status(200).send(JSON.stringify(data))
                }
            }
        )
    }
)

module.exports = app;