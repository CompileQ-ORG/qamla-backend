const db = require("../../config/db")

//get all users
const getAllUser = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM user");

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'All user Records',
            totalUsers: data[0].length,
            data: data[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All user records",
            error
        })
    }
}

//get single user //get
const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid provide user id"
            })
        }

        const data = await db.query(`SELECT * FROM user WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        res.status(200).send({
            success: true,
            singleUserDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in user by id",
            error
        })
    }
}

//create user || post
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, createdBy, isDeleted } = req.body;

        if (!firstName || !lastName || !email || !password || !phone || !createdBy || !isDeleted) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }

        const data = await db.query(
            `INSERT INTO user (firstName, lastName, email, password, phone, createdBy, isDeleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, email, password, phone, createdBy, isDeleted]
        );

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY"
            });
        }

        res.status(201).send({
            success: true,
            message: "New user record created successfully"
        });

    } catch (error) {
        console.error("Error in create user record:", error);
        res.status(500).send({
            success: false,
            message: "Error in create user record"
        });
    }
};

//update a user
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const { firstName, lastName, email, password, phone, createdBy, isDeleted } = req.body

        const data = db.query(`UPDATE user SET firstName = ?, lastName = ?, email = ?, password = ?, phone = ?, createdBy = ?, isDeleted = ? WHERE id = ?`, [firstName, lastName, email, password, phone, createdBy, isDeleted, id])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in update data"
            })
        }

        res.status(200).send({
            success: true,
            message: "user updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update user",
            error
        })
    }
}

//delete a user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID"
            })
        }

        const data = await db.query(`SELECT * FROM user WHERE id = ?`, [id])

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records Found"
            })
        }

        const isDeleted = 1

        const updatedData = db.query(`UPDATE user SET isDeleted  = ? WHERE id = ?`, [isDeleted, id])

        if (!updatedData) {
            return res.status(500).send({
                success: false,
                message: "Error in delete data"
            })
        }

        console.log(updatedData)

        res.status(200).send({
            success: true,
            message: "user deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete user",
            error
        })
    }
}


module.exports = {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}