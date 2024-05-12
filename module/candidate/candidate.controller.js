const db = require("../../config/db")
const bcrypt = require('bcrypt');
const saltRounds = 10;

//get all candidates
const getAllCandidate = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM candidate");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All candidate Records',
            totalCandidate: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All candidate",
            error
        })
    }
}

// get single candidate //get
const getSingleCandidate = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid candidate id"
            })
        }

        const data = await db.query(`SELECT * FROM candidate WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            candidate: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get single candidate by id",
            error
        })
    }
}

//create candidate || post
const createCandidate = async (req, res) => {
    try {
        const { firstName, lastName, middleName, email, password, cv, photo, addressLine1, addressLine2, postCode,
            city, stateOrProvince, country, primaryPhone, secondaryPhone, gender, about, skill, language, fb,
            linkedin, x, isDeleted, createdBy } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.

            const data = await db.query(`INSERT INTO candidate(firstName, lastName, middleName, email, password, cv, photo, addressLine1, addressLine2, postCode,
                city, stateOrProvince, country, primaryPhone, secondaryPhone, gender, about, skill, language, fb,
                linkedin, x, isDeleted, createdBy) VALUES(?, ?, ?, ?,?,
                     ?,?, ?,?, ?,
                     ?, ?,?, ?,?,
                      ?,?, ?,?, ?,
                      ?, ?,?, ?)`,
                [firstName, lastName, middleName, email, hash, cv, photo, addressLine1, addressLine2, postCode,
                    city, stateOrProvince, country, primaryPhone, secondaryPhone, gender, about, skill, language, fb,
                    linkedin, x, isDeleted, createdBy])

            if (!data) {
                return res.status(500).send({
                    success: false,
                    message: "Error in INSERT QUERY"
                })
            }

            res.status(201).send({
                success: true,
                message: "New candidate record created successfully"
            })
        });



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create candidate record",
            error
        })
    }
}

//update candidate record
const updateCandidate = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { firstName, lastName, middleName, email, password, cv, photo, addressLine1, addressLine2, postCode,
            city, stateOrProvince, country, primaryPhone, secondaryPhone, gender, about, skill, language, fb,
            linkedin, x, isDeleted, createdBy } = req.body

        const data = db.query(`UPDATE candidate SET 
        
        
        firstName = ?, lastName = ?, middleName = ?, email = ?, password = ?, cv = ?, photo = ?, addressLine1 = ?, addressLine2 = ?, postCode = ?,
        city = ?, stateOrProvince = ?, country = ?, primaryPhone = ?, secondaryPhone = ?, gender = ?, about = ?, skill = ?, language = ?, fb = ?,
        linkedin = ?, x = ?, isDeleted = ?, createdBy = ?
    
        WHERE id = ? `, [firstName, lastName, middleName, email, password, cv, photo, addressLine1, addressLine2, postCode,
            city, stateOrProvince, country, primaryPhone, secondaryPhone, gender, about, skill, language, fb,
            linkedin, x, isDeleted, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "candidate updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update candidate",
            error
        })
    }
}

//softdelete candidate records
const deleteCandidate = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM candidate WHERE id = ? `, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE candidate SET isDeleted = ? WHERE id = ? `, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "candidate deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete candidate",
            error
        })
    }
}

//login of a candidate
const login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`SELECT * FROM candidate where email = ?`, [email])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Email or Password incorrect!"
            })
        }

        const dbpass = data[0][0].password;

        bcrypt.compare(password, dbpass, function (err, result) {

            try {
                if (result) {
                    res.status(200).send({
                        success: result,
                        message: 'candidate login successful'
                    })
                } else {
                    res.status(404).send({
                        success: result,
                        message: 'candidate login failed!'
                    })
                }
            }
            catch (error) {
                res.status(404).send({
                    success: false,
                    message: 'candidate not found'
                })
            }

        })




    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in candidate login",
            error
        })
    }
}

module.exports = {
    createCandidate,
    updateCandidate,
    getAllCandidate,
    getSingleCandidate,
    deleteCandidate,
    login
}