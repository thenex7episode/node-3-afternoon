const users = require('../models/users')
id = 1
// id++

module.exports = {
    login: (req,res, next) => {
        const {session} = req
        const {username, password} = req.body

        const user = users.find(user => user.username === username && user.password === password);

        if(user) {
            session.user.username = user.username;
            console.log(req.session)
            res.status(200).send(session.user)
        }else {
            res.status(500).send('You Done Goofed')
        }
    },
    register: (req, res, next) => {
        const {session} = req
        const {username, password} = req.body

        users.push({id, username,password})
        id++

        session.user.username = username

        res.status(200).send(session.user)
    },
    signout: (req,res,next) => {
        console.log(req.session)
        // const { session } = req;
        req.session.destroy();
        res.status(200).send(req.session)
    },
    getUser: (req, res, next ) => {
        const { session } = req
        console.log(req.session)
        res.status(200).send(session.user);
    }
}