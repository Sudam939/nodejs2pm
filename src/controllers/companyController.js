import { connectDb } from "../database.js";

const connection = await connectDb()



export const createCompany = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;
        await connection.execute(
            "INSERT INTO `companies` (`name`, `address`, `phone`, `email`) VALUES (?, ?, ?, ?)",
            [name, address, phone, email]
        );

        res.json({
            success: true,
            message: "Company added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}
