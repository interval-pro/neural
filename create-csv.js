const fs = require('fs');

const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const createCsv = () => {
    const csv = [];
    for (let i = 0; i < 100; i++) {
        csv.push({
        x: Math.random() * 10,
        y: Math.random() * 10,
        r: 1
        });
    }

    for (let i = 0; i < 100; i++) {
        csv.push({
            x: Math.random(),
            y: Math.random(),
            r: 0
        });
    }

    return shuffleArray(csv);
}

const csv = createCsv();
const exportCsv = (data) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(','));
    const csv = [header, ...rows].join('\n');

    fs.writeFileSync(`./data-${Date.now()}.csv`, csv);
}
exportCsv(csv);