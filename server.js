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
app.use("/api/v1/student", require("./routes/students.Routes"))

// routes
app.get("/test", (req, res) => {
    res.status(200).send("<h1>Nodejs Mysql APP is running</h1>");
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

})

