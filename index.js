const express = require("express")
const app = express()
const ejs = require("ejs");
const path = require("path")
const moment = require("moment")
const fetch = require("node-fetch")
require("colors")
app.engine("html", ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

const logger = function (req, res, next) {
    let { url, ip, method, statusCode } = req

    let getHours
    getHours = new Date().getHours()
    if (getHours > 10) getHours = `${0 + getHours}`

    let getMinutes
    getMinutes = new Date().getMinutes()
    if (getMinutes > 10) getMinutes = `${0 + getMinutes}`

    let getSeconds
    getSeconds = new Date().getSeconds()
    if (getSeconds > 10) getSeconds = `${0 + getSeconds}`
    console.log(`${moment().format("hh:mm:ss")} `.red + `${method} `.green + `From: ` + `${ip?.replace("::ffff:", "")?.replace("::1", "localhost")} `.cyan + `At: ` + `${url} `.cyan + ` : ` + `${statusCode}`.yellow)
    next()
}
app.use(logger)


app.get("/", async (req, res) => {
    res.render("index")
})

app.get("/login", async (req, res) => {
    const code = req.query.code
    if (code === undefined) {
        const login_link = `https://accounts.google.com/o/oauth2/v2/auth` + `?client_id=464063423158-h7cnv53ha7od5vkmab51r8klvqfkg8hi.apps.googleusercontent.com` + `&redirect_uri=http://localhost:5000/login` + `&response_type=code` + `&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
        res.redirect(login_link)
        return
    } else {
        fetch('https://oauth2.googleapis.com/token', {
            method: 'post',
            body: JSON.stringify({
                code: code,
                client_id: "464063423158-h7cnv53ha7od5vkmab51r8klvqfkg8hi.apps.googleusercontent.com",
                client_secret: "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",
                redirect_uri: "http://localhost:5000/login",
                grant_type: "authorization_code"
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(data => data.json())
            .then(json => res.json({ request_res: json, user_info: `http://localhost:5000/user?id_token=${json.id_token}` }));
    }
})

app.get("/user", async (req, res) => {
    const id_token = req.query.id_token
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`, {
        method: 'get',
    })
        .then(data => data.json())
        .then(json => res.json(json));
})

app.listen(5000, () => {
    console.log("Listen At 5000")
})
