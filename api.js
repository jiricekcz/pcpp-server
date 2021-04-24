const express = require('express');
const fs = require('fs');
const childProcess = require('child_process');



const api = express.Router();

api.get("/compiled.so", (req, res) => {
    const b = req.body;
    if (!b.python | !b.cpp) return res.status(400).end();
    if (!fs.existsSync("./compilation/")) fs.mkdirSync("./compilation/");
    if (fs.existsSync("./compilation/lib.cpp")) fs.unlinkSync("./compilation/lib.cpp");
    if (fs.existsSync("./compilation/setup.py")) fs.unlinkSync("./compilation/setup.py");
    fs.writeFileSync("./compilation/setup.py", b.python);
    fs.writeFileSync("./compilation/lib.cpp", b.cpp);

    console.log(childProcess.execSync(`cd compilation && python ./setup.py build`).toString());


});

module.exports = api;