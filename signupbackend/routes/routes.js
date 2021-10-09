const express = require('express')
const router = express.Router()
const signUpTemplateCopy= require('../models/SignUpModel')
const bcrypt = require('bcrypt')
const app= express();

if(process.env.NODE_ENV ==="production"){
    app.use(express.static("../../build"));
}
 router.post('/signup',async (request,response)=>{

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password,saltPassword)
    const signedUpUser = new signUpTemplateCopy({
      fullName:request.body.fullName,
      username:request.body.username,
      email:request.body.email,
      password:securePassword
    })
   signedUpUser.save()
   .then(data =>{
       response.json(data)
   })
   .catch(error=>{
    response.json(error)

   })
 })

 module.exports = router