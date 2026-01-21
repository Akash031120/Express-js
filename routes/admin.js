const express = require('express');

const router = express.Router();

router.get('/add-product',(req,res,next)=>{
    res.send('<h1>Add product</h1><form action="/store-product" method="POST"><input type ="text" name="title"/><input type ="submit" value="submit"/></form>')
})

router.post('/store-product',(req,res,next)=>{
    console.log('form data:',req.body);
   res.send('<h1>product submitted!</h1>')  
})
router.put('/user-data',(req,res,next)=>{ 
    console.log('form data',req.body);
    res.send('<b>this is updated</b>')
})
router.delete('/user-data',(req,res)=>{
    const router = router.find(r=>r.id ===Number (req,params,id));
    if (!router) return res.status(201).json({error:'user not find'})
})



module.exports = router;

