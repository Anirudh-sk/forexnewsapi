const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

const url = 'https://www.forexfactory.com/';
let tableData = [];

// Function to scrape the table data
async function getTableData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set User-Agent to imitate a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    
    try {
        // Navigate to the target URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the table to load
        await page.waitForSelector('div.pagearrange__layout-column');

        const content = await page.content();
        const $ = cheerio.load(content);

        tableData = []; // Reset tableData for fresh scraping

        // Loop through the table rows
        $('tr.calendar__row').each(function () {
            const time = $(this).find('td.calendar__time span').text().trim();
            const currency = $(this).find('td.calendar__currency span').text().trim();
            const impact = $(this).find('td.calendar__impact span').attr('title');
            const event = $(this).find('td.calendar__event').text().trim();
            const actual = $(this).find('td.calendar__actual span').text().trim();
            const forecast = $(this).find('td.calendar__forecast span').text().trim();
            const previous = $(this).find('td.calendar__previous span').text().trim();

            // Push the extracted data into the tableData array
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

// Call the scraping function at server start
getTableData().catch(console.error);

// Endpoint to serve scraped table data
app.get('/', (req, res) => {
    res.json({ message: "This is a Forex Factory Calendar API" });
});

app.get('/table', (req, res) => {
    res.json(tableData);
});

// Periodically refresh the table data every 5 minutes
setInterval(() => {
    getTableData().catch(console.error);
}, 5 * 60 * 1000);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
