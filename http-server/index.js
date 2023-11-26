const http =require("http")
const fs =require("fs")
const args = require("minimist")(process.argv.slice(2))
let projectHtml = ""
let registrationHtml = ""

fs.readFile(
    "registration.html",
    (err, data) => {
        if (err) throw err
        registrationHtml += data
    }
)

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
            case "/registration" :
                res.write(registrationHtml);
                res.end();
                break;
            default :
                res.write(projectHtml);
                res.end();
                break;
        }
    }
).listen(args.port);
// server.listen(args.p, (err) => {
//     if(err) console.log("error in server setup");
// });