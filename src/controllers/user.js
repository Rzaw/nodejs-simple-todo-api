const User = require('../model/user');
const { body, validationResult } = require('express-validator/check')

async function createUser (req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        }

        const { first_name, last_name, email, password } = req.body;

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token;

        res.json(user);

    } catch (err) {
        return next(err);
    }
};

function validate(method) {
    switch (method) {
        case 'createUser': {
            return [
                body('first_name', '').optional(),
                body('last_name', '').optional(),
                body('email', 'Invalid mail').exists().isEmail(),
                body('password', 'Password does not meet criteria').isLength({ min: 8 })
            ];
        }
    }
};

module.exports = {
    createUser,
    validate
}