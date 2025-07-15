const fs = require('fs');
const csv = require('csv-parser');
const cheerio = require('cheerio');

fs.readFile('../projects.html', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const $ = cheerio.load(data);

    fs.createReadStream('./projects.csv')
        .pipe(csv())
        .on('data', (row) => {
            const string = `\t<div class="project-block"><div><img src="assets/cover_default.png"><h3>${row["Game Name"]}</h3><p>${row["Description"]}</p><p>Made by <u>${row["Made By"]}</u></p></div><div><h3>Features</h3><ul>${row["Features"].split(' | ').map(feat => `<li>${feat}</li>`).join('')}</ul><p>Genre: ${row["Game Genre"]}</p><p>Game Engine: ${row["Game Engine"]}</p><p>Experience: ${row["Experience"]}</p></div><div><p>Gameplay: ${row["Gameplay"]}</p><p>Other Notes: "${row["Other Notes"]}"</p></div></div>\n\t\t\t`;
            $('#new-games').append(string);
        })
        .on('end', () => {
            console.log('end of csv');
            fs.writeFileSync('../projects.html', $.html());
        })
        .on('error', (err) => {
            console.error('Error reading CSV:', err.message);
        });
});