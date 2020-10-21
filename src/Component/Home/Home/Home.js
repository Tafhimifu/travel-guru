import React, { useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import {Card, Button} from 'react-bootstrap';
import cardInfo from '../../../mockData/destination';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const data = cardInfo.slice(0, 3);
    const [destination, setDestination] = useState(data);
    const [cardDetails, setCardDetails] = useState([]);
    
    const handleCardInfo = (cardInfo) => {
        const showDescription = document.getElementById('card-desc');
        showDescription.style.display = "block";
        setCardDetails(cardInfo);
        }             

    const history = useHistory();    
    const handleBookingPage = (cardDetails) => {
        history.push(`/booking/${cardDetails.id}`);
        
    };

    return (
        <div className="background">
            <Header></Header>
            <div className="adjust d-flex justify-content-center">
                <div id="card-desc" className="description text-white">                    
                    <h1 style={{textAlign: 'center'}}>{cardDetails.name}</h1>
                    <p className="text-justify">{cardDetails.details}</p> 
                    <Button className="btn-adjust btn-warning" onClick={handleBookingPage}>Booking
                    <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '5px'}}/></Button>                                                            
                </div>

                <div className="card-area">
                    {
                        destination.map((cardInfo) =>                                           
                            <Card className="bg-transparent text-white card-display">
                                <Card.Img src={cardInfo.image} alt="Card image"/>
                                <Card.ImgOverlay>
                                    <Card.Title><h4 style={{textAlign: 'center'}}>{cardInfo.name}</h4></Card.Title>                                    
                                    <a onClick={() => handleCardInfo(cardInfo)} href="#" className="stretched-link"></a>
                                </Card.ImgOverlay>
                            </Card>                        
                        )    
                    }                    
                    
                </div>                                                           
            </div>
        </div>
    );
};

export default Home;