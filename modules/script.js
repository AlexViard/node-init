const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');

const script = {
    init: (nameFolder) => {
        script.createFolderProject(nameFolder);
        script.executCommand(nameFolder);
        setTimeout(() => { 
          script.readFile(nameFolder); 
          console.log(chalk.yellow('Node js install dependencies from package.json...'));
        }, 1000);
        
    },
    createFolderProject: (nameFolder) => { 
        fs.mkdir(`./${nameFolder}`, (err) => {
            if (err) {
              console.log(err)
            } else {
              console.log(chalk.green('New directory successfully created!'));
            }
          })
    },
    executCommand: (nameFolder) => {
        fs.opendir(nameFolder, (err, dir) => {
            if (err) 
            console.log("Error:", err);
            else {
            // Print the pathname of the directory
            exec(` mkdir ${dir.path}/app`);
            exec(` mkdir ${dir.path}/public`);
            exec(` touch ${dir.path}/app/router.js`);
            exec(` mkdir ${dir.path}/app/views`);
            exec(` touch ${dir.path}/index.js`);
            exec(` touch ${dir.path}/.env`);
            exec(` touch ${dir.path}/.env.example`);
            exec(` mkdir ${dir.path}/public/css`);
            exec(` mkdir ${dir.path}/public/js`);
            exec(` touch ${dir.path}/index.js`);
            exec(` touch ${dir.path}/.gitignore`);
            exec(` touch ${dir.path}/README.md`);
            exec(` touch ${dir.path}/views/index.ejs`);
            exec(` touch ${dir.path}/views/404.ejs`);
            exec(`cd ${dir.path}/ && npm init -y && npm i express && npm i ejs && npm i dotenv && npm i nodemon`);
            exec(`cd ${dir.path}/ && git init`); 

            console.log(chalk.green('Folders and files successfully created!'));
          dir.closeSync();
        }
      })
    },
    readFile: (nameFolder) => {
        const contentIndex = `require('dotenv').config();\n const express = require('express');\nconst app = express();\nconst router = require('./app/router');\n\n app.set('view engine', 'ejs');\n app.set('views', './app/views');\n app.use(express.static('public'));\n\napp.use(router);\n\nconst PORT = process.env.PORT;\n app.listen(PORT);\n`;
        const contentGitigniore = `node_modules/\n.env`;
        const contentEnv = `PORT=3000`;
        const contentEnvExample = `PORT= app listen port`;
        const contentRouter = `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\nres.render('index');\n});\n\nrouter.use((req, res) => {\nres.status(404).render('404');\n});\n\nmodule.exports = router;`
        const contentIndexEjs = `<h1>Welcome to the Home Page !</h1>\n<h3>Script by <a href='https://github.com/AlexViard'>Alex Viard</a></h3>`;
        const content404Ejs = `<h1>Page not found - Error 404</h1>`;
        const readme = `Welcome to Node-init V1\n Thanks for downloading\n\n Script by Viard Alex\nhttps://github.com/AlexViard/node-init\n\n 1) node index + 'name folder'\n 2) move to create folder\n 3) nodemon index.js `;


        fs.writeFile(`./${nameFolder}/index.js`, contentIndex, err => {});
        fs.writeFile(`./${nameFolder}/.gitignore`, contentGitigniore, err => {});
        fs.writeFile(`./${nameFolder}/.env`, contentEnv, err => {});
        fs.writeFile(`./${nameFolder}/.env.example`, contentEnvExample, err => {});
        fs.writeFile(`./${nameFolder}/app/router.js`, contentRouter, err => {});
        fs.writeFile(`./${nameFolder}/README.md`, readme, err => {});
        fs.writeFile(`./${nameFolder}/app/views/index.ejs`, contentIndexEjs, err => {});
        fs.writeFile(`./${nameFolder}/app/views/404.ejs`, content404Ejs, err => {});

        console.log(chalk.green('File written successfully!'));
    }
};

module.exports = script;