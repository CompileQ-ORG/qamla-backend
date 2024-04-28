const db = require("../config/db")

//get all students list
const getStudents = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM students");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All Students Records',
            totalStudents: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All Student API",
            error
        })
    }
}

//get student by id
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide student id"
            })
        }

        const data = await db.query(`SELECT * FROM students WHERE id = ?`, [studentId])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            studentDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get student by id api",
            error
        })
    }
}

//create stud4ent || post
const createStudent = async (req, res) => {
    try {
        const { name, roll_no, medium, fees } = req.body

        if (!name || !roll_no || !medium || !fees) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)`, [name, roll_no, fees, medium])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            })
        }

        res.status(201).send({
            success: true,
            message: "New student Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create student api",
            error
        })
    }
}

//update student record by id
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { name, roll_no, fees, medium } = req.body

        const data = db.query(`UPDATE students SET name  = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?`, [name, roll_no, fees, medium, studentId])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "Student details updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update student API",
            error
        })
    }
}

//delete student
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Please provide student id or valid student id"
            })
        }

        await db.query(`DELETE FROM students WHERE id=?`, [studentId])

        res.status(200).send({
            success: true,
            message: "Student deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete student API",
            error
        })
    }
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}