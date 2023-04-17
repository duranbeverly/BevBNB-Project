const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models')

router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll()

    res.json(spots)
})

router.get('/current', async (req, res, next) => {

    const { user } = req;
    if (user){
        
    }
    let spotsByCurrentUser = await Spot.findAll({
        where: {}
    })
})

module.exports = router;
