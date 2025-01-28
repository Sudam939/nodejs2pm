import { connection } from "../app.js"
import hash from "password-hash"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, phone, password, role = "USER" } = req.body

        const hashedPassword = hash.generate(password)


        await connection.execute("INSERT `users` (`name`, `email`, `phone`,`password`,`role`) VALUE(?,?,?,?,?)", [name, phone, email, hashedPassword, role])

        res.json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "username or password is missing"
            })
        }
        const [users] = await connection.execute("SELECT * FROM `users` WHERE `email` = ? OR `phone` = ?", [username, username])
        const user = users[0]
        if (!user || !hash.verify(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: "incorrect username or password"
            })
        }

        const token = jwt.sign(user, process.env.JWTTOKEN);
        res.cookie("token", token)
        res.json({
            success: true,
            user: user,
            token: token,
            message: "User loggedIn successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}