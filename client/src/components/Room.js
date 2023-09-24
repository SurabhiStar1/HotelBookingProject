import React, { useState } from "react";
import { Modal, Button, Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Room({room, fromdate, todate}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="">
            <div className="row bs">

                <div className="col-md-4">
                    <img src={room.imageurls[0]} className="smallimg" />
                </div>

                <div className="col-md-7  ">
                    <h1>{room.name}</h1>
                    <b>

                        {""}
                        <p>Max Count : {room.maxcount}</p>
                        <p>Phone Number: {room.phonenumber}</p>
                        <p>Type: {room.type}</p>

                    </b>

                    <div style={{ float: "right" }}>
                        {(fromdate && todate)&&(
                            <Link to = {`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className="btn btn-primary m-2" >Book Now</button>
                            </Link>
                        )}
                        
                        <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                    </div>
                </div>


                <Modal show={show} onHide={handleClose} size = 'lg'>
                    <Modal.Header >
                        <Modal.Title>{room.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel>

                            {room.imageurls.map(url => {

                                return <Carousel.Item>

                                    <img
                                        className="d-block w-100 bigimg"
                                        src={url}
                                        alt="First slide"
                                    />

                                </Carousel.Item>
                            })}

                        </Carousel>
                        <p>{room.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Room;


{/*<div className="row bs">

    <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
    </div>

    <div className="col-md-7 ">I
        <h1>{room.name}</h1>
        <b>

            {""}
            <p>Max Count : {room.maxcount}</p>
            <p>Phone Number: {room.phonenumber}</p>
            <p>Type: {room.type}</p> 

        </b>
        <div style={{ float: "right" }}>
            <button className="btn btn-primary">View Details</button>
        </div>
    </div>
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
</div>  */}