Based on the updated structure of your project, which now includes two separate files (`index.js` for scraping the economic calendar and `newspage.js` for scraping news articles), I will create an updated README file that reflects these changes.

### Updated README.md

```markdown
# Forex News API

Forex News API is a Node.js application that scrapes economic news data from Forex Factory and provides it through a simple RESTful API. The API allows users to access the latest economic news and calendar events, including details about the impact on various currencies.

## Features

- Scrapes economic calendar data from Forex Factory.
- Scrapes news articles related to forex from Forex Factory.
- Provides endpoints for accessing both calendar data and news articles.
- Built with Node.js, Puppeteer, and Express.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anirudh-sk/forexnewsapi.git
   ```

2. Navigate to the project directory:

   ```bash
   cd forexnewsapi
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. Access the API:

   - **Economic Calendar**: [http://localhost:3000/table](http://localhost:3000/table)


1. Start the server:

   ```bash
   node newspage.js
   ```

2. Access the API:

   - **News Articles**: [http://localhost:3000/news](http://localhost:3000/news)
   - **Critical News**: [http://localhost:3000/critical_news](http://localhost:3000/critical_news)

## API Endpoints

- `GET /`: Returns a welcome message for the Forex Factory Calendar API.
- `GET /table`: Returns scraped economic calendar data.
- `GET /news`: Returns all scraped news articles.
- `GET /critical_news`: Returns only critical news articles.

## Dependencies

- **Express**: Web framework for Node.js.
- **Puppeteer**: Headless browser for scraping web pages.
- **Cheerio**: jQuery-like library for parsing HTML.

## Troubleshooting

If you encounter issues such as HTTP 403 errors or timeouts, consider the following:

- Ensure that your network connection is stable and that you can access [Forex Factory](https://www.forexfactory.com/) in your web browser.
- Check if there are any changes in the website structure that may affect scraping.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

```

### Instructions to Use the Updated README:
1. Copy the content above into a new file named `README.md` in your repository root directory.
2. Modify any sections as necessary to fit your specific project needs or updates.
3. Commit and push the changes to your GitHub repository.
