
const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.getCats);
router.post('/', catsController.createCat);
router.put('/:id', catsController.updateCat);
router.delete('/:id', catsController.deleteCat);

module.exports = router;
