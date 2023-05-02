const fs = require('fs');

const readFile = (path) => {
    const data = fs.readFileSync(path, 'utf8').replace(/\r/g, '');
    const splitedData = data.split('\n');

    const headers = splitedData[0].split(',');
    const rows = splitedData.slice(1);
    const arrObj = rows.map((row) => {
        const splitedRow = row.split(',');
        const obj = {}
        headers.forEach((header, index) => obj[header] = parseFloat(splitedRow[index]));
        return obj;
    });
    return arrObj.map((row) => ({inputs: [row.x, row.y], outputs: [row.r]}));
};

module.exports = { readFile };