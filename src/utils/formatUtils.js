export const formatPrice = (price) => {
    return parseInt(price).toLocaleString('vi-VN') + ' đ';
};
export const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
}

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}


