export const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
        case "PENDING":
            return "#f39c12"
        case "CONFIRMED":
            return "#3498db"
        case "SHIPPED":
            return "#9b59b6"
        case "DELIVERED":
            return "#2ecc71"
        case "CANCELLED":
            return "#e74c3c"
        default:
            return "#7f8c8d"

    }
}

export const getNotificationIcon = (type) => {
    switch (type) {
        case "order":
            return "cart-outline"
        case "stock":
            return "alert-circle-outline"
        case "customer":
            return "person-outline"
        case "promotion":
            return "pricetag-outline"
        default:
            return "notifications-outline"
    }
}

export const getNotificationColor = (type) => {
    switch (type) {
        case "order":
            return "#3498db"
        case "stock":
            return "#e74c3c"
        case "customer":
            return "#2ecc71"
        case "promotion":
            return "#f39c12"
        default:
            return "#7f8c8d"
    }

}


export const getStatusText = (status) => {
    switch (status) {
        case "PENDING":
            return "Đang xử lý";
        case "CONFIRMED":
            return "Đã xác nhận";
        case "SHIPPED":
            return "Đã giao hàng";
        case "DELIVERED":
            return "Đã giao thành công";
        case "CANCELLED":
            return "Đã hủy";
        default:
            return "Không xác định";
    }
};

// export const getStatusColor = (status) => {
//     switch (status) {
//         case "PENDING":
//             return "#FFC107"; // Màu vàng - Đang xử lý
//         case "CONFIRMED":
//             return "#03A9F4"; // Màu xanh dương nhạt - Đã xác nhận
//         case "SHIPPED":
//             return "#3F51B5"; // Màu xanh dương đậm - Đã giao hàng
//         case "DELIVERED":
//             return "#4CAF50"; // Màu xanh lá - Giao thành công
//         case "CANCELLED":
//             return "#F44336"; // Màu đỏ - Đã hủy
//         default:
//             return "#9E9E9E"; // Màu xám - Không xác định
//     }
// };