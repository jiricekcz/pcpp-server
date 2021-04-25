const express = require('express');
const fs = require('fs');
const childProcess = require('child_process');
const rimraf = require('rimraf');
const path = require('path');



const api = express.Router();

api.post("/compiled.so", async (req, res) => {
    const b = req.body;
    // console.log(b);
    if (!b.python || !b.cpp || !b.filename) return res.status(400).end();
    if (b.filename.includes("\\") || b.filename.includes("/")) return res.status(400).end();
    await rm("./compilation/")
    if (!fs.existsSync("./compilation/")) fs.mkdirSync("./compilation/");
    fs.writeFileSync("./compilation/setup.py", b.python);
    fs.writeFileSync("./compilation/" + b.filename, b.cpp);
    fs.mkdirSync("./compilation/" + b.filename.replace("_module.cpp", ""));
    console.log(childProcess.execSync(`cd compilation && py ./setup.py build`).toString());

    const f = path.join("./compilation/build/", fs.readdirSync("./compilation/build/").find(v => v.startsWith("lib")));

    const file = fs.readFileSync(path.join(f, fs.readdirSync(f).find(v => v.endsWith(".pyd"))));

    res.status(200).write(file);
    res.end();
});
function rm(pth) {
    return new Promise((resolve, reject) => {
        rimraf(pth, () => {
            resolve();
        });
    });
}
module.exports = api;