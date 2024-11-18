const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

const url = 'https://www.forexfactory.com/';
let tableData = [];

async function getTableData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('div.pagearrange__layout-column');

        const content = await page.content();
        const $ = cheerio.load(content);

        tableData = [];

        $('tr.calendar__row').each(function () {
            const time = $(this).find('td.calendar__time span').text().trim();
            const currency = $(this).find('td.calendar__currency span').text().trim();
            const impact = $(this).find('td.calendar__impact span').attr('title');
            const event = $(this).find('td.calendar__event').text().trim();
            const actual = $(this).find('td.calendar__actual span').text().trim();
            const forecast = $(this).find('td.calendar__forecast span').text().trim();
            const previous = $(this).find('td.calendar__previous span').text().trim();

            tableData.push({
                time,
                currency,
                impact,
                event,
                actual,
                forecast,
                previous,
            });
        });
    } catch (error) {
        console.error("Error scraping data:", error);
    } finally {
        await browser.close();
    }
}

getTableData().catch(console.error);

app.get('/', (req, res) => {
    res.json({ message: "This is a Forex Factory Calendar API" });
});

app.get('/table', (req, res) => {
    res.json(tableData);
});

setInterval(() => {
    getTableData().catch(console.error);
}, 5 * 60 * 1000);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
