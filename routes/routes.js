const express = require('express');
require('dotenv').config()
const mysql = require('mysql')
const app = express.Router()
const handleAuth = require('../middlewares/auth.js')


const db = mysql.createPool(
    {
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    }
)
app.get('/',
   
    (req,res)=>{
        db.query(
            'SELECT * FROM expenses',
            (err,data)=>{ //callback function for a db query method.
                if(err){
                    res.status(500).send("Couldn't fetch expenses: Code 500",err)
                }
                else{

                    res.status(200).send(JSON.stringify(data))
                }
            }
        )
    }
)

app.get(
    "/:id",
    (req,res)=>{
        const {id}= req.params;
        db.query(
            'SELECT * FROM expenses WHERE type = ? OR month = ? OR date = ?',
            [id,id,id],
            (err,data)=>{

                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send(data)
                }
            }
        )
    }
)

app.post(
    '/add',
    (req,res)=>{
        const {amount,expense,month} = req.body
        const id_ =[
            2**4,
            new Date().getMonth()+1,
            new Date().getFullYear(),
            new Date().getMilliseconds(),
            
        ].join('');
        
        const id =id_
        const date = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        db.query(
            'INSERT INTO expenses VALUES(?,?,?,?,?)',
            [id,date,expense,month,amount],
            (err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    res.status(200).send('Record created successfully')
                }
            }
        )}
    
)
app.get(
    "/search/:type_",
    (req,res)=>{
        const {type_} = req.params;
        db.query(
            'SELECT * FROM expenses WHERE type = ?',
            [type_],
            (err,data)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send(data)
                }
            }
        )
    }
)

app.delete(
    '/delete/:id',
    (req,res)=>{
        const{id} = req.params;
        db.query(
            'DELETE FROM expenses WHERE id = ?',
            [id],
            (err,data)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send({msg:'Deleted successfully.'})
                }
            }
        )
    }
)

app.put(
    '/update/:id',
    (req,res)=>{
        const{id} = req.params;
        db.query(
            'UPDATE expenses SET amount = ? WHERE type = ? AND month = ?',
            [90000,id,'March'],
            (err,data)=>{
                if(err){
                    res.status(500).send('failed due to ',err)
                }else{
                    res.status(200).send('Updated successfully...')
                }
            }
        )
    }
)

module.exports = app;