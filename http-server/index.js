const http =require("http")
const fs =require("fs")
const args = require("minimist")(process.argv.slice(2))
let projectHtml = ""
let registrationHtml = ""
let homeHtml=""
fs.readFile(
    "registration.html",
    (err, data) => {
        if (err) throw err
        registrationHtml += data
    }
)
fs.readFile(
    "home.html",
    (err, home) => {
        if (err) throw err
        homeHtml += home
    })
fs.readFile(
    "project.html",
    (err, project) => {
        if (err) throw err
        projectHtml = project
    })

http.createServer(
    (req, res) => {
        let url = req.url
        res.writeHeader(200, { "Content-Type" : "text/html" });
        switch (url) {
            case "/project" :
                res.write(projectHtml);
                res.end();
                break;
            case "/registration" :
                res.write(registrationHtml);
                res.end();
                break;
            default :
                res.write(homeHtml);
                res.end();
                break;
        }
    }
).listen(args.port);
