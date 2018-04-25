const fs = require('fs');
fs.readFile('./03_fs.js', (err,data) => {
    console.log(data.toString());
})