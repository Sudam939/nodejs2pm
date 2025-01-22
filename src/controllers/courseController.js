import { connection } from "../app.js"

export const postCourse = async (req, res) => {
    try {
        const { name, price, description } = req.body

        await connection.execute("INSERT `courses` (`name`, `price`, `description`) VALUE(?,?,?)", [name, price, description])

        res.json({
            success: true,
            message: "Course added successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getCourses = async (req, res) => {
    try {
        const [courses] = await connection.execute("SELECT * FROM `courses`");
        res.json({
            success: true,
            data: courses
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const deleteCourse = async (req, res) => {
    try {
        await connection.execute("DELETE FROM `courses` WHERE `id`=?", [req.params.id]);
        res.json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { name, price, description } = req.body
        await connection.execute("UPDATE `courses` SET `name`=?, `price`=?, `description`=? WHERE `id`=?", [name, price, description, req.params.id]);
        res.json({
            success: true,
            message: "Course updated successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}