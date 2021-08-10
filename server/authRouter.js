const Router = require("express");
const router = Router();
const controller = require("./authController");
const {check} = require("express-validator")
const authMiddleware = require("./middleware/authMidlleware")
const roleMiddleware = require("./middleware/roleMiddleware")
//,prevuniversity,speciality,dateofbirth,phonenumber
router.post("/registration",[
    check("username" , "Неверно введена электронная почта,введите в формате example@proverka.com").isEmail(),
    check('fullname').isLength({min:3}).withMessage('ФИО должно быть больше 3'),
    check("password", "Пароль должен быть больше 4  и меньше 12 символов").isLength({min:4, max:12}),
    check("prevuniversity", "Поле предыдущего учебного заведения должно быть больше 3").notEmpty().isLength({min:3}),
    check("speciality", "Поле специальности должно быть больше 3").notEmpty().isLength({min:3}),
    check("dateofbirth", "Неверно введена дата рождения, введите в формате [2002-07-15]").isDate(),
    check("phonenumber","Неверно введен номер телефона").isMobilePhone()
] ,controller.registration)
router.post("/login", controller.login )
router.get("/users",roleMiddleware(["ADMIN"]),  controller.getUsers)
router.get("/users/:id", controller.getUser)
router.put("/users/update", controller.updateUser)
router.post("/users/result", controller.saveResult)
router.post("/users/get_result", controller.getResult)
module.exports = router