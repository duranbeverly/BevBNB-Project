import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSpot, getSingleSpot, createSpotImage } from '../../store/spots';
import "./CreateSpot.css"

//populate the form with data that pertains to this spot
//probably better to get it from the database especially the images
//destructure the data and use those as arguments in the useEffect
//then when the form is submitted dispatch to an edit thunk
//use a reducer so you can store the data in your store

export const UpdateSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId])

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(20);
    const [lng, setLng] = useState(20);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSingleSpot(spotId)).then((spot) => {
            setCountry(spot.country);
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setLat(spot.lat);
            setLng(spot.lng);
            setDescription(spot.description);
            setName(spot.name);
            setPrice(spot.price);
            spot.SpotImages[0] && setPreviewImage(spot.SpotImages[0].url)
            spot.SpotImages[1] && setImageUrl1(spot.SpotImages[1].url)
            spot.SpotImages[2] && setImageUrl2(spot.SpotImages[2].url)
            spot.SpotImages[3] && setImageUrl3(spot.SpotImages[3].url)
            spot.SpotImages[4] && setImageUrl4(spot.SpotImages[4].url)
        })
    }, [dispatch, spotId])

    useEffect(() => {
        let errors = {}
        if (country.length < 1) errors.country = "Country is required"
        if (address.length < 1) errors.address = "Street address is required"
        if (city.length < 1) errors.city = "City is required"
        if (state.length < 1) errors.state = "State is required"
        if (description.length < 30) errors.description = "Description should be at least 30 characters"
        if (name.length < 1) errors.name = "Name of spot is required"
        if (price.length < 1) errors.price = "Price is required"
        if (previewImage.length > 0 && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) {
            errors.previewImage = "Preview image URL must end in .png, .jpg, or .jpeg"
        }
        if (imageUrl1.length > 0 && !imageUrl1.endsWith('.png') && !imageUrl1.endsWith('.jpg') && !imageUrl1.endsWith('.jpeg')) {
            errors.imageUrl1 = "Image URL 1 must end in .png, .jpg, or .jpeg"
        }
        if (imageUrl2.length > 0 && !imageUrl2.endsWith('.png') && !imageUrl2.endsWith('.jpg') && !imageUrl2.endsWith('.jpeg')) {
            errors.imageUrl2 = "Image URL 2 must end in .png, .jpg, or .jpeg"
        }
        if (imageUrl3.length > 0 && !imageUrl3.endsWith('.png') && !imageUrl3.endsWith('.jpg') && !imageUrl3.endsWith('.jpeg')) {
            errors.imageUrl3 = "Image URL 3 must end in .png, .jpg, or .jpeg"
        }
        if (imageUrl4.length > 0 && !imageUrl4.endsWith('.png') && !imageUrl4.endsWith('.jpg') && !imageUrl4.endsWith('.jpeg')) {
            errors.imageUrl4 = "Image URL 3 must end in .png, .jpg, or .jpeg"
        }

        setErrors(errors)
    }, [country, address, city, state, lat, lng, description, name, price, previewImage])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(!submitted)

        if (Object.values(errors).length < 1) {

            let spot = {
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }
            let spotId2 = await dispatch(editSpot(spotId, spot))

            handleImages(spotId)



        } else {
            return alert('Please correct the errors')
        }
    }


    const handleImages = async (spotId) => {
        let images = []
        if (previewImage) images.push(previewImage)
        if (imageUrl1) images.push(imageUrl1)
        if (imageUrl2) images.push(imageUrl2)
        if (imageUrl3) images.push(imageUrl3)
        if (imageUrl4) images.push(imageUrl4)



        for (let i = 0; i < images.length; i++) {
            let url = images[i]
            let image = {
                url,
                preview: (i === 0)
            }
            await dispatch(createSpotImage(image, spotId))
        }

        history.push(`/spots/${spotId}`);




        history.push(`/spots/${spotId}`)
        //remember 4 images are optional so you will have to handle that at some point
    }

    return (
        <>
            <div className="signup-box" onSubmit={handleSubmit}>
                <form className='signup-form'>
                    <h1 className='form-title'>Update Your Spot</h1>
                    <h2 className='form-subtitle'>Where's your place located?</h2>
                    <h3 className='form-info'>Guests will only get your exact address once they book a reservation.</h3>
                    <label className="signup-label">Country: {submitted && <span className='errors'>{errors.country}</span>}
                        <input className="input-area-spots" type="text" id="country" name="country" placeholder='Country'
                            value={country} onChange={e => setCountry(e.target.value)}
                        />
                    </label>

                    <label className="signup-label">Street Address:{submitted && <span className='errors'>{errors.address}</span>}
                        <input className="input-area-spots" type="text" id="street-address" name="street-address" placeholder='Street Address'
                            value={address} onChange={e => setAddress(e.target.value)}
                        />

                    </label>

                    <div className='city-state'>
                        <div className='city'>
                            <label className="signup-label">City:{submitted && <span className='errors'>{errors.city}</span>}
                                <input className="input-area-spots" type="text" id="city" name="city" placeholder='City'
                                    value={city} onChange={e => setCity(e.target.value)}
                                />

                            </label>

                        </div>
                        <div className='city'>
                            <label className="signup-label">State:{submitted && <span className='errors'>{errors.state}</span>}
                                <input className="input-area-spots" type="text" id="state" name="state" placeholder='State'
                                    value={state} onChange={e => setState(e.target.value)}
                                />
                            </label>

                        </div>

                    </div>
                    <div className='city-state'>
                        <div className='city'>
                            <label className="signup-label">lat:{submitted && <span className='errors'>{errors.lat}</span>}
                                <input className="input-area-spots" type="text" id="lat" name="lat"
                                    value={lat} onChange={e => setLat(e.target.value)}
                                />

                            </label>
                        </div>
                        <div className='city'>
                            <label className="signup-label">lng:{submitted && <span className='errors'>{errors.lng}</span>}
                                <input className="input-area-spots" type="text" id="lng" name="lng"
                                    value={lng} onChange={e => setLng(e.target.value)}
                                />
                            </label>
                        </div>

                    </div>
                    <h2 className='description-title'>Describe your place to your guests</h2>
                    <p className='description-info'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                    <label className="signup-label">Description:{submitted && <span className='errors'>{errors.description}</span>}
                        <textarea className="input-text-area" id="description" name="description" placeholder='Please write at least 30 characters'
                            value={description} onChange={e => setDescription(e.target.value)}
                        ></textarea>

                    </label>

                    <h2 className='spot-title'>Create a title for your spot</h2>
                    <p className='title-info'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <label className="signup-label">Name of Spot:{submitted && <span className='errors'>{errors.name}</span>}
                        <input className="input-area-spots" type="text" id="name-of-spot" name="name-of-spot" placeholder='Name your spot'
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </label>

                    <h2 className='price-title'>Set a price for your spot</h2>
                    <p className='price-info'>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    <label className="signup-label">Price:{submitted && <span className='errors'>{errors.price}</span>}
                        <input className="input-area-spots" type="text" id="price" name="price" placeholder='Price per night($USD)'
                            value={price} onChange={e => setPrice(e.target.value)}
                        />
                    </label>

                    <h2 className='price-title'>Liven up your spot with photos</h2>
                    <p className='price-info'>Submit a link to at least one photo to publish your spot.</p>

                    <label className="signup-label">Preview Image URL:{submitted && <span className='errors'>{errors.previewImage}</span>}
                        <input className="input-area-spots" type="text" id="preview-image-url" name="preview-image-url" placeholder='Preview Image Url'
                            value={previewImage} onChange={e => setPreviewImage(e.target.value)}
                        />
                    </label>

                    <label className="signup-label" >Image URL 1:{submitted && <span className='errors'>{errors.imageUrl1}</span>}
                        <input className="input-area-spots" type="text" id="image-url-1" name="image-url-1" placeholder='Image Url'
                            value={imageUrl1} onChange={e => setImageUrl1(e.target.value)} />
                    </label>

                    <label className="signup-label">Image URL 2: {submitted && <span className='errors'>{errors.imageUrl2}</span>}
                        <input className="input-area-spots" type="text" id="image-url-2" name="image-url-2" placeholder='Image Url'
                            value={imageUrl2} onChange={e => setImageUrl2(e.target.value)}
                        />
                    </label>

                    <label className="signup-label">Image URL 3:{submitted && <span className='errors'>{errors.imageUrl3}</span>}
                        <input className="input-area-spots" type="text" id="image-url-3" name="image-url-3" placeholder='Image Url'
                            value={imageUrl3} onChange={e => setImageUrl3(e.target.value)}
                        />
                    </label>

                    <label className="signup-label">Image URL 4: {submitted && <span className='errors'>{errors.imageUrl4}</span>}
                        <input className="input-area-spots" type="text" id="image-url-4" name="image-url-4" placeholder='Image Url'
                            value={imageUrl4} onChange={e => setImageUrl4(e.target.value)}
                        />
                    </label>

                    <button className="spot-button" type="submit">Update Your Spot</button>

                </form>

            </div>
        </>
    )
}
