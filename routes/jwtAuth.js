const express = require("express");
const router = require("express").Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {
    try {
        //destructure the req.body (email,password)
        const { email, password } = req.body;

        // check if user exist 
        const user = await pool.query
            ("SELECT * FROM" + "\"Users\"" + " WHERE user_email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        //Bycrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter the new user inside my database 
        const newUser = await pool.query
            ("INSERT INTO" + "\"Users\"" + " (user_email, user_password) VALUES ($1, $2) RETURNING *",
                [email, bcryptPassword]
            );
        res.json(newUser.rows[0]);
        console.log("query sucsess");

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

router.post("/login", async (req, res) => {
    try {

        // destructure the req.body
        const { email, password } = req.body;

        //check if user doesn't exist
        const user = await pool.query
            ("SELECT * FROM" + "\"Users\"" + " WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }

        //check if incoming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect")
        }

        console.log(user.rows)

        return res.send(user.rows);

        //return [res.json(true)];
        // console.log(user.rows)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

module.exports = router;