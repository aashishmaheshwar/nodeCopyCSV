const fs = require('fs');

const copyToFile = ({text = '', numberOfLines = 1, targetFileName = 'target.csv'}) => { 
    // parameter is object with default values
    const data = Array.from({length: numberOfLines})
        .map(el => text)
        .reduce((accumulator, row) => accumulator + row + '\n', '');
    fs.writeFile(targetFileName, data, 'utf-8', function (err) {
        if (err) return console.log(err);
        console.log(`Target CSV file - ${targetFileName} created with ${numberOfLines} lines`);
    });
};

const [fileName, lines, targetFile] = process.argv.slice(2);

const firstLine = fs
    .readFileSync(`./${fileName}`, 'utf-8')
    .split(/\r?\n/)[0];  

copyToFile({text: firstLine, numberOfLines: lines, targetFileName: targetFile});