const { Users } = require('../database/model/users');
const jwt = require('jsonwebtoken');

function login(req, res) {
    const username = req.body.username;
    Users.findOne({username},function (err, data) {
        if (err) console.error(err);
        if(data) {
            if (req.body.password === data.password) {
             res.json({
                 token: jwt.sign({ username: data.username, _id: data._id}, 'nihao',{expiresIn: 60*60*24 }),
                 _id: data._id,
                 success: true,
                 message: 'Sign in successful!'
             });
           } else {
             res.json({
                 message: 'Password is not correct',
                 success: false,
             });
           }
        } else {
            res.json({
                message: 'User does not exit',
                success: false,
            });
        }
    })
}

function fetchAllUsers(req, res) {
    Users.find().exec((err, data) => {
        if (err) console.error(err);
        res.json({
            data: data,
            success: true,
        });
    })
}

export { login, fetchAllUsers };