import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import React, { useState } from 'react';
import './Home.css'
import coxsbazar1 from '../../Images/coxsbazar1.jpg';
import sundorbon from '../../Images/sundorbon.png';
import sreemongol from '../../Images/sreemongol.png'
import Place from '../../FakeData/Place.json';
import { Link } from 'react-router-dom';

const Home = () => {

    const place = [...Place]
    const [value, setValue] = useState(place[0]);
    const locationClick = (id) => {
        setValue(place[id]);
    };



    return (
        <div>
            <MDBRow >
                {/* Details of location */}
                <MDBCol className="col-md-5">
                    <div className=" mt-5 place-details">
                        <h1 className="name"><strong className="name-style">{value.name}</strong></h1> <br/>
                        <p className="details">{value.details}</p>
                    </div>
                    <br />
                    <Link to={`/travel/${value.id}`}><MDBBtn className="ml-5" color="amber">Booking <MDBIcon icon="arrow-right" /></MDBBtn></Link>
                </MDBCol>
                {/* location with picture*/}
                <MDBCol className="col-md-7">
                    <div className="d-flex flex-nowrap m-5 place-div">
                         
                          {/* Cox's bazar*/}
                          <button onClick={() => locationClick(3)} className="place-btn" >
                            <img src={coxsbazar1} className="place-card place-background" alt="" />
                            <div class="location-caption">
                                <h4>Cox's Bazar</h4>
                            </div>
                        </button>
                        
                        
                        {/*Sundarbon */}
                        <button onClick={() => locationClick(0)} className="place-btn ">
                            <img src={sundorbon} className="place-card img-responsive" alt="" />
                            <div class="location-caption">
                                <h4>Sundorbon</h4>
                            </div>
                        </button>
                     
                        {/* Sreemongol */}
                        <button onClick={() => locationClick(2)} className="place-btn">
                            <img src={sreemongol} className="place-card" alt="" />
                            <div class="location-caption">
                                <h4>Sreemangal</h4>
                            </div>
                        </button>
                      
                    </div>

                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Home;