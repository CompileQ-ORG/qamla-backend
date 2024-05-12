const db = require("../../config/db")

//get all job categories
const getAllJobCategories = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM jobcategory");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All job category Records',
            totalJobCategories: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All Job category",
            error
        })
    }
}

//get single job category
const getSingleJobCategory = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide job category id"
            })
        }

        const data = await db.query(`SELECT * FROM jobcategory WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            singleJobCategoryDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get job category by id",
            error
        })
    }
}

//create category || post
const createJobCategory = async (req, res) => {
    try {
        const { title, image, description, createdBy } = req.body

        if (!title || !image || !description || !createdBy) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`INSERT INTO jobcategory (title, image, description, createdBy) VALUES (?, ?, ?, ?)`,
            [title, image, description, createdBy])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            })
        }

        res.status(201).send({
            success: true,
            message: "New job category record created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create job category record",
            error
        })
    }
}

//update job category //put
const updateJobCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { title, image, description, createdBy } = req.body

        const data = db.query(`UPDATE jobcategory SET title  = ?, image = ?, description = ?, createdBy = ? WHERE id = ?`, [title, image, description, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "Job Category updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update Job Category",
            error
        })
    }
}

//delete job category //patch
const deleteJobCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM jobcategory WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE jobcategory SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Job Category deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete Job Category",
            error
        })
    }
}


module.exports = {
    createJobCategory,
    updateJobCategory,
    deleteJobCategory,
    getSingleJobCategory,
    getAllJobCategories
}