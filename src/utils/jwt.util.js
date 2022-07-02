const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = process.env;

async function createHash(password)
{
    return await bcrypt.hash(password, 10);
};

function createToken(user_id, email, key){
    return jwt.sign(
        { user_id, email },
        key,
        {
            expiresIn: "2h"
        }
    )
};

function verifyToken(token){
    jwt.verify(token, config.TOKEN_KEY)
}

module.exports = {
    createHash,
    createToken
}