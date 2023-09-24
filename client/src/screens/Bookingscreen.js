import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import swal from 'sweetalert2'


function Bookingscreen() {
  let { roomid, fromdate, todate } = useParams();

  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const fromDate = moment(fromdate, 'DD-MM-YYYY')
  const toDate = moment(todate, 'DD-MM-YYYY')

  const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();
  useEffect(() => {
    if(! localStorage.getItem('currentUser')){
      window.location.href = '/login'
    }
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid: roomid });
        settotalamount(response.data.rentperday * totaldays)
        setroom(response.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchData();

  }, []);

  async function displayRazorpay() {

    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    }
    setloading(true)
    const data = await fetch('/api/bookings/bookroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingDetails)
    }).then((t) => t.json());;
    setloading(false)
    

    console.log(data);

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: "Learn Code Online",
      description: "Wallet Transaction",
      // image: "http://localhost:1337/logo.png",
      order_id: data.id,
      handler: function (response) {
        console.log("handler response", response);
        // alert("PAYMENT ID ::" + response.razorpay_payment_id);
        // alert("ORDER ID :: " + response.razorpay_order_id);
        swal.fire('Congratulations', 'Your room booked successfully', 'success').then(result=>{
          window.location.href = '/bookings'
        })
      },
      prefill: {
        name: "Surabhi Yadav",
        email: "surabhiya2001@gmail.com",
        contact: "8303672402",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }


  return (
    <div className="m-5">
      {/* <h1>Book screen</h1>
      <h1>Room id = {roomid}</h1> */}

      <div >
        {loading ? (<h1><Loader /></h1>) : room ? (<div>
          <div className='row justify-content-center mt-5 bs '>
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className=" col-md-5">
              <div style={{ textAlign: 'right' }}>
                <h1>Booing Details</h1>
                <hr />
                <b>
                  <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                  <p>From Date: {fromdate} </p>
                  <p>To Date : {todate} </p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totaldays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button
                  type="button"
                  onClick={displayRazorpay}
                  className="course-payment-button"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>
        </div>) : (<Error />)}
      </div>
    </div>
  );
}
export default Bookingscreen


