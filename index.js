const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
        base: ''
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'un',
        address: 'https://www.un.org/climatechange',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
 
]
  axios.get('https://www.smh.com.au/world')
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const baseUrl = 'https://www.smh.com.au'
    // Extract data from the page using Cheerio selectors

    $('div[data-an-position]').each((_, element) => {
      const article = {};
      const linkElement = $(element).find('h3 a');
      article.title = linkElement.text();
      article.url = baseUrl+ linkElement.attr('href');
    
      const imageElement = $(element).find('img');
      article.imageUrl = imageElement.attr('src');
      article.source = 'THE SYDNEY MORNING HERALD';

      articles.push(article);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
const articles = []
app.get('/', (req, res) => {
     res.json('<h1>wellcome to Super Nova Pro trend news, News </h1>')
})

app.get('/SNovaTrendsNews', (req, res) => {
    res.json(articles)
})

axios.get('https://www.aljazeera.com/')
  .then((response) => {
    const baseLink = 'https://www.aljazeera.com'

    const html = response.data;
    const $ = cheerio.load(html);
  $('a[href^="/news/"]').each((_, element) => {
    const article = {};

    article.title =  $(element).text();
    article.url = baseLink + $(element).attr('href');

    const imageElement = $('div.fte-article__featured-image img');
    article.imageUrl =baseLink + imageElement.attr('src');
    article.source = 'aljazeera';

    articles.push(article);
   });
    // Process and use the extracted data as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
