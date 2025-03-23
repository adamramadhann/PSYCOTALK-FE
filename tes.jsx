const formattedData = notification?.map((val) => {
    if (!val.createdAt || !val.booking) return null; // Pastikan ada booking

    const date = new Date(val.createdAt);

    // Ambil status booking
    const status = val.booking.status;

    // Buat message baru berdasarkan status booking
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
            customMessage = val.message; // Gunakan default message jika tidak ada yang cocok
    }

    return {
        id: val.id,
        message: customMessage, // Ganti message dengan customMessage
        date: date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }),
        time: date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        booking: val.booking, // Simpan data booking
    };
}).filter(Boolean);
