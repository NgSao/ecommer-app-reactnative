export const getStatusColor = (status) => {
    switch (status) {
        case "Chờ xử lý":
            return "#f39c12"
        case "Đang xử lý":
            return "#3498db"
        case "Đang giao":
            return "#9b59b6"
        case "Đã giao":
            return "#2ecc71"
        case "Đã hủy":
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