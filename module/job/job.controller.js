const db = require("../../config/db")

//get all jobs
const getAllJobs = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM job");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All jobs Records',
            totalSkills: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All job",
            error
        })
    }
}

//get single job  //get
const getSingleJob = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide id"
            })
        }

        const data = await db.query(`SELECT * FROM job WHERE employerId = ?`, [id])

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
            message: "Error in get job category by id",
            error
        })
    }
}

//create Job || post
const createJob = async (req, res) => {
    try {
        const { jobCategory, jobTitle, salary, vacancy, jobLocation, jobType, educationalRequirement, experienceRequirement,

            additionalRequirement, responsibilities, compensationsAndBenefits, skills, employmentStatus, createdBy
        } = req.body

        const data = await db.query(`INSERT INTO job (jobCategory, jobTitle, salary, vacancy, jobLocation, jobType, educationalRequirement, experienceRequirement,

            additionalRequirement, responsibilities, compensationsAndBenefits, skills, employmentStatus, createdBy) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ? )`,
            [jobCategory, jobTitle, salary, vacancy, jobLocation, jobType, educationalRequirement, experienceRequirement,

                additionalRequirement, responsibilities, compensationsAndBenefits, skills, employmentStatus, createdBy])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            })
        }

        res.status(201).send({
            success: true,
            message: "New job record created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create job record",
            error
        })
    }
}

//update job || put
const updateJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { jobCategory, jobTitle, salary, vacancy, jobLocation, jobType, educationalRequirement, experienceRequirement,

            additionalRequirement, responsibilities, compensationsAndBenefits, skills, employmentStatus, createdBy } = req.body

        const data = db.query(`UPDATE job SET 
        jobCategory= ?, jobTitle= ?, salary= ?, vacancy= ?, jobLocation= ?, jobType= ?, educationalRequirement= ?, experienceRequirement= ?,

        additionalRequirement= ?, responsibilities= ?, compensationsAndBenefits= ?, skills= ?, employmentStatus= ?, createdBy= ?
        WHERE employerId = ?`, [jobCategory, jobTitle, salary, vacancy, jobLocation, jobType, educationalRequirement, experienceRequirement,

            additionalRequirement, responsibilities, compensationsAndBenefits, skills, employmentStatus, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "job updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update job",
            error
        })
    }
}

//delete job || patch
const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM job WHERE employerId = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE job SET isDeleted  = ? WHERE employerId = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Job deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete job",
            error
        })
    }
}

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getSingleJob
}