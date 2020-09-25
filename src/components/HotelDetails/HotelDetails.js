import { MDBCol, MDBRow } from 'mdbreact';
import React from 'react';
import star from '../../Images/icons/star_1_.png'

const HotelDetails = (props) => {
    const {title, feature, details, rating, price, image} = props.data

    return (
        <div>
            <MDBRow className="m-3">
                <MDBCol className="col-5">
                    <div>
                        <img src={image} height="160" width="230" style={{borderRadius:'10px'}} alt="" />
                    </div>
                </MDBCol>
                <MDBCol className="col-7">
                    <b class="text-secondary" >{title}</b> <br/>
                    <small  className="text-muted">{feature}</small> <br/>
                    <small  className="text-muted">{details}</small> <br/>
                    <span>
                        <img src={star} height="10" alt="" />&nbsp;
                        <small>{rating}</small> 
                    </span> <br/>
                    <span><b>${price}/</b></span><span className="text-muted">night</span>
                    <br/>
                    <button class="btn purple-gradient" style={{width:'70px', padding:'4px 4px'}}>Details</button>
                  </MDBCol>
            </MDBRow>
        </div>
    );
};

export default HotelDetails;