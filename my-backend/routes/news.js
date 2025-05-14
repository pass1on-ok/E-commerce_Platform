// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const response = await axios.get('https://newsapi.org/v2/top-headlines', {
//       params: {
//         country: 'kz',
//         apiKey: process.env.NEWS_API_KEY,
//       },
//     });

//     res.json(response.data.articles);
//   } catch (error) {
//     console.error('Ошибка при получении новостей:', error);
//     res.status(500).json({ message: 'Не удалось получить новости' });
//   }
// });

// module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us', 
        apiKey: process.env.NEWS_API_KEY 
      }
    });

    const articles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage
    }));

    res.json(articles);
  } catch (error) {
    console.error('Ошибка при получении новостей:', error.message);
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

module.exports = router;
