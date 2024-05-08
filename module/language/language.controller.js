const db = require("../../config/db")

//get all languages
const getAllLanguage = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM language");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All language Records',
            totalSkills: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All languages",
            error
        })
    }
}

//get single languages
const getSingleLanguage = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide language id"
            })
        }

        const data = await db.query(`SELECT * FROM language WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            jobCategoryDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get single language by id",
            error
        })
    }
}

//create languages || post
const createLanguage = async (req, res) => {
    try {
        const { title, createdBy } = req.body

        if (!title || !createdBy) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`INSERT INTO language (title, createdBy) VALUES (?, ?)`,
            [title, createdBy])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            })
        }

        res.status(201).send({
            success: true,
            message: "New language record created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create language record",
            error
        })
    }
}

//update languages //put
const updateLanguage = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { title, createdBy } = req.body

        const data = db.query(`UPDATE language SET title  = ?, createdBy = ? WHERE id = ?`, [title, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "language updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update language",
            error
        })
    }
}

//delete language //patch
const deleteLanguage = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM language WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE language SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Language deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete language",
            error
        })
    }
}

module.exports = {
    createLanguage,
    updateLanguage,
    deleteLanguage,
    getSingleLanguage,
    getAllLanguage
}