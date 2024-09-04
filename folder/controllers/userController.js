const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const { createAccessToken } = require('../middlewares/token');


module.exports = {
    signup: async(req, res)=>{
        try{ 
            const {username, email, password, role} = req.body;            
                    const userExist = await User.findOne({email});
            
                    if(userExist) {
                        return res.status(400).json({message: 'Email already exists'})
                    }
            
                    const hashedPassword = await bcrypt.hash(req.body.password, 10)
                        req.body.password = hashedPassword
            
                    //create New User
                    const user = new User({
                        username, email, password: hashedPassword, role });
            
                    const savedUser = await user.save()
            
                    //create the access tokenafter the user us saved
                    const accessToken = createAccessToken (user._id, user.email, user.role)
                   console.log(accessToken)
                    //update the access token
                    user.accessToken =  accessToken
                    await user.save()
                   
                    console.log('User registered Successfully')
                    res.status(200).json({
                        message: 'User Details:',
                            User: {
                                username:savedUser.username,
                                email: savedUser.email,
                                accessToken: savedUser.accessToken
                            }
                    });
            } catch (err) {
                    console.log(err);
                    res.status(500).json({error:err})
                }
   },

   //login User
    login: async(req, res, next)=>{
        const {email, password} = req.body;
    
        try{
            const user = await User.findOne({email})
            if(!user) {
                res.status(404).json({message: 'No user found'})
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password)
            console.log('Password match:', passwordMatch);
            if(!passwordMatch) {
                res.status(400).json({message:'Invalid credentials'})
            }
    
            const accessToken = createAccessToken(user._id, user.email, user.role)
            await User.findByIdAndUpdate(user._id, { accessToken })
            console.log(accessToken)
            return res.status(200).json({message:'User logged in successfully', 
            user:{
                username: user.username, 
                email: user.email,
                role: user.role,
                accessToken: accessToken
            }
        })

        } catch (err){
            console.log(err)
            return res.status(500).json({message:"Internal Error"})
            }
    }
}