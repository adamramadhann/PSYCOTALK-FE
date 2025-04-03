import React, { useEffect, useState } from "react";
import TopTitle from "../../components/TopTitle";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../hook/notification";
import { setNotification } from "../../store/notificationSlice";
import { doc } from "../../assets/importImage";

const Notification = () => {
    const [isAcc, setAcc] = useState(false)
    const dispatch = useDispatch();
    const { data: notification = [], loading, error } = useSelector((state) => state.notif);

    const formattedData = notification?.map((val) => {
        if ( !val.createdAt || !val.booking ) return null; 

        const status = val.booking.status;

        let costumMessage;
        switch (status) {
            case "pending" :
                costumMessage = "Your Bookings is pending approval.";
                break;
            case "approved" : 
                costumMessage = "Your booking has been approved!";
                break
            case "rejected" :
                costumMessage = "Your booking has been rejected."
                break;
            default: 
            costumMessage = val.message;
        }

        const date = new Date(val.createdAt);
        const booking = new Date(val.createdAt);

        return {
            id: val.id,
            message: val.message,
            date: date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }),
            time: date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            booking: {
                status,
                DataTime: booking.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }),
                time: `${booking.getHours()}h ${booking.getMinutes()}m`,
                message: costumMessage
            }            
        };
    }).filter(Boolean);

    const bookings = formattedData[0]?.booking;
    console.log('ini data booking', bookings)


    useEffect(() => {
        const fetch = async () => {
            try {
                const notif = await getNotification();
                dispatch(setNotification(notif || []));
            } catch (error) {
                console.error(error.message);
            }
        };
        fetch();
    }, [dispatch]);

    console.log('ini acc', isAcc)

    return (
        <div className="w-full relative h-screen space-y-5 p-5 bg-gray-50">
            <TopTitle title={"Notification"} />
            <div className="w-full space-y-5">
                <span className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Recent Notifications</h1>
                    <button className="hover:underline text-blue-600">See All</button>
                </span>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : formattedData.length ? (
                    formattedData.map((val) => (
                        <div onClick={() => setAcc(val)} key={val.id} className="w-full  flex items-center rounded-md shadow-md p-3 justify-between">
                            <div className="flex items-center gap-7">
                                <IoMdNotificationsOutline size={35} />
                                <span className="space-y-2">
                                    <h1 className="text-xs">
                                        {val.date} - {val.time}
                                    </h1>
                                    <h1 className="text-sm">{val.message}</h1>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No notifications available</p>
                )}
            </div>
            <button className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xl">See All</button>
                <div  className={`absolute w-full h-full ${isAcc ? 'block' : 'hidden'}  bg-black/20 p-10 flex items-center justify-center top-1/2 left-1/2 -translate-1/2`} >
                    {
                        isAcc && (
                            <div className="w-full relative flex flex-col xl:max-w-2xl bg-white rounded-md py-10 shadow-md p-3 justify-between">
                                <div className="flex items-center gap-7">
                                    <img src={doc} alt="doc" className="w-12 h-12" />
                                    <span className=" space-y-2">
                                        <h1 className="text-xl" >Dr. Adam</h1>
                                        <h1 className=" text-xs top-2 right-2">{isAcc.booking.status}, {isAcc.booking.time} </h1>
                                    </span>
                                </div>
                                <p className="text-sm mt-5">{isAcc.booking.message}</p>
                                <button onClick={() => setAcc(false)} className="text-red-500 px-5 py-1 text-xl font-black absolute top-2 right-2" >X</button>
                            </div>
                        )
                    }   
                </div>
        </div>
    );
};

export default Notification;
