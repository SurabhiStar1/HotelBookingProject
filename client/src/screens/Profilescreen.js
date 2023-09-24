import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';
import { Tabs } from 'antd';
import axios from "axios";
const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    })
    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'Yes' : 'No'}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen

export function MyBookings() {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
                console.log(response.data);
                setbookings(response.data);
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true)
            }
        };

        fetchData();
    }, []);

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true);
            const result = await axios.post('/api/bookings/cancelbooking', { bookingid, roomid }).data
            setloading(false)
            console.log(result);
            swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })

        } catch (error) {
            console.log(error);
            setloading(false);
            swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && <Loader />}
                    {bookings && (bookings.map(booking => {
                        return (
                            <div className="bs">
                                <h1>{booking.room}</h1>
                                <p><b>BookingId</b>: {booking._id}</p>
                                <p><b>CheckIN</b>: {booking.fromdate}</p>
                                <p><b>CheckOut</b>: {booking.todate} </p>
                                <p><b>Amount</b>:{booking.totalamount}</p>
                                <p><b>Status</b>:{booking.status === 'booked' ? 
                                (<Tag color="green">CONFIRMED</Tag>)
                                      : (<Tag color="red">CANCELLED</Tag>)
                                }</p>

                                {booking.status !=='cancelled' && (
                                    <div className="text-right">
                                        <button class="btn btn-primary" onClick={() => { cancelBooking(booking._id, booking.roomid) }}> CANCEL BOOKING</button>
                                    </div>
                                )}
                            </div>

                        )
                    }))}
                </div>

            </div>
        </div>
    )
}
