const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

const url = 'https://www.forexfactory.com/news';
const articles = [];
const criticalArticles = [];

async function getItems() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set User-Agent and other headers to imitate a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the content to load
    await page.waitForSelector('li.flexposts__item');

    const content = await page.content();
    const $ = cheerio.load(content);

    $('li.flexposts__item').each(function () {
        const title = $(this).find('a').attr('title');
        const articleUrl = $(this).find('a').attr('href');
        const impactClass = $(this).find('.flexposts__storyimpact').attr('class');

        articles.push({
            title,
            URL: articleUrl,
            impact: impactClass
        });

        if (impactClass && impactClass.includes('impact high')) {
            criticalArticles.push({
                title,
                URL: articleUrl,
                impact: impactClass
            });
        }
    });

    await browser.close();
}

// Start scraping when the server starts
getItems().catch(console.error);

app.get('/', (req, res) => {
    res.json("This is a Forex News API");
});

app.get('/news', (req, res) => {
    res.json(articles);
});

app.get('/critical_news', (req, res) => {
    res.json(criticalArticles);
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));