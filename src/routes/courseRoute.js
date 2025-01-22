import express from "express"
import { deleteCourse, getCourses, postCourse, updateCourse } from "../controllers/courseController.js"

export const courseRoute = express.Router()

courseRoute.post("/", postCourse)
courseRoute.get("/", getCourses)

courseRoute.get("/:id", (req, res)=>{
    res.send(req.params.id)
})

courseRoute.delete("/:id", deleteCourse)
courseRoute.put("/:id", updateCourse)