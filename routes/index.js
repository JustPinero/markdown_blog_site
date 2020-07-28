const router = require("express").Router();
const postRoutes = require("./post");

router.use('/api', postRoutes);
// router.get('/', (req, res) => res.send('I AM ROOT'));

module.exports = router