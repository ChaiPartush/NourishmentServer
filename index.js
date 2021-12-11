const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/auth", require("./routes/jwtAuth"));



const DeviceHost = "192.168.1.14";
app.listen(PORT, DeviceHost, err => {
    if (err) {
        console.error(err);
    } {
        console.log(`App listen to port ${PORT}`);
    }
});



// app.get("/getUsers", async (req, res) => {
//     try {
//         const allUsers = await pool.query(
//             "SELECT * FROM users"
//         );
//         console.log('arrived');
//         res.json(allUsers.rows);

//         //res.status(200).send({ allUsers});
//     } catch (err) {
//         console.error(err.message);
//     }
// });

