const User = require('../models/userauth');
const {setUser} = require('../service/auth');

const {v4: uuidV4} = require('uuid');

async function handelUserSignup(req,res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");

};

async function handelUserLogin(req,res){
    const {email, password} = req.body
    const user = await User.findOne({email, password});

    if(!user){
        return res.render("login", {
            error: "invalid Password or email"
        });
    };
    const sessionId = uuidV4();
    setUser(sessionId,user);
    res.cookie("uid", sessionId);
    return res.redirect("/")

};


module.exports = {
    handelUserSignup,
    handelUserLogin
};