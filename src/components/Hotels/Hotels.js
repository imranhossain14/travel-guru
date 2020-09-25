import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelData from '../../FakeData/Hotels.json';
import HotelDetails from '../HotelDetails/HotelDetails';
import Place from '../../FakeData/Place.json';


const Hotels = () => {
    const { name } = useParams(); //selected place from url
    const data = [...HotelData] // copy all hotelData
    const place = [...Place]; // copy all places

    const selectedPlace = place.find(eachHotel => eachHotel.name === name);
    const hotels = data.filter( eachHotel => eachHotel.place === name)

    return (
        <div>
            <MDBContainer>
            <MDBRow style={{ backgroundColor: 'white' }}>
                {/* ---- showing hotels details in left side */}
                <MDBCol className="col-7">
                    <div className="m-3">
                        <h6>252 Guest Stays Yesterday</h6>
                        <h3 class="text-secondary" > Stay in {name}</h3><br/> 
                    </div >
                    {
                        hotels.map(eachHotel => <HotelDetails  key={eachHotel.id} data={eachHotel}></HotelDetails>)
                    }
                </MDBCol>
                
                <MDBCol className="col-5">
                   {/* will show google map here if get time */}
                    
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Hotels;