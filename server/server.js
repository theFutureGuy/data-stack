const port = process.env.PORT ?? 8000;
const express = require("express")
const {v4:uuidv4} = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())


app.get('/todos/:email', async (req,res) => {
    // res.send("hello!")
    const { email } = req.params
    try{
        const todos = await pool.query('SELECT * FROM todos WHERE email =$1',[email]);
        res.json(todos.rows)
    }
    catch(e){console.error(e)}
})

app.post('/todos',async(req,res) => {
    
    const {email,title,progress,date} = req.body
   const id =  uuidv4()
    try {
      const newTodos = await pool.query(`INSERT INTO todos(id,email,title,progress,date) VALUES($1 $2 $3 $4 $5)`,[id,email,title,progress,date]) 
      res.json(newTodos)
    } catch (error) {
        
    }
})

app.put('/todos/:id',async (req,res) => {
    const {id} = req.params
    const { email,title,progress,date} = req.body
    try{
        const editTodo = await pool.query('UPFDATE todos set email = $1,title=$2,progress=$3,date=$4 WHERE id=$5',[email,title,progress,date,id])
        res.json(editTodo)
    }
    catch(e){
        console.log(e)
    }
})

app.delete('/todos/:id',async (req,res) => {
    const {id} = req.params
    try {
        const deleteTodos  = pool.query('DELETE from todos WHERE id=$1',[id])
        res.json(deleteTodos)
        
    } catch (error) {
        console.error(error)
    }
})

// endpoints for auth:
app.post('/signup' , async (req,res) =>{
    const {email,password} = req.body
    const salt =  bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const token =  jwt.sign({email},'secret',{expiresIn:'1hr'})
    res.json({email,token})
    try {
       const signup = await pool.query('INSERT INTO users (email,hashedpassword) VALUES($1,$2)'[email,hashedPassword])
    } catch (error) {
        console.error(error)
        if(error){
            res.json({detail:error.detail})
        }
    }
})
app.post('/login' , async (req,res) =>{
    const {email,password} = req.body
    try {
        const user = await pool.query('SELECT * users WHERE email = $1',[email])
        if(!user.rows.length){
            return res.json({detail:'User does not exist'})
        }
        const success = await bcrypt.compare(password,user.rows[0].hashedPassword)
        if(success){res.json({'detail': user.rows[0].email,token})}
        else{
            res.json({detail:'Logged in failed'})
        }

    } catch (error) {
        console.error(error)
    }
})


app.listen(port,()=>console.log(`Server running in port ${port}`))
