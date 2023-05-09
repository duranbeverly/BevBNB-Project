import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot, createSpotImage } from '../../store/spots';
import "./CreateSpot.css"

export const CreateSpot = () => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
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
        let errors = {}
        if (country.length < 1) errors.country = "Country is required"
        if (address.length < 1) errors.address = "Street address is required"
        if (city.length < 1) errors.city = "City is required"
        if (state.length < 1) errors.state = "State is required"
        if (lat.length < 1) errors.lat = "lat is required"
        if (lng.length < 1) errors.lng = "lng is required"
        if (description.length < 30) errors.description = "Description should be at least 30 characters"
        if (name.length < 1) errors.name = "Name of spot is required"
        if (price.length < 1) errors.price = "Price is required"
        if (previewImage.length < 1) errors.previewImage = "Preview image URL is required"
        else if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(!submitted)

        if (Object.values(errors).length < 1) {
            let spot = {
                country,
                address,
                city,
                state,
                lat,
                lng,
                name,
                price
            }



            if (previewImage) {
                let image1 = {
                    spotId: true,
                    url: previewImage,
                    preview: true,
                }
            }

            let image2 = {
                spotId: true,
                url: imageUrl1,
                preview: false,
            }
            let image3 = {
                spotId: true,
                url: imageUrl2,
                preview: false,
            }
            let image4 = {
                spotId: true,
                url: imageUrl3,
                preview: false,
            }
            let image5 = {
                spotId: true,
                url: imageUrl3,
                preview: false,
            }
            //remember 4 images are optional so you will have to handle that at some point

        } else {
            return alert('Please correct the errors')
        }
    }


    return (
        <>
            <div class="signup-box" onSubmit={handleSubmit}>
                <form className='signup-form'>
                    <h1 className='form-title'>Create a new Spot</h1>
                    <h2 className='form-subtitle'>Where's your place located?</h2>
                    <h3 className='form-info'>Guests will only get your exact address once they book a reservation.</h3>
                    <label className="signup-label" for="country">Country: {submitted && <span className='errors'>{errors.country}</span>}</label>
                    <input className="input-area-spots" type="text" id="country" name="country" placeholder='Country'
                        value={country} onChange={e => setCountry(e.target.value)}
                    />

                    <label className="signup-label" for="street-address">Street Address:{submitted && <span className='errors'>{errors.address}</span>}</label>
                    <input className="input-area-spots" type="text" id="street-address" name="street-address" placeholder='Street Address'
                        value={address} onChange={e => setAddress(e.target.value)}
                    />

                    <div className='city-state'>
                        <div className='city'>
                            <label className="signup-label" for="city">City:{submitted && <span className='errors'>{errors.city}</span>}</label>
                            <input className="input-area-spots" type="text" id="city" name="city" placeholder='City'
                                value={city} onChange={e => setCity(e.target.value)}
                            />

                        </div>
                        <div className='city'>
                            <label className="signup-label" for="state">State:{submitted && <span className='errors'>{errors.state}</span>}</label>
                            <input className="input-area-spots" type="text" id="state" name="state" placeholder='State'
                                value={state} onChange={e => setState(e.target.value)}
                            />

                        </div>

                    </div>
                    <div className='city-state'>
                        <div className='city'>
                            <label className="signup-label" for="lat">lat:{submitted && <span className='errors'>{errors.lat}</span>}</label>
                            <input className="input-area-spots" type="text" id="lat" name="lat"
                                value={lat} onChange={e => setLat(e.target.value)}
                            />
                        </div>
                        <div className='city'>
                            <label className="signup-label" for="lng">lng:{submitted && <span className='errors'>{errors.lng}</span>}</label>
                            <input className="input-area-spots" type="text" id="lng" name="lng"
                                value={lng} onChange={e => setLng(e.target.value)}
                            />
                        </div>

                    </div>
                    <h2 className='description-title'>Describe your place to your guests</h2>
                    <p className='description-info'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                    <label className="signup-label" for="description">Description:{submitted && <span className='errors'>{errors.description}</span>}</label>
                    <textarea className="input-text-area" id="description" name="description" placeholder='Please write at least 30 characters'
                        value={description} onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <h2 className='spot-title'>Create a title for your spot</h2>
                    <p className='title-info'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <label className="signup-label" for="name-of-spot">Name of Spot:{submitted && <span className='errors'>{errors.name}</span>}</label>
                    <input className="input-area-spots" type="text" id="name-of-spot" name="name-of-spot" placeholder='Name your spot'
                        value={name} onChange={e => setName(e.target.value)}
                    />

                    <h2 className='price-title'>Set a price for your spot</h2>
                    <p className='price-info'>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    <label className="signup-label" for="price">Price:{submitted && <span className='errors'>{errors.price}</span>}</label>
                    <input className="input-area-spots" type="text" id="price" name="price" placeholder='Price per night($USD)'
                        value={price} onChange={e => setPrice(e.target.value)}
                    />

                    <h2 className='price-title'>Liven up your spot with photos</h2>
                    <p className='price-info'>Submit a link to at least one photo to publish your spot.</p>

                    <label className="signup-label" for="preview-image-url">Preview Image URL:{submitted && <span className='errors'>{errors.previewImage}</span>}</label>
                    <input className="input-area-spots" type="text" id="preview-image-url" name="preview-image-url" placeholder='Image Url'
                        value={previewImage} onChange={e => setPreviewImage(e.target.value)}
                    />

                    <label className="signup-label" for="image-url-1">Image URL 1:{submitted && <span className='errors'>{errors.imageUrl1}</span>}</label>
                    <input className="input-area-spots" type="text" id="image-url-1" name="image-url-1" />

                    <label className="signup-label" for="image-url-2">Image URL 2: {submitted && <span className='errors'>{errors.imageUrl2}</span>}</label>
                    <input className="input-area-spots" type="text" id="image-url-2" name="image-url-2" />

                    <label className="signup-label" for="image-url-3">Image URL 3:{submitted && <span className='errors'>{errors.imageUrl3}</span>}</label>
                    <input className="input-area-spots" type="text" id="image-url-3" name="image-url-3" />

                    <label className="signup-label" for="image-url-4">Image URL 4: {submitted && <span className='errors'>{errors.imageUrl4}</span>}</label>
                    <input className="input-area-spots" type="text" id="image-url-4" name="image-url-4" />

                    <button className="spot-button" type="submit">Submit</button>

                </form>

            </div>
        </>
    )
}
