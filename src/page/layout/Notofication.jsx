import React, { useEffect, useState } from "react";
import TopTitle from "../../components/TopTitle";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, getNotification } from "../../hook/notification";
import { deletedNotif, setNotification } from "../../store/notificationSlice";
import { doc } from "../../assets/importImage";
import { bookings } from "../../hook/booking";
import { setBook } from "../../store/bokingSlice";
import ModalComponent from "../../components/ModalComponent";
import { setRole } from "../../store/authSLice";

const Notification = () => {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const { data: notification = [], loading, error } = useSelector((state) => state.notif);
    const { data: booking = [] } = useSelector((state) => state.booking);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenSucces, setIsModalOpenSucces] = useState(false)
    const [idModal, setIdModal] = useState(null)
    const dispatch = useDispatch();

    const user = dispatch(setRole({ role : 'doctor'}))
    console.log(user.payload.role)

    console.log('ini data notifications selector',notification)

    const formattedData = notification
        ?.filter(val => val.createdAt && val.booking)
        .map((val) => {
            const status = val.booking.status;
            let customMessage;

            switch (status) {
                case "pending":
                    customMessage = "Your booking is pending approval.";
                    break;
                case "approved":
                    customMessage = "Your booking has been approved!";
                    break;
                case "rejected":
                    customMessage = "Your booking has been rejected.";
                    break;
                default:
                    customMessage = val.message;
            }

            const date = new Date(val.createdAt);

            return {
                id: val.id,
                bookingId: val.booking.id,
                message: val.message,
                date: date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
                time: date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                customMessage,
            };
        });

        const NotoficationDoc = notification.map((val) => {
            
        })

    const selectedBooking = booking.find((b) => b.id === selectedBookingId);
    
    const modalOpens = (e) => {
        setIdModal(e)
        setIsModalOpen(true)
    }

    const handleDeleted = async ( id ) => {
        console.log('ini id nyaa',id)
        try {
            await deleteNotification(idModal)
            dispatch(deletedNotif(idModal))
            setIsModalOpenSucces(true)

            setTimeout(() => {
                setIsModalOpenSucces(false)
            }, 1000)

            setIsModalOpen(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notif = await getNotification();
                const books = await bookings();
                dispatch(setNotification(notif || []));
                dispatch(setBook(books || []));
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="w-full relative h-[100dvh] scrollable-container space-y-5 p-5 bg-[#eeee] ">
            <TopTitle title="Notification" />
            <div className="w-full h-[85%] mb-20 overflow-y-auto bg-[#eeee] scrollable-container space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-xl font-semibold">Recent Notifications</h1>
                </div>
                <div className="space-y-12 mb-10 w-full h-full md:p-5" >
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error: {error}</p>
                    ) : formattedData.length ? (
                        <>
                            { 
                                    formattedData.map((val) => (
                                        <div
                                            onClick={(e) => setSelectedBookingId(val.bookingId)}
                                            key={val.id}
                                            className="w-full py-5 relative border border-gray-200 bg-white flex items-center shadow-md  rounded-md p-3 justify-between cursor-pointer"
                                        >
                                            <div className="flex items-center gap-7">
                                                <IoMdNotificationsOutline size={35} />
                                                <div className="space-y-2 ">
                                                    <p className="text-xs md:text-sm">{val.date} - {val.time}</p>
                                                    <p className="text-sm md:text-base">{val.message}</p>
                                                    <button onClick={(e) => {modalOpens(val.id); e.stopPropagation(); }} className="absolute top-2 right-2 md:text-base font-black hover:text-white text-gray-500 border w-6 h-6 md:h-8 md:w-8 text-sm rounded-full hover:bg-red-500" >X</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </>
                    ) : (
                        notification.map((val) => (
                            <div
                                onClick={(e) => setSelectedBookingId(val.bookingId)}
                                key={val.id}
                                className="w-full py-5 relative flex items-center shadow-md  border border-gray-200 bg-white  rounded-md p-3 justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-7">
                                    <IoMdNotificationsOutline size={35} />
                                    <div className="space-y-2 ">
                                        <p className="text-xs md:text-sm">{val.createdAt} - {val.time}</p>
                                        <p className="text-sm md:text-base">{val.message}</p>
                                        <button onClick={(e) => {modalOpens(val.id); e.stopPropagation(); }} className="absolute top-2 right-2 md:text-base font-black text-white border w-5 h-5 md:h-7 md:w-7 text-sm rounded-full hover:bg-red-500" >X</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="h-20" ></div>
            </div>
            {/* card detail */}
            {selectedBookingId && selectedBooking && (
                <div className="fixed w-full h-full bg-black/20 p-10 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-full relative flex flex-col xl:max-w-2xl bg-[#eeee]  rounded-md py-10 shadow-md p-3">
                        <div className="flex items-center gap-7">
                            <img src={doc} alt="Doctor" className="w-12 h-12" />
                            <div className="space-y-2">
                                <h1 className="text-xl">{selectedBooking.doctor?.name || "Unknown Doctor"}</h1>
                                <p className="text-xs">
                                    {selectedBooking.status},{" "}
                                    {new Date(selectedBooking.dateTime).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm mt-5">
                            {selectedBooking.status === "pending" && "Your booking is pending approval."}
                            {selectedBooking.status === "approved" && "Your booking has been approved!"}
                            {selectedBooking.status === "rejected" && "Your booking has been rejected."}
                        </p>
                        <button
                            onClick={() => setSelectedBookingId(null)}
                            className="text-red-500 xl:px-5 xl:py-1 xl:text-xl font-black absolute top-2 right-3 cursor-pointer"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            {/* component modal */}
            {
                isModalOpen && (
                    <ModalComponent 
                        onClick={handleDeleted} 
                        close={() => setIsModalOpen(false)} 
                        closed={'Batal'}
                        name={'Deleted'} 
                        judul={'Konfrimed'}
                        backgroundColor={'bg-red-500 rounded-md hover:bg-red-600'}
                        message={' Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'}
                    />
                ) 
            }
            {
                isModalOpenSucces && (
                <ModalComponent judul={'succes'} closed={'Close'} close={() => setIsModalOpenSucces(false)} backgroundColor={'bg-green-500 rounded-md hover:bg-red-600'} message={'The booking has been removed successfully. Thank you for keeping your records up to date.'} />
                ) 
            }
            {
                selectedBookingId && selectedBooking && (
                    <div className="fixed w-full h-full bg-black/20 p-10 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-full relative flex flex-col xl:max-w-2xl bg-white rounded-md py-10 shadow-md p-3">
                            <div className="flex items-center gap-7">
                                <img src={doc} alt="Doctor" className="w-12 h-12" />
                                <div className="space-y-2">
                                    <h1 className="text-xl">{selectedBooking.doctor?.name || "Unknown Doctor"}</h1>
                                    <p className="text-xs">
                                        {selectedBooking.status},{" "}
                                        {new Date(selectedBooking.dateTime).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm mt-5">
                                {selectedBooking.status === "pending" && "Your booking is pending approval."}
                                {selectedBooking.status === "approved" && "Your booking has been approved!"}
                                {selectedBooking.status === "rejected" && "Your booking has been rejected."}
                            </p>
                            <button
                                onClick={() => setSelectedBookingId(null)}
                                className="text-red-500 xl:px-5 xl:py-1 xl:text-xl font-black absolute top-2 right-3 cursor-pointer"
                            >
                                X
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Notification;
