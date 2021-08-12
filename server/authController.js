const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const {secret} = require("./config")
const {validationResult} = require("express-validator");
const Result = require("./models/Result")

const generationAccessToken =(id,roles) =>{
    const paylod = {
        id,
        roles
    }
    return jwt.sign(paylod,secret,{expiresIn:"24h"} )

}





class authController{
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password,prevuniversity,speciality,dateofbirth,phonenumber,fullname } = req.body;
            
            const candidate = await User.findOne({username})
            const phonecandidate = await User.findOne({phonenumber})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            if (phonecandidate) {
                return res.status(400).json({message: "Пользователь с таким мобильным телефоном уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username ,fullname,prevuniversity,speciality,dateofbirth,phonenumber, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"}) 
            
        } catch(e){
            console.log(e)
            res.status(400).json({message: "Registration error" })

        }

    }

    async login(req,res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generationAccessToken(user._id,user.roles,)
            return res.json({token})

        } catch(e){
            console.log(e)
            res.status(400).json({message: "Login error" })

        }

    }

    async getUsers(req,res){
        try {
         const users = await User.find()
            
            res.json(users)
        } catch(e){
            
        }

    }

    async getUser(req,res){
        try {
         const user = await User.findById(req.params.id)
            // prevuniversity,speciality,dateofbirth,phonenumber,
            res.json({username: user.username,fullname:user.fullname, prevuniversity:user.prevuniversity,speciality:user.speciality,dateofbirth:user.dateofbirth, phonenumber:user.phonenumber, roles: user.roles})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "GetUser error" })
        }

    }
    async updateUserPassword(req,res){
        try {
        const {username,newpassword,id} = req.body;
        const newhashPassword = bcrypt.hashSync(newpassword, 7);
        const userUpdatePassword = await User.findOneAndUpdate({_id:req.body.id},{password:newhashPassword},{new:true})
            res.json({message: "Пользователь упешно сменил пароль"})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "updateUser error" })
        }
    }
    async saveResult(req,res){
        try {
            const {idUser,result} = req.body;
            const candidateOnResult = await Result.findOne({idUser})
            if(!candidateOnResult){
                const UserResult = new Result({idUser,result})
                await UserResult.save()  
               return res.json({message: "save new user"})
            }else{
            const userUpdateResult = await Result.findOneAndUpdate(idUser,{result:req.body.result},{new:true})
               return res.json(userUpdateResult)
            }
          
        } catch(e){
           console.log(e) 
        }

    }

    async getResult(req,res){
        try {
            const {idUser} = req.body
           const resultTest = await Result.findOne({idUser})
           res.json({result:resultTest.result})
          
        } catch(e){
           console.log(e) 
        }

    }

    async updateUser(req,res){
        try {
        const {username,id} = req.body;
        /*username: user.username,fullname:user.fullname, prevuniversity:user.prevuniversity,speciality:user.speciality,dateofbirth:user.dateofbirth, phonenumber:user.phonenumber */
      
        const userUpdateOnDate = await User.findOneAndUpdate({_id:req.body.id},
            {username:req.body.username, fullname:req.body.fullname, prevuniversity:req.body.prevuniversity,
            speciality:req.body.speciality,dateofbirth:req.body.dateofbirth,phonenumber:req.body.phonenumber
            },
            {new:true})
            res.json({message: "Пользователь упешно изменил данные"})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "updateUser error" })
        }
    }


}
module.exports = new authController()