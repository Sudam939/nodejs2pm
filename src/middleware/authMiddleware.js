import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {

    const cookie = req.headers.cookie
    if(!cookie) return res.json("unauthorhhhhhh")
    const token = cookie.split("=")[1]
    jwt.verify(token, process.env.JWTTOKEN, (error, data) => {
        if (error) return res.json(error)
        next()
    });

}