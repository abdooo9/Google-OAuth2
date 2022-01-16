const express = require("express")
const app = express()
const fetch = require("node-fetch")
const path = require("path")
const config = require("./config.json")
require("dotenv").config()

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get("/login", async (req, res) => {
    const login_link = `https://accounts.google.com/o/oauth2/v2/auth` + `?client_id=${process.env.CLIENT_ID}` + `&redirect_uri=http://localhost:5000/callback` + `&response_type=code` + `&scope=${config.scopes.join(" ")}`
    res.redirect(login_link)
})

app.get("/callback", async (req, res) => {
    const code = req.query.code

    let oauth2 = await fetch('https://oauth2.googleapis.com/token', {
        method: 'post',
        body: JSON.stringify({
            code: code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: "http://localhost:5000/callback",
            grant_type: "authorization_code"
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(data => data.json())
    oauth2.user = `http://localhost:5000/user?id_token=${oauth2.id_token}`
    res.send(oauth2)
})

app.get("/user", async (req, res) => {
    const id_token = req.query.id_token
    const user = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`, {
        method: 'get',
    }).then(data => data.json())

    res.send(user)
})

app.listen(5000, () => {
    console.log("Listen At 5000")
})
