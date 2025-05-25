import { Router } from 'express';
import axios from 'axios';
const router = Router();


router.get('/weather', async (req, res) => {
   
  const city = req.query.city || 'Monaragala';
  const API_KEY = '95e9434037da3ab29aeab0e01ed593a3';

  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
   res.json(weatherRes.data);
      
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
