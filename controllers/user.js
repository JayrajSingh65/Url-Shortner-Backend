const User = require('../models/userauth');



async function handelUserSignup(req,res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render("home")

};

module.exports = {
    handelUserSignup
}