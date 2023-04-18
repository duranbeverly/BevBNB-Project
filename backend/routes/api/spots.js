const express = require('express');
const router = express.Router();
const { Spot, SpotImage, User, Review } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//this wil check if your post a spot/create a spot is valid
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State ks required.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.'),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid.'),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name.')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required.'),
    handleValidationErrors,
];

//get all spots and add the preview image

router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll({
        raw: true
    })

    for (let i = 0; i < spots.length; i++) {
        let previewUrl = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spots[i].id,
                preview: true
            }
        })
        spots[i].previewImage = previewUrl.url;
    }


    for (let i = 0; i < spots.length; i++) { //for each spot get all the stars for that spot
        let sum = 0; //eventually you want to add to this sum

        let allRatings = await Review.findAll({ //here you get all the stars
            attributes: ['stars'],
            where: {
                spotId: spots[i].id,
                preview: true
            }
        })

        let reviewNum = allRatings.length

        for (let j = 0; j < allRatings.length; j++) {
            sum += allRatings[j].stars
        }
        spots[i].avgRating = (sum / reviewNum)
    }

    res.json({ spots })
})


//get all the spots that belong to current logged in user
router.get('/current', async (req, res, next) => {

    const { user } = req;
    if (user) {
        const safeUser = {
            //add first name and last name
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };
    }
    let spotsByCurrentUser = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        raw: true
    })

    for (let i = 0; i < spotsByCurrentUser.length; i++) {
        let previewUrl = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spotsByCurrentUser[i].id,
                preview: true
            }
        })

        spotsByCurrentUser[i].previewImage = previewUrl.url;
    }

    for (let i = 0; i < spotsByCurrentUser.length; i++) { //for each spot get all the stars for that spot
        let sum = 0; //eventually you want to add to this sum

        let allRatings = await Review.findAll({ //here you get all the stars
            attributes: ['stars'],
            where: {
                spotId: spotsByCurrentUser[i].id
            }
        })

        let reviewNum = allRatings.length

        for (let j = 0; j < allRatings.length; j++) {
            sum += allRatings[j].stars
        }
        spotsByCurrentUser[i].avgRating = (sum / reviewNum)

    }
    res.json({ spotsByCurrentUser })
})




router.get('/:spotId', async (req, res, next) => {
    let spotId = req.params.spotId;

    let spotsById = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })

    if (spotsById) {
        //here we add the two new properties

        spotsById = spotsById.toJSON()
        let sum = 0; //eventually you want to add to this sum

        let allRatings = await Review.findAll({ //here you get all the stars for each review for the spot with given id
            attributes: ['stars'],
            where: {
                spotId: spotsById.id
            },
            raw: true
        })

        let reviewNum = allRatings.length

        for (let j = 0; j < allRatings.length; j++) {
            sum += allRatings[j].stars
        }

        spotsById.numReviews = reviewNum
        spotsById.avgStarRating = (sum / reviewNum)


        res.json(spotsById)
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

})



router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    // try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: req.user.id,
    });

    res.status(201).json(spot);
    // } catch (error) {
    //     // if (error.name === 'SequelizeValidationError') {
    //     // const errors = {};
    //     // for (let i = 0; i < error.errors.length; i++) {
    //     //     const e = error.errors[i];
    //     //     errors[e.path] = e.message;
    //     // }
    //     const err = new Error('Bad Request');
    //     err.status = 400;
    //     // err.errors = errors;
    //     return next(err);
    //     // } else {
    //     //     const err = new Error('Bad Request');
    //     //     err.status = 500;
    //     //     return next(err);
    //     // }
    // }
}
);

router.post('/:spotId/images', async (req, res, next) => {
    let { url, preview } = req.body;
    let id = req.params.spotId;

    let spot = await Spot.findByPk(id);
    console.log(spot)

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }

    let newImg = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    });

    res.status(200).json(newImg);
});


router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    let id = req.params.spotId;
    let spotToEdit = await Spot.findByPk(id)

    if (!spotToEdit) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }

    spotToEdit.address = address
    spotToEdit.city = city
    spotToEdit.state = state
    spotToEdit.country = country
    spotToEdit.lat = lat
    spotToEdit.lng = lng
    spotToEdit.name = name
    spotToEdit.description = description
    spotToEdit.price = price

    await spotToEdit.save()
    res.json(spotToEdit)
})


module.exports = router;
