const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    try {
        // get token from authorization fiel with split
        const token = req.headers.authorization.split(' ')[1] // [0]:Bearer [1]:TOKEN
        if (!token) {
            return res.status(401).json({ message: "not authed" })
        }

        // decode user's token with jwt secret word
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // here we create user field and assign decoded to req it at the route
        req.user = decoded 

        next()
    } catch (error) {
        res.status(401).json({message: 'not authed in catch (middleware)'})
    }
}