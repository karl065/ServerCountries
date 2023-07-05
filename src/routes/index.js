const {Router} = require('express');
const countries = require('./CountriesRoutes/countryRoutes.js');
const activities = require('./ActivityRoutes/activityRoutes.js');

const router = Router();

router.use('/countries', countries);
router.use('/activities', activities);

router.get('*', (req, res) => {
  res.redirect('https://clientcountries.onrender.com' + req.originalUrl);
});

module.exports = router;
