import { Router } from 'express';
import axios from 'axios';
const router = Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY; // Move to .env in production

router.get('/weather', async (req, res) => {
  const city = req.query.city || 'Colombo';

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
