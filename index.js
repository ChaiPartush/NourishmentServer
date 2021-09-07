const express = require("express");
const app = express();
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.post("/addUser", async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (name,email,joined) VALUES ($1,$2,$3) RETURNING *", [name, email, new Date()]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getUsers", async (req, res) => {
    try {
        const allUsers = await pool.query(
            "SELECT * FROM users"
        );
        console.log('arrived');
        res.json(allUsers.rows);

        //res.status(200).send({ allUsers});
    } catch (err) {
        console.error(err.message);
    }
});

const DeviceHost = "192.168.1.34";
app.listen(PORT, DeviceHost, err => {
    if (err) {
        console.error(err);
    } {
        console.log(`App listen to port ${PORT}`);
    }
});