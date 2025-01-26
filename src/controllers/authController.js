import { connection } from "../app.js"
import hash from "password-hash"

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