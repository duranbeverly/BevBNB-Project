import { img } from "../../utils/img";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Spot.css"

const COMING_SOON = "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg";


export const SpotIndexItem = ({ spot }) => {
    const user = useSelector(state => state.session.user);
    const isOwner = !!user && user.id === spot.ownerId;

    return (
        <div className='image-card' title={spot.name}>
            <Link className="link" to={`/spots/${spot.id}`}>
                <div className='image-box'>
                    {isOwner && <span className='owner-badge owner-badge-card'>Your listing</span>}
                    <img src={img(spot.previewImage || COMING_SOON, 600)} alt={spot.name} loading="lazy" decoding="async" />
                </div>
                <div className='spot-info'>
                    <h2 className='title-spots'>{spot.name}</h2>
                    <div className='price-stars'>
                        <p>{`${spot.city}, ${spot.state}`}</p>
                        <p> <i className="fa-solid fa-star fa-2xs"></i> {`${spot.avgRating ? spot.avgRating : "New"}`}</p>
                    </div>
                    <p className='price-spots'>{`$${spot.price} night`}</p>
                </div>
                <div className='tooltip'><span className="tooltiptext">{spot.name}</span></div>
            </Link>
        </div>
    )

}
