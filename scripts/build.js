var del = require('del');
const {series} = require('async');
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

series([
    (done) => {
        console.log("Deleting Dist Folder.");

        del([
            'dist/'
        ]);

        done();
    },
    (done) => {
        console.log("Compiling Typescript.");

        exec('npm run compile', () => {
            done();
        });
    },
    (done) => {
        console.log("Copying Auth & dbData.");

        fs.copyFileSync(path.resolve("src", "auth.js"), path.resolve("dist", "auth.js"));
        fs.copyFileSync(path.resolve("src", "dbData.js"), path.resolve("dist", "dbData.js"));
        fs.copyFileSync(path.resolve("src", "config.js"), path.resolve("dist", "config.js"));

        done();
    }
]);