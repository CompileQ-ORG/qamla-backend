const db = require("../../config/db")

//get all skills // get
const getAllSkill = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM skill");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All skill Records',
            totalSkills: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All skill",
            error
        })
    }
}

//get single skill //get
const getSingleSkill = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide skill id"
            })
        }

        const data = await db.query(`SELECT * FROM skill WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            singleSkillDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get skill by id",
            error
        })
    }
}

//create a skill || post
const createSkill = async (req, res) => {
    try {
        const { title, createdBy } = req.body

        if (!title || !createdBy) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`INSERT INTO skill (title, createdBy) VALUES (?, ?)`,
            [title, createdBy])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            })
        }

        res.status(201).send({
            success: true,
            message: "New skill record created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create skill record",
            error
        })
    }
}

//update a skill // put
const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { title, createdBy } = req.body

        const data = db.query(`UPDATE skill SET title  = ?, createdBy = ? WHERE id = ?`, [title, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "skill updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update skill",
            error
        })
    }
}

//delete a skill //patch
const deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM skill WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE skill SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Skill deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete skill",
            error
        })
    }
}


module.exports = {
    createSkill,
    updateSkill,
    deleteSkill,
    getSingleSkill,
    getAllSkill
}