const script = require('./modules/script');

const name = process.argv[2];

if (name){
    script.init(name)
} else {
    console.error('Error: The folder name is invalid.');
}



