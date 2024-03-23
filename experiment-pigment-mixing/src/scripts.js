const fs = require('fs');

const convert_cie_xyz_data = () => {
    const raw_data = fs.readFileSync('./data/CIE_xyz_1931_2deg.csv').toString();
    const lines = raw_data
        .split('\r\n')
        .map(line => line.split(','))
        .map(line => line.map(num => parseFloat(num)));
        
    const map = {};
    lines.forEach(line => map[line[0]] = line.slice(1));

    const output_json = JSON.stringify(map, null, 4);
    fs.writeFileSync('./temp', output_json);
}

const convert_golden_csv_data = () => {
    const raw_data = fs.readFileSync('./data/Reflectance Data for Golden HB 10 mil Drawdowns over White.csv').toString();
    const raw_lines = raw_data
        .split('\n')
        .map(line => line.split(','))
        .slice(2, 80);

    const colors = raw_lines.map(line => ({
        name: line[1],
        LAB: line.slice(2, 5).map(parseFloat),
        reflectance: line.slice(6, 37).map(parseFloat),
        KS: line.slice(38).map(parseFloat),

    }));

    const output_json = JSON.stringify(colors, null, 4);
    fs.writeFileSync('./temp', output_json);
}

const convert_cie_d65_data = () => {
    const raw_data = fs.readFileSync('./data/CIE_std_illum_D65.csv').toString();
    const lines = raw_data
        .split('\r\n')
        .map(line => line.split(','))
        .map(line => line.map(num => parseFloat(num)));

    const map = {};
    lines.forEach(line => map[line[0]] = line[1]);

    const output_json = JSON.stringify(map, null, 4);
    fs.writeFileSync('./temp', output_json);
}


convert_golden_csv_data();