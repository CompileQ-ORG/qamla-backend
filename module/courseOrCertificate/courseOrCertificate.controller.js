const db = require("../../config/db")

//get all training and certifications
const getAllCourse = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM trainingandcertification");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All training and certifications Records',
            totalSkills: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get training and certifications",
            error
        })
    }
}

//get single training and certifications
const getSingleCourse = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide course id"
            })
        }

        const data = await db.query(`SELECT * FROM trainingandcertification WHERE id = ?`, [id])

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
            message: "Error in get training and certifications by id",
            error
        })
    }
}

//create training and certifications || post
const createCourse = async (req, res) => {
    try {
        const { courseOrCertification, issuingOrganization, completionMonth, completionYear, isDeleted, createdBy } = req.body

        if (!courseOrCertification || !issuingOrganization || !completionMonth || !completionYear || !isDeleted || !createdBy) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`INSERT INTO trainingandcertification (courseOrCertification, issuingOrganization, completionMonth, completionYear, isDeleted, createdBy) VALUES (?, ?, ?, ?, ?, ?)`,
            [courseOrCertification, issuingOrganization, completionMonth, completionYear, isDeleted, createdBy])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT training and certifications"
            })
        }

        res.status(201).send({
            success: true,
            message: "New training and certifications created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create training and certifications",
            error
        })
    }
}


//update training and certifications ||put
const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            });
        }

        const { courseOrCertification, issuingOrganization, completionMonth, completionYear, isDeleted, createdBy } = req.body;

        const data = await db.query(`UPDATE trainingandcertification SET courseOrCertification = ?, issuingOrganization = ?, completionMonth = ?, completionYear = ?, isDeleted = ?, createdBy = ? WHERE id = ?`, [courseOrCertification, issuingOrganization, completionMonth, completionYear, isDeleted, createdBy, id]);

        if (data.changedRows === 0) {
            return res.status(500).send({
                success: false,
                message: "Error in updating data"
            });
        }

        res.status(200).send({
            success: true,
            message: `Training and certifications updated successfully!!!!! ${id}`
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating training and certifications",
            error
        });
    }
};

// delete training and certifications || patch
const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM trainingandcertification WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE trainingandcertification SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Training and Certifications deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete training and certifications",
            error
        })
    }
}


module.exports = {
    getAllCourse,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
}