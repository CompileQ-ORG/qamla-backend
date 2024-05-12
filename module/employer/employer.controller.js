const { response } = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../../config/db")

//get all employers
const getAllEmployers = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM employer");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All employers Records',
            totalEmployer: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All Employers",
            error
        })
    }
}

//get single job employers //get
const getSingleEmployer = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide employer id"
            })
        }

        const data = await db.query(`SELECT * FROM employer WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            singleEmployer: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get employer by id",
            error
        })
    }
}

//create employers || post
const createEmployer = async (req, res) => {
    try {
        const {
            firstName, lastName, middleName, email, password,

            photo, addressLine1, addressLine2, postCode, city,

            stateOrProvince, country, primaryPhone, secondaryPhone, gender,

            companyName, companySize, industryType, documents, isVerified,

            companyAddressLine1, companyAddressLine2, companyPostCode, companyCity, companyStateOrProvince,

            companyCountry, isDeleted, createdBy
        } = req.body


        if (!firstName || !lastName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            const data = await db.query(`INSERT INTO employer 
            ( firstName, lastName, middleName, email, password,
                
                photo, addressLine1, addressLine2, postCode, city,
                
                stateOrProvince, country, primaryPhone, secondaryPhone, gender,
                
                companyName, companySize, industryType, documents, isVerified,
                
                companyAddressLine1, companyAddressLine2, companyPostCode, companyCity, companyStateOrProvince,
                
                companyCountry, isDeleted, createdBy) 
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    
                    ?, ?, ?, ?, ?, ?, ?, ?)`,

                [firstName, lastName, middleName, email, hash,

                    photo, addressLine1, addressLine2, postCode, city,

                    stateOrProvince, country, primaryPhone, secondaryPhone, gender,

                    companyName, companySize, industryType, documents, isVerified,

                    companyAddressLine1, companyAddressLine2, companyPostCode, companyCity, companyStateOrProvince,

                    companyCountry, isDeleted, createdBy])

            if (!data) {
                return res.status(500).send({
                    success: false,
                    message: "Error in INSERT QUERY"
                })
            }

            res.status(201).send({
                success: true,
                message: "New employer record created successfully"
            })
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in employer record",
            error
        })
    }
}

//update employers //put
const updateEmployer = async (req, res) => {

    const id = req.params.id;

    if (!id) {
        return res.status(404).send({
            success: false,
            message: "Invalid ID"
        })
    }

    try {
        const {
            firstName, lastName, middleName, email, password,

            photo, addressLine1, addressLine2, postCode, city,

            stateOrProvince, country, primaryPhone, secondaryPhone, gender,

            companyName, companySize, industryType, documents, isVerified,

            companyAddressLine1, companyAddressLine2, companyPostCode, companyCity, companyStateOrProvince,

            companyCountry, isDeleted, createdBy
        } = req.body


        const data = db.query(`UPDATE employer SET 
        
        firstName = ?, lastName = ?, middleName= ?, email= ?, password= ?,
            
        photo= ?, addressLine1= ?, addressLine2= ?, postCode= ?, city= ?,
        
        stateOrProvince= ?, country= ?, primaryPhone= ?, secondaryPhone= ?, gender= ?,
        
        companyName= ?, companySize= ?, industryType= ?, documents= ?, isVerified= ?,
        
        companyAddressLine1= ?, companyAddressLine2= ?, companyPostCode= ?, companyCity= ?, companyStateOrProvince= ?,
        
        companyCountry= ?, isDeleted= ?, createdBy= ? 
        
        
        WHERE id = ?`, [firstName, lastName, middleName, email, password,

            photo, addressLine1, addressLine2, postCode, city,

            stateOrProvince, country, primaryPhone, secondaryPhone, gender,

            companyName, companySize, industryType, documents, isVerified,

            companyAddressLine1, companyAddressLine2, companyPostCode, companyCity, companyStateOrProvince,

            companyCountry, isDeleted, createdBy, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(201).send({
            success: true,
            message: "New employer record  updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in employer update record",
            error
        })
    }
}

//delete employers //patch
const deleteEmployer = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM employer WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE employer SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "Employer deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete",
            error
        })
    }
}

//employer login //post
const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const data = await db.query(`SELECT * FROM employer where email = ?`, [email])

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
                        message: 'employer login successful'
                    })
                } else {
                    res.status(404).send({
                        success: result,
                        message: 'employer login failed!'
                    })
                }
            }
            catch (error) {
                res.status(404).send({
                    success: false,
                    message: 'employer not found'
                })
            }

        });



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
    createEmployer,
    updateEmployer,
    deleteEmployer,
    getSingleEmployer,
    getAllEmployers,
    login
}