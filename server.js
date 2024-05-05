const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//configure dotenv
dotenv.config()

//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(morgan("dev"))

//routes
// app.use("/api/v1/student", require("./routes/students.Routes"))

app.use("/api/v1/jobcategory", require("./module/jobCategory/jobCategory.routes"))
app.use("/api/v1/skill", require("./module/skill/skill.routes"))
app.use("/api/v1/language", require("./module/language/language.routes"))
app.use("/api/v1/employer", require("./module/employer/employer.routes"))
app.use("/api/v1/course", require("./module/courseOrCertificate/courseOrCertificate.routes"))
app.use("/api/v1/user", require("./module/user/user.routes"))

// routes
app.get("/test", (req, res) => {
    res.status(200).send("Server is running successfully... <h1>Nodejs Mysql APP is running</h1>");
})

//port
const PORT = process.env.PORT || 8000;

//conditionally listen
mySqlPool.query("SELECT 1").then(() => {
    //mysql
    console.log("MySQL DB Connected".bgCyan.white)

    //listen
    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white)
    });
}).catch((error) => {
    console.log(error)
})

