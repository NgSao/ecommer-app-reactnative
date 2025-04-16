import { Alert } from "react-native"
// Thêm vào cuối file api.tsx hiện tại
import AsyncStorage from "@react-native-async-storage/async-storage"

// Giả sử đây là nơi bạn định nghĩa hoặc import api và mockProducts
const api = {} // Khởi tạo api object
const mockProducts = [
    {
        id: "1",
        name: "iPhone 13",
        description: "Điện thoại iPhone 13",
        price: 24990000,
        imageUrl: "https://placeholder.com/100x100?text=iPhone13",
        categoryId: "1",
        variants: [
            { id: "1", color: "red", memory: "128GB", price: 24990000, stock: 10 },
            { id: "2", color: "red", memory: "256GB", price: 27990000, stock: 5 },
        ],
    },
    {
        id: "2",
        name: "Samsung Galaxy S21",
        description: "Điện thoại Samsung Galaxy S21",
        price: 22990000,
        imageUrl: "https://placeholder.com/100x100?text=SamsungS21",
        categoryId: "1",
        variants: [
            { id: "3", color: "black", memory: "128GB", price: 22990000, stock: 7 },
            { id: "4", color: "black", memory: "256GB", price: 25990000, stock: 3 },
        ],
    },
]

// Mock data cho admin dashboard
const mockAdminStats = {
    totalRevenue: 1250000000,
    totalOrders: 156,
    pendingOrders: 23,
    totalProducts: 78,
    lowStockProducts: 12,
    totalCustomers: 320,
}

const mockRevenueData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [{ data: [45000000, 52000000, 49000000, 60000000, 70000000, 85000000] }],
}

const mockCategorySales = {
    labels: ["iPhone", "iPad", "Mac", "Watch", "Phụ kiện"],
    data: [45, 25, 15, 10, 5],
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
}

const mockOrderStatusStats = {
    labels: ["Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"],
    data: [23, 15, 110, 8],
}

const mockAdminCategories = [
    {
        id: "1",
        name: "iPhone",
        image: "https://placeholder.com/100x100?text=iPhone",
        productCount: 15,
        parentId: null,
    },
    {
        id: "2",
        name: "iPad",
        image: "https://placeholder.com/100x100?text=iPad",
        productCount: 8,
        parentId: null,
    },
    {
        id: "3",
        name: "Mac",
        image: "https://placeholder.com/100x100?text=Mac",
        productCount: 12,
        parentId: null,
    },
    {
        id: "4",
        name: "Watch",
        image: "https://placeholder.com/100x100?text=Watch",
        productCount: 6,
        parentId: null,
    },
    {
        id: "5",
        name: "iPhone 16 Series",
        image: "https://placeholder.com/100x100?text=iPhone16",
        productCount: 5,
        parentId: "1",
        parentName: "iPhone",
    },
]

const mockAdminOrders = [
    {
        id: "ORD001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0987654321",
        date: "2025-03-15T10:30:00Z",
        status: "Đã giao hàng",
        statusCode: "delivered",
        total: 30490000,
    },
    {
        id: "ORD002",
        customerName: "Trần Thị B",
        customerPhone: "0912345678",
        date: "2025-03-10T08:30:00Z",
        status: "Đang xử lý",
        statusCode: "processing",
        total: 10990000,
    },
    {
        id: "ORD003",
        customerName: "Lê Văn C",
        customerPhone: "0909123456",
        date: "2025-03-05T14:15:00Z",
        status: "Đang giao hàng",
        statusCode: "shipping",
        total: 8242500,
    },
    {
        id: "ORD004",
        customerName: "Phạm Thị D",
        customerPhone: "0978123456",
        date: "2025-03-01T16:45:00Z",
        status: "Chờ xử lý",
        statusCode: "pending",
        total: 15990000,
    },
    {
        id: "ORD005",
        customerName: "Vũ Văn E",
        customerPhone: "0918765432",
        date: "2025-02-25T09:20:00Z",
        status: "Đã hủy",
        statusCode: "cancelled",
        total: 22490000,
    },
]

// Mock data cho đánh giá
const mockReviews = {
    "1": {
        reviews: [
            {
                id: "1",
                productId: "1",
                productName: "iPhone 15 Pro Max",
                productImage: "https://placeholder.com/300x300",
                productPrice: 29990000,
                userName: "Nguyễn Văn A",
                rating: 5,
                date: "2025-03-15T10:30:00Z",
                comment: "Sản phẩm rất tốt, đóng gói cẩn thận. Pin trâu, màn hình đẹp. Rất hài lòng với sản phẩm.",
                images: ["https://placeholder.com/100x100", "https://placeholder.com/100x100"],
            },
            {
                id: "2",
                productId: "1",
                productName: "iPhone 15 Pro Max",
                productImage: "https://placeholder.com/300x300",
                productPrice: 29990000,
                userName: "Trần Thị B",
                rating: 4,
                date: "2025-03-10T08:30:00Z",
                comment: "Máy đẹp, chụp ảnh sắc nét. Chỉ tiếc là pin hơi tụt nhanh khi chơi game nặng.",
            },
            {
                id: "3",
                productId: "1",
                productName: "iPhone 15 Pro Max",
                productImage: "https://placeholder.com/300x300",
                productPrice: 29990000,
                userName: "Lê Văn C",
                rating: 5,
                date: "2025-03-05T14:15:00Z",
                comment: "Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Camera chụp đêm rất tốt, pin dùng cả ngày không hết.",
                images: ["https://placeholder.com/100x100"],
                reply: "Cảm ơn bạn đã tin tưởng và ủng hộ Minh Tuấn Mobile. Chúc bạn có trải nghiệm tuyệt vời với sản phẩm!",
                replyDate: "2025-03-06T09:30:00Z",
            },
            {
                id: "4",
                productId: "1",
                productName: "iPhone 15 Pro Max",
                productImage: "https://placeholder.com/300x300",
                productPrice: 29990000,
                userName: "Phạm Thị D",
                rating: 3,
                date: "2025-03-01T16:45:00Z",
                comment: "Sản phẩm tạm ổn, nhưng giá hơi cao so với các tính năng được cung cấp.",
            },
            {
                id: "5",
                productId: "1",
                productName: "iPhone 15 Pro Max",
                productImage: "https://placeholder.com/300x300",
                productPrice: 29990000,
                userName: "Vũ Văn E",
                rating: 5,
                date: "2025-02-25T09:20:00Z",
                comment: "Rất hài lòng với chiếc điện thoại này. Camera chụp đẹp, pin trâu.",
                images: [
                    "https://placeholder.com/100x100",
                    "https://placeholder.com/100x100",
                    "https://placeholder.com/100x100",
                ],
            },
        ],
        average: 4.4,
        total: 5,
        distribution: {
            5: 3,
            4: 1,
            3: 1,
            2: 0,
            1: 0,
        },
    },
    "2": {
        reviews: [
            {
                id: "6",
                productId: "2",
                productName: "Samsung Galaxy S24 Ultra",
                productImage: "https://placeholder.com/300x300",
                productPrice: 27990000,
                userName: "Hoàng Văn F",
                rating: 5,
                date: "2025-03-12T11:20:00Z",
                comment: "Điện thoại Samsung tốt nhất từ trước đến nay. Camera zoom cực xa, pin trâu.",
                images: ["https://placeholder.com/100x100"],
            },
            {
                id: "7",
                productId: "2",
                productName: "Samsung Galaxy S24 Ultra",
                productImage: "https://placeholder.com/300x300",
                productPrice: 27990000,
                userName: "Ngô Thị G",
                rating: 4,
                date: "2025-03-08T15:40:00Z",
                comment: "Máy đẹp, chụp ảnh tốt. Chỉ tiếc là hơi nặng so với các điện thoại khác.",
            },
        ],
        average: 4.5,
        total: 2,
        distribution: {
            5: 1,
            4: 1,
            3: 0,
            2: 0,
            1: 0,
        },
    },
}

const initReviewsData = async () => {
    try {
        const existingData = await AsyncStorage.getItem("reviews_data")
        if (!existingData) {
            await AsyncStorage.setItem("reviews_data", JSON.stringify(mockReviews))
        }
    } catch (error) {
        console.error("Error initializing reviews data:", error)
    }
}

// Khởi tạo dữ liệu khi app khởi động
initReviewsData()

// Thêm namespace admin vào đối tượng api
api.admin = {
    // Lấy tất cả đánh giá
    getAllReviews: async () => {
        try {
            const reviewsData = await AsyncStorage.getItem("reviews_data")
            if (!reviewsData) {
                return { success: false, error: "Không tìm thấy dữ liệu đánh giá" }
            }

            const reviewsObj = JSON.parse(reviewsData)

            // Chuyển đổi từ cấu trúc theo sản phẩm sang danh sách phẳng
            const allReviews = []
            Object.keys(reviewsObj).forEach((productId) => {
                reviewsObj[productId].reviews.forEach((review) => {
                    allReviews.push({
                        ...review,
                        productId,
                    })
                })
            })

            return {
                success: true,
                data: allReviews,
            }
        } catch (error) {
            console.error("Error fetching all reviews:", error)
            return { success: false, error: "Lỗi khi lấy dữ liệu đánh giá" }
        }
    },

    // Lấy đánh giá theo ID
    getReviewById: async (reviewId) => {
        try {
            const reviewsData = await AsyncStorage.getItem("reviews_data")
            if (!reviewsData) {
                return { success: false, error: "Không tìm thấy dữ liệu đánh giá" }
            }

            const reviewsObj = JSON.parse(reviewsData)

            // Tìm đánh giá theo ID
            let foundReview = null

            for (const productId in reviewsObj) {
                const review = reviewsObj[productId].reviews.find((r) => r.id === reviewId)
                if (review) {
                    foundReview = {
                        ...review,
                        productId,
                    }
                    break
                }
            }

            if (!foundReview) {
                return { success: false, error: "Không tìm thấy đánh giá" }
            }

            return {
                success: true,
                data: foundReview,
            }
        } catch (error) {
            console.error("Error fetching review by ID:", error)
            return { success: false, error: "Lỗi khi lấy thông tin đánh giá" }
        }
    },

    // Phản hồi đánh giá
    replyToReview: async (reviewId, replyText) => {
        try {
            const reviewsData = await AsyncStorage.getItem("reviews_data")
            if (!reviewsData) {
                return { success: false, error: "Không tìm thấy dữ liệu đánh giá" }
            }

            const reviewsObj = JSON.parse(reviewsData)
            let updated = false

            // Tìm và cập nhật đánh giá
            for (const productId in reviewsObj) {
                const reviewIndex = reviewsObj[productId].reviews.findIndex((r) => r.id === reviewId)

                if (reviewIndex !== -1) {
                    reviewsObj[productId].reviews[reviewIndex].reply = replyText
                    reviewsObj[productId].reviews[reviewIndex].replyDate = new Date().toISOString()
                    updated = true
                    break
                }
            }

            if (!updated) {
                return { success: false, error: "Không tìm thấy đánh giá" }
            }

            // Lưu dữ liệu đã cập nhật
            await AsyncStorage.setItem("reviews_data", JSON.stringify(reviewsObj))

            return { success: true }
        } catch (error) {
            console.error("Error replying to review:", error)
            return { success: false, error: "Lỗi khi phản hồi đánh giá" }
        }
    },

    // Xóa đánh giá
    deleteReview: async (reviewId) => {
        try {
            const reviewsData = await AsyncStorage.getItem("reviews_data")
            if (!reviewsData) {
                return { success: false, error: "Không tìm thấy dữ liệu đánh giá" }
            }

            const reviewsObj = JSON.parse(reviewsData)
            let deleted = false

            // Tìm và xóa đánh giá
            for (const productId in reviewsObj) {
                const reviewIndex = reviewsObj[productId].reviews.findIndex((r) => r.id === reviewId)

                if (reviewIndex !== -1) {
                    // Xóa đánh giá khỏi mảng
                    reviewsObj[productId].reviews.splice(reviewIndex, 1)

                    // Cập nhật thống kê
                    const reviews = reviewsObj[productId].reviews
                    const total = reviews.length

                    // Tính lại điểm trung bình
                    let sum = 0
                    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

                    reviews.forEach((review) => {
                        sum += review.rating
                        distribution[review.rating]++
                    })

                    const average = total > 0 ? sum / total : 0

                    // Cập nhật thống kê
                    reviewsObj[productId].average = Number.parseFloat(average.toFixed(1))
                    reviewsObj[productId].total = total
                    reviewsObj[productId].distribution = distribution

                    deleted = true
                    break
                }
            }

            if (!deleted) {
                return { success: false, error: "Không tìm thấy đánh giá" }
            }

            // Lưu dữ liệu đã cập nhật
            await AsyncStorage.setItem("reviews_data", JSON.stringify(reviewsObj))

            return { success: true }
        } catch (error) {
            console.error("Error deleting review:", error)
            return { success: false, error: "Lỗi khi xóa đánh giá" }
        }
    },

    // Lấy đánh giá theo sản phẩm
    getReviewsByProduct: async (productId) => {
        try {
            const reviewsData = await AsyncStorage.getItem("reviews_data")
            if (!reviewsData) {
                return { success: false, error: "Không tìm thấy dữ liệu đánh giá" }
            }

            const reviewsObj = JSON.parse(reviewsData)

            if (!reviewsObj[productId]) {
                // Nếu sản phẩm chưa có đánh giá, trả về mảng rỗng
                return {
                    success: true,
                    data: {
                        reviews: [],
                        average: 0,
                        total: 0,
                        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                    },
                }
            }

            return {
                success: true,
                data: reviewsObj[productId],
            }
        } catch (error) {
            console.error("Error fetching reviews by product:", error)
            return { success: false, error: "Lỗi khi lấy đánh giá theo sản phẩm" }
        }
    },



    // exportReport: async ({ type, dateRange, format }) => {
    //     try {
    //         // Gọi API thực tế nếu có backend
    //         // const response = await fetch(`${API_BASE_URL}/admin/export-report`, {
    //         //     method: "POST",
    //         //     headers: { "Content-Type": "application/json" },
    //         //     body: JSON.stringify({ type, dateRange, format }),
    //         // });

    //         // Dữ liệu giả lập để test
    //         return {
    //             success: true,
    //             data: {
    //                 fileContent: "JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PAovVHlwZSAv", // Thay thế bằng dữ liệu base64 thực tế từ API
    //             },
    //         };
    //     } catch (error) {
    //         console.error("Error exporting report:", error);
    //         return { success: false, error: "Failed to export report" };
    //     }
    // },

    // Dashboard APIs
    exportReport: async (params) => {
        try {
            // Trong môi trường thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/export-report`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            //   },
            //   body: JSON.stringify(params)
            // }).then(res => res.json());

            // Giả lập độ trễ mạng
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Tạo tên file dựa trên loại báo cáo và định dạng
            const fileName = `${params.type}_report_${new Date().toISOString().split("T")[0]}.${params.format}`

            // Giả lập dữ liệu file khác nhau dựa trên định dạng
            let fileContent

            if (params.format === "pdf") {
                // Base64 encoded PDF sample (chỉ là một file PDF rỗng)
                fileContent =
                    "JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDM4Pj5zdHJlYW0KeJwr5HIK4TI2UzC0NFMISeFyDeEK5CpUMFQwAEIImZZfmlcCAFH0BX0KZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCjw8L0NvbnRlbnRzIDUgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDYgMCBSPj4+Pi9UcmltQm94WzAgMCA1OTUgODQyXS9UeXBlL1BhZ2U+PgplbmRvYmoKMSAwIG9iago8PC9QYWdlcyAyIDAgUi9UeXBlL0NhdGFsb2c+PgplbmRvYmoKMyAwIG9iago8PC9BdXRob3IoTWluaCBUdWFuIE1vYmlsZSkvQ3JlYXRpb25EYXRlKEQ6MjAyMzA0MTUxMjMwMDArMDcnMDAnKS9Nb2REYXRlKEQ6MjAyMzA0MTUxMjMwMDArMDcnMDAnKS9Qcm9kdWNlcihNaW5oIFR1YW4gTW9iaWxlIFJlcG9ydCBHZW5lcmF0b3IpL1RpdGxlKELDoG8gY8OhbyBkb2FuaCBz4buRKT4+CmVuZG9iago2IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQ+PgplbmRvYmoKMiAwIG9iago8PC9Db3VudCAxL0tpZHNbNCAwIFJdL1R5cGUvUGFnZXM+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjEyIDAwMDAwIG4gCjAwMDAwMDA1MTAgMDAwMDAgbiAKMDAwMDAwMDI1NyAwMDAwMCBuIAowMDAwMDAwMDk5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQyMSAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gMyAwIFIvUm9vdCAxIDAgUi9TaXplIDc+PgpzdGFydHhyZWYKNTYxCiUlRU9GCg=="
            } else if (params.format === "xlsx") {
                // Base64 encoded Excel sample (chỉ là một file Excel rỗng)
                fileContent =
                    "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"
            }

            // Giả lập việc trả về URL của file
            return Promise.resolve({ fileUrl: `data:application/${params.format};base64,${fileContent}`, fileName })
        } catch (error) {
            console.error("Lỗi khi export report:", error)
            throw error
        }
    },

    getStats: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/stats`);

            return { success: true, data: mockAdminStats }
        } catch (error) {
            console.error("Error fetching admin stats:", error)
            return { success: false, error: "Failed to fetch admin stats" }
        }
    },

    getRevenueData: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/revenue`);

            return { success: true, data: mockRevenueData }
        } catch (error) {
            console.error("Error fetching revenue data:", error)
            return { success: false, error: "Failed to fetch revenue data" }
        }
    },

    getCategorySales: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/category-sales`);

            return { success: true, data: mockCategorySales }
        } catch (error) {
            console.error("Error fetching category sales:", error)
            return { success: false, error: "Failed to fetch category sales" }
        }
    },

    getOrderStatusStats: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/order-status-stats`);

            return { success: true, data: mockOrderStatusStats }
        } catch (error) {
            console.error("Error fetching order status stats:", error)
            return { success: false, error: "Failed to fetch order status stats" }
        }
    },

    // Product Management APIs
    getProducts: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/products`);

            // Sử dụng mockProducts từ API hiện tại và thêm totalStock
            const products = mockProducts.map((product) => {
                const totalStock = product.variants ? product.variants.reduce((sum, variant) => sum + variant.stock, 0) : 0

                return {
                    ...product,
                    totalStock,
                }
            })

            return { success: true, data: products }
        } catch (error) {
            console.error("Error fetching admin products:", error)
            return { success: false, error: "Failed to fetch admin products" }
        }
    },

    createProduct: async (productData) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/products`, {
            //   method: 'POST',
            //   body: JSON.stringify(productData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            return { success: true, data: { id: Date.now().toString(), ...productData } }
        } catch (error) {
            console.error("Error creating product:", error)
            return { success: false, error: "Failed to create product" }
        }
    },

    updateProduct: async (productId, productData) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
            //   method: 'PUT',
            //   body: JSON.stringify(productData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            return { success: true, data: { id: productId, ...productData } }
        } catch (error) {
            console.error("Error updating product:", error)
            return { success: false, error: "Failed to update product" }
        }
    },

    deleteProduct: async (productId) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
            //   method: 'DELETE'
            // });

            return { success: true, data: { message: "Product deleted successfully" } }
        } catch (error) {
            console.error("Error deleting product:", error)
            return { success: false, error: "Failed to delete product" }
        }
    },

    importProductsFromExcel: async (fileUri) => {
        try {
            // Trong thực tế, đây sẽ là một API call để upload file
            // const formData = new FormData();
            // formData.append('file', { uri: fileUri, name: 'products.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // return await fetch(`${API_BASE_URL}/admin/products/import`, {
            //   method: 'POST',
            //   body: formData,
            //   headers: { 'Content-Type': 'multipart/form-data' }
            // });

            return { success: true, data: { importedCount: 15, message: "Products imported successfully" } }
        } catch (error) {
            console.error("Error importing products:", error)
            return { success: false, error: "Failed to import products" }
        }
    },

    // Category Management APIs
    getCategories: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/categories`);

            return { success: true, data: mockAdminCategories }
        } catch (error) {
            console.error("Error fetching categories:", error)
            return { success: false, error: "Failed to fetch categories" }
        }
    },

    createCategory: async (categoryData) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/categories`, {
            //   method: 'POST',
            //   body: JSON.stringify(categoryData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            return { success: true, data: { id: Date.now().toString(), ...categoryData, productCount: 0 } }
        } catch (error) {
            console.error("Error creating category:", error)
            return { success: false, error: "Failed to create category" }
        }
    },

    updateCategory: async (categoryId, categoryData) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
            //   method: 'PUT',
            //   body: JSON.stringify(categoryData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            return { success: true, data: { id: categoryId, ...categoryData } }
        } catch (error) {
            console.error("Error updating category:", error)
            return { success: false, error: "Failed to update category" }
        }
    },

    deleteCategory: async (categoryId) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
            //   method: 'DELETE'
            // });

            return { success: true, data: { message: "Category deleted successfully" } }
        } catch (error) {
            console.error("Error deleting category:", error)
            return { success: false, error: "Failed to delete category" }
        }
    },

    // Order Management APIs
    getOrders: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/orders`);

            return { success: true, data: mockAdminOrders }
        } catch (error) {
            console.error("Error fetching orders:", error)
            return { success: false, error: "Failed to fetch orders" }
        }
    },

    getOrderById: async (orderId) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/orders/${orderId}`);

            const order = mockAdminOrders.find((o) => o.id === orderId)
            if (order) {
                return { success: true, data: order }
            } else {
                return { success: false, error: "Order not found" }
            }
        } catch (error) {
            console.error("Error fetching order:", error)
            return { success: false, error: "Failed to fetch order" }
        }
    },

    updateOrderStatus: async (orderId, status) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
            //   method: 'PUT',
            //   body: JSON.stringify({ status }),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            const statusMap = {
                pending: "Chờ xử lý",
                processing: "Đang xử lý",
                shipping: "Đang giao hàng",
                delivered: "Đã giao hàng",
                cancelled: "Đã hủy",
            }

            return {
                success: true,
                data: {
                    id: orderId,
                    status: statusMap[status] || status,
                    statusCode: status,
                },
            }
        } catch (error) {
            console.error("Error updating order status:", error)
            return { success: false, error: "Failed to update order status" }
        }
    },

    // Export Data APIs
    exportRevenueData: async (startDate, endDate) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/export/revenue?startDate=${startDate}&endDate=${endDate}`);

            return {
                success: true,
                data: {
                    fileUrl: "https://example.com/exports/revenue-report.xlsx",
                    message: "Revenue data exported successfully",
                },
            }
        } catch (error) {
            console.error("Error exporting revenue data:", error)
            return { success: false, error: "Failed to export revenue data" }
        }
    },

    exportOrdersData: async (filters) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/export/orders`, {
            //   method: 'POST',
            //   body: JSON.stringify(filters),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            return {
                success: true,
                data: {
                    fileUrl: "https://example.com/exports/orders-report.xlsx",
                    message: "Orders data exported successfully",
                },
            }
        } catch (error) {
            console.error("Error exporting orders data:", error)
            return { success: false, error: "Failed to export orders data" }
        }
    },

    exportProductsData: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/admin/export/products`);

            return {
                success: true,
                data: {
                    fileUrl: "https://example.com/exports/products-report.xlsx",
                    message: "Products data exported successfully",
                },
            }
        } catch (error) {
            console.error("Error exporting products data:", error)
            return { success: false, error: "Failed to export products data" }
        }
    },

    // Client APIs
    getProducts: async () => {
        try {
            return { success: true, data: mockProducts }
        } catch (error) {
            console.error("Error fetching products:", error)
            return { success: false, error: "Failed to fetch products" }
        }
    },

    getProductById: async (productId) => {
        try {
            const product = mockProducts.find((p) => p.id === productId)
            if (product) {
                return { success: true, data: product }
            } else {
                return { success: false, error: "Product not found" }
            }
        } catch (error) {
            console.error("Error fetching product:", error)
            return { success: false, error: "Failed to fetch product" }
        }
    },

    getCategories: async () => {
        try {
            return { success: true, data: mockAdminCategories }
        } catch (error) {
            console.error("Error fetching categories:", error)
            return { success: false, error: "Failed to fetch categories" }
        }
    },

    login: async (email, password) => {
        try {
            // Mock successful login
            // Trong thực tế, đây sẽ là một API call để xác thực user
            // và trả về thông tin user cùng với token

            // Kiểm tra nếu là tài khoản admin (ví dụ: admin@example.com)
            const isAdmin = email.toLowerCase() === "admin@example.com"

            const mockUser = {
                id: "1",
                name: isAdmin ? "Admin User" : "John Doe",
                email: email,
                phone: "123-456-7890",
                avatar: "https://placeholder.com/100x100?text=Avatar",
                role: isAdmin ? "admin" : "customer", // Thêm thông tin role
                addresses: [
                    {
                        id: "addr1",
                        name: "Home",
                        recipient: isAdmin ? "Admin User" : "John Doe",
                        phone: "123-456-7890",
                        address: "123 Main St",
                        ward: "Ward 1",
                        district: "District 1",
                        city: "Ho Chi Minh City",
                        isDefault: true,
                    },
                ],
            }
            const mockToken = "mockUserToken" + Date.now()
            return { success: true, data: { user: mockUser, token: mockToken } }
        } catch (error) {
            console.error("Login error:", error)
            return { success: false, error: "Invalid credentials" }
        }
    },

    getUserProfile: async (token) => {
        try {
            // Mock successful user profile retrieval
            // Trong thực tế, đây sẽ là một API call để lấy thông tin user dựa vào token

            // Giả sử token có chứa thông tin để xác định user là admin hay không
            const isAdmin = token.includes("admin")

            const mockUser = {
                id: "1",
                name: isAdmin ? "Admin User" : "John Doe",
                email: isAdmin ? "admin@example.com" : "john.doe@example.com",
                phone: "123-456-7890",
                avatar: "https://placeholder.com/100x100?text=Avatar",
                role: isAdmin ? "admin" : "customer", // Thêm thông tin role
                addresses: [
                    {
                        id: "addr1",
                        name: "Home",
                        recipient: isAdmin ? "Admin User" : "John Doe",
                        phone: "123-456-7890",
                        address: "123 Main St",
                        ward: "Ward 1",
                        district: "District 1",
                        city: "Ho Chi Minh City",
                        isDefault: true,
                    },
                ],
            }
            return { success: true, data: mockUser }
        } catch (error) {
            console.error("Get user profile error:", error)
            return { success: false, error: "Failed to get user profile" }
        }
    },

    updateUserProfile: async (token, userData) => {
        try {
            // Mock successful user profile update
            return { success: true }
        } catch (error) {
            console.error("Update user profile error:", error)
            return { success: false, error: "Failed to update user profile" }
        }
    },

    verifyPassword: async (token, password) => {
        try {
            // Mock successful password verification
            return { success: true }
        } catch (error) {
            console.error("Verify password error:", error)
            return { success: false, error: "Invalid password" }
        }
    },

    updatePassword: async (token, newPassword) => {
        try {
            // Mock successful password update
            return { success: true }
        } catch (error) {
            console.error("Update password error:", error)
            return { success: false, error: "Failed to update password" }
        }
    },

    getWishlist: async (token) => {
        try {
            // Mock successful wishlist retrieval
            const mockWishlist = [
                {
                    id: "1",
                    name: "iPhone 13",
                    price: 24990000,
                    image: "https://placeholder.com/100x100?text=iPhone13",
                },
                {
                    id: "2",
                    name: "Samsung Galaxy S21",
                    price: 22990000,
                    image: "https://placeholder.com/100x100?text=SamsungS21",
                },
            ]
            return { success: true, data: mockWishlist }
        } catch (error) {
            console.error("Get wishlist error:", error)
            return { success: false, error: "Failed to get wishlist" }
        }
    },

    addToWishlist: async (token, productId) => {
        try {
            // Mock successful add to wishlist
            return { success: true }
        } catch (error) {
            console.error("Add to wishlist error:", error)
            return { success: false, error: "Failed to add to wishlist" }
        }
    },

    removeFromWishlist: async (token, productId) => {
        try {
            // Mock successful remove from wishlist
            return { success: true }
        } catch (error) {
            console.error("Remove from wishlist error:", error)
            return { success: false, error: "Failed to remove from wishlist" }
        }
    },

    createOrder: async (token, orderData) => {
        try {
            // Mock successful order creation
            const mockOrderId = "ORD" + Date.now().toString()
            return { success: true, data: { orderId: mockOrderId } }
        } catch (error) {
            console.error("Create order error:", error)
            return { success: false, error: "Failed to create order" }
        }
    },

    searchProducts: async (query) => {
        try {
            // Mock successful search
            const mockSearchResults = mockProducts.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase()),
            )
            return { success: true, data: mockSearchResults }
        } catch (error) {
            console.error("Search products error:", error)
            return { success: false, error: "Failed to search products" }
        }
    },

    getProductsByCategory: async (category, subcategory) => {
        try {
            // Mock successful retrieval of products by category
            const mockCategoryProducts = mockProducts.filter((product) => product.categoryId === "1")
            return { success: true, data: mockCategoryProducts }
        } catch (error) {
            console.error("Get products by category error:", error)
            return { success: false, error: "Failed to get products by category" }
        }
    },

    getSaleProducts: async () => {
        try {
            // Mock successful retrieval of sale products
            const mockSaleProducts = mockProducts.filter((product) => product.id === "1" || product.id === "2")
            return { success: true, data: mockSaleProducts }
        } catch (error) {
            console.error("Get sale products error:", error)
            return { success: false, error: "Failed to get sale products" }
        }
    },

    getFlashSaleProducts: async () => {
        try {
            // Mock successful retrieval of flash sale products
            const mockFlashSaleProducts = mockProducts.filter((product) => product.id === "1")
            return { success: true, data: mockFlashSaleProducts }
        } catch (error) {
            console.error("Get flash sale products error:", error)
            return { success: false, error: "Failed to get flash sale products" }
        }
    },

    getHotDeals: async () => {
        try {
            // Mock successful retrieval of hot deals
            return { success: true, data: [] }
        } catch (error) {
            console.error("Get hot deals error:", error)
            return { success: false, error: "Failed to get hot deals" }
        }
    },

    getBanners: async () => {
        try {
            // Mock successful retrieval of banners
            const mockBanners = [
                { id: "1", image: "https://placeholder.com/300x100", link: "https://example.com" },
                { id: "2", image: "https://placeholder.com/300x100", link: "https://example.com" },
            ]
            return { success: true, data: mockBanners }
        } catch (error) {
            console.error("Get banners error:", error)
            return { success: false, error: "Failed to get banners" }
        }
    },

    getProductReviews: async (productId) => {
        try {
            // Mock successful retrieval of product reviews
            const mockReviews = [
                {
                    id: "1",
                    productId: productId,
                    userName: "John Doe",
                    rating: 5,
                    comment: "Great product!",
                    date: "2023-03-15T10:30:00Z",
                    images: [],
                },
                {
                    id: "2",
                    productId: productId,
                    userName: "Jane Smith",
                    rating: 4,
                    comment: "Good product, but could be better.",
                    date: "2023-03-10T08:30:00Z",
                    images: [],
                },
            ]
            return {
                success: true,
                data: { reviews: mockReviews, average: 4.5, total: 2, distribution: { 5: 1, 4: 1, 3: 0, 2: 0, 1: 0 } },
            }
        } catch (error) {
            console.error("Get product reviews error:", error)
            return { success: false, error: "Failed to get product reviews" }
        }
    },

    submitProductReview: async (reviewData) => {
        try {
            // Mock successful submission of product review
            return { success: true }
        } catch (error) {
            console.error("Submit product review error:", error)
            return { success: false, error: "Failed to submit product review" }
        }
    },

    getUserPromoCodes: async (userId) => {
        try {
            // Mock successful retrieval of user promo codes
            const mockPromoCodes = [
                {
                    id: "1",
                    code: "WELCOME10",
                    description: "Giảm 10% cho đơn hàng đầu tiên",
                    discountType: "percentage",
                    discountValue: 10,
                    minOrderValue: 1000000,
                    maxDiscount: 500000,
                    expiryDate: "2025-12-31T23:59:59Z",
                    isActive: true,
                },
            ]
            return { success: true, data: mockPromoCodes }
        } catch (error) {
            console.error("Get user promo codes error:", error)
            return { success: false, error: "Failed to get user promo codes" }
        }
    },

    validatePromoCode: async (promoCode, subtotal) => {
        try {
            // Mock successful validation of promo code
            const mockPromoCode = {
                id: "1",
                code: promoCode,
                description: "Giảm 10% cho đơn hàng đầu tiên",
                discountType: "percentage",
                discountValue: 10,
                minOrderValue: 1000000,
                maxDiscount: 500000,
                expiryDate: "2025-12-31T23:59:59Z",
                isActive: true,
            }
            const discountAmount = Math.min(subtotal * (mockPromoCode.discountValue / 100), mockPromoCode.maxDiscount)
            return { success: true, data: { ...mockPromoCode, discountAmount } }
        } catch (error) {
            console.error("Validate promo code error:", error)
            return { success: false, error: "Invalid promo code" }
        }
    },
    getPromotions: async () => {
        // Giả lập API call
        return {
            success: true,
            data: [
                {
                    id: 1,
                    name: "Khuyến mãi mùa hè",
                    code: "SUMMER2023",
                    discountType: "percentage",
                    discountValue: 15,
                    minOrderValue: 500000,
                    maxDiscount: 200000,
                    startDate: "2023-06-01T00:00:00Z",
                    endDate: "2023-08-31T23:59:59Z",
                    isActive: true,
                    usageLimit: 100,
                    usageCount: 45,
                },
                {
                    id: 2,
                    name: "Giảm giá Black Friday",
                    code: "BLACK2023",
                    discountType: "percentage",
                    discountValue: 25,
                    minOrderValue: 1000000,
                    maxDiscount: 500000,
                    startDate: "2023-11-24T00:00:00Z",
                    endDate: "2023-11-27T23:59:59Z",
                    isActive: true,
                    usageLimit: 200,
                    usageCount: 0,
                },
                {
                    id: 3,
                    name: "Miễn phí vận chuyển",
                    code: "FREESHIP",
                    discountType: "fixed",
                    discountValue: 30000,
                    minOrderValue: 300000,
                    maxDiscount: null,
                    startDate: "2023-01-01T00:00:00Z",
                    endDate: "2023-12-31T23:59:59Z",
                    isActive: true,
                    usageLimit: null,
                    usageCount: 320,
                },
            ],
        }
    },

    createPromotion: async (promotionData) => {
        // Giả lập API call
        return {
            success: true,
            data: {
                id: Math.floor(Math.random() * 1000) + 10,
                ...promotionData,
                usageCount: 0,
            },
        }
    },

    updatePromotion: async (id, promotionData) => {
        // Giả lập API call
        return {
            success: true,
            data: {
                id,
                ...promotionData,
            },
        }
    },

    deletePromotion: async (id) => {
        // Giả lập API call
        return {
            success: true,
        }
    },

    updatePromotionStatus: async (id, isActive) => {
        // Giả lập API call
        return {
            success: true,
            data: {
                id,
                isActive,
            },
        }
    },

    // Quản lý khách hàng
    getCustomers: async () => {
        // Giả lập API call
        return {
            success: true,
            data: [
                {
                    id: 1,
                    name: "Nguyễn Văn A",
                    email: "nguyenvana@example.com",
                    phone: "0901234567",
                    address: "123 Đường ABC, Quận 1, TP.HCM",
                    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A",
                    status: "active",
                    createdAt: "2023-01-15T08:30:00Z",
                    lastLogin: "2023-06-20T14:25:00Z",
                    orderCount: 12,
                    totalSpent: 15600000,
                },
                {
                    id: 2,
                    name: "Trần Thị B",
                    email: "tranthib@example.com",
                    phone: "0912345678",
                    address: "456 Đường XYZ, Quận 2, TP.HCM",
                    avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B",
                    status: "active",
                    createdAt: "2023-02-20T10:15:00Z",
                    lastLogin: "2023-06-18T09:10:00Z",
                    orderCount: 8,
                    totalSpent: 9800000,
                },
                {
                    id: 3,
                    name: "Lê Văn C",
                    email: "levanc@example.com",
                    phone: "0923456789",
                    address: "789 Đường DEF, Quận 3, TP.HCM",
                    avatar: "https://ui-avatars.com/api/?name=Le+Van+C",
                    status: "inactive",
                    createdAt: "2023-03-10T15:45:00Z",
                    lastLogin: "2023-05-05T11:30:00Z",
                    orderCount: 3,
                    totalSpent: 2500000,
                },
                {
                    id: 4,
                    name: "Phạm Thị D",
                    email: "phamthid@example.com",
                    phone: "0934567890",
                    address: "101 Đường GHI, Quận 4, TP.HCM",
                    avatar: "https://ui-avatars.com/api/?name=Pham+Thi+D",
                    status: "new",
                    createdAt: "2023-06-05T09:20:00Z",
                    lastLogin: "2023-06-05T09:25:00Z",
                    orderCount: 1,
                    totalSpent: 1200000,
                },
            ],
        }
    },

    getCustomerOrders: async (customerId) => {
        // Giả lập API call
        return {
            success: true,
            data: [
                {
                    id: "ORD001",
                    date: "2023-06-15T10:30:00Z",
                    status: "Đã giao",
                    total: 1250000,
                },
                {
                    id: "ORD002",
                    date: "2023-05-20T14:45:00Z",
                    status: "Đã giao",
                    total: 850000,
                },
                {
                    id: "ORD003",
                    date: "2023-04-10T09:15:00Z",
                    status: "Đã giao",
                    total: 1500000,
                },
            ],
        }
    },

    updateCustomerStatus: async (customerId, status) => {
        // Giả lập API call
        return {
            success: true,
            data: {
                id: customerId,
                status,
            },
        }
    },

    // Cài đặt cửa hàng
    getStoreSettings: async () => {
        // Giả lập API call
        return {
            success: true,
            data: {
                storeName: "Minh Tuấn Mobile",
                storeEmail: "contact@minhtuanmobile.com",
                storePhone: "1900 1234",
                storeAddress: "123 Đường ABC, Quận 1, TP.HCM",
                storeLogo: "https://via.placeholder.com/200x200?text=MT+Mobile",
                storeDescription: "Cửa hàng điện thoại di động và phụ kiện chính hãng",
                notifications: {
                    email: true,
                    orders: true,
                    stock: true,
                    promotions: true,
                },
                shipping: {
                    methods: [
                        { id: 1, name: "Giao hàng tiêu chuẩn", price: 30000, enabled: true },
                        { id: 2, name: "Giao hàng nhanh", price: 45000, enabled: true },
                        { id: 3, name: "Giao hàng hỏa tốc", price: 60000, enabled: false },
                    ],
                    freeShippingThreshold: 500000,
                },
                payment: {
                    methods: [
                        { id: 1, name: "Thanh toán khi nhận hàng (COD)", enabled: true },
                        { id: 2, name: "Chuyển khoản ngân hàng", enabled: true },
                        { id: 3, name: "Ví điện tử (MoMo, ZaloPay)", enabled: true },
                        { id: 4, name: "Thẻ tín dụng/ghi nợ", enabled: false },
                    ],
                },
            },
        }
    },

    updateStoreSettings: async (settingsData) => {
        // Giả lập API call
        return {
            success: true,
            data: settingsData,
        }
    },

    // Trang chủ Admin
    getRecentOrders: async () => {
        // Giả lập API call
        return {
            success: true,
            data: [
                {
                    id: "ORD123",
                    customerName: "Nguyễn Văn A",
                    date: "15/06/2023",
                    status: "Chờ xử lý",
                    total: 1250000,
                },
                {
                    id: "ORD124",
                    customerName: "Trần Thị B",
                    date: "14/06/2023",
                    status: "Đang xử lý",
                    total: 850000,
                },
                {
                    id: "ORD125",
                    customerName: "Lê Văn C",
                    date: "13/06/2023",
                    status: "Đã giao",
                    total: 1500000,
                },
            ],
        }
    },

    getNotifications: async () => {
        // Giả lập API call
        return {
            success: true,
            data: [
                {
                    id: 1,
                    type: "order",
                    title: "Đơn hàng mới",
                    message: "Bạn có đơn hàng mới #ORD123 từ Nguyễn Văn A",
                    time: "15 phút trước",
                    read: false,
                    screen: "AdminOrderDetail",
                    params: { orderId: "ORD123" },
                },
                {
                    id: 2,
                    type: "stock",
                    title: "Cảnh báo hết hàng",
                    message: "Sản phẩm 'iPhone 14 Pro Max' sắp hết hàng (còn 2 sản phẩm)",
                    time: "2 giờ trước",
                    read: false,
                    screen: "AdminProductsManagement",
                    params: {},
                },
                {
                    id: 3,
                    type: "customer",
                    title: "Khách hàng mới",
                    message: "Khách hàng mới Phạm Thị D vừa đăng ký tài khoản",
                    time: "1 ngày trước",
                    read: true,
                    screen: "AdminCustomersManagement",
                    params: {},
                },
            ],
        }
    },

    // Thêm API cho orderDetail
    getOrderDetails: async (orderId) => {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return Promise.resolve({
            success: true,
            data: {
                id: orderId,
                date: "2023-06-15T10:30:00Z",
                status: "Đang xử lý",
                statusCode: "processing",
                customerName: "Nguyễn Văn A",
                customerPhone: "0901234567",
                customerEmail: "nguyenvana@example.com",
                shippingAddress: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
                paymentMethod: "COD",
                paymentStatus: "unpaid",
                subtotal: 1200000,
                shippingFee: 30000,
                discount: 50000,
                tax: 120000,
                total: 1300000,
                note: "Giao hàng trong giờ hành chính",
                items: [
                    {
                        id: 1,
                        name: "iPhone 14 Pro Max",
                        variant: "128GB, Đen",
                        price: 1000000,
                        quantity: 1,
                        image: "https://via.placeholder.com/100x100?text=iPhone",
                    },
                    {
                        id: 2,
                        name: "Ốp lưng iPhone 14 Pro Max",
                        variant: "Trong suốt",
                        price: 200000,
                        quantity: 1,
                        image: "https://via.placeholder.com/100x100?text=Case",
                    },
                ],
            },
        })
    },

    // Thêm API cho admin tạo đơn hàng
    createOrder: async (orderData) => {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        return Promise.resolve({
            success: true,
            data: {
                id: `ORD${Math.floor(Math.random() * 10000)}`,
                ...orderData,
                date: new Date().toISOString(),
                status: "Chờ xử lý",
                statusCode: "pending",
            },
        })
    },

    // Thêm API để lấy danh sách sản phẩm cho việc tạo đơn hàng
    getProductsForOrder: async (searchQuery = "") => {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const products = [
            {
                id: 1,
                name: "iPhone 14 Pro Max",
                price: 29990000,
                image: "https://via.placeholder.com/100x100?text=iPhone",
                variants: [
                    { id: 101, name: "128GB, Đen", price: 29990000, stock: 10 },
                    { id: 102, name: "128GB, Bạc", price: 29990000, stock: 8 },
                    { id: 103, name: "256GB, Đen", price: 32990000, stock: 5 },
                    { id: 104, name: "256GB, Bạc", price: 32990000, stock: 3 },
                ],
            },
            {
                id: 2,
                name: "Samsung Galaxy S23 Ultra",
                price: 26990000,
                image: "https://via.placeholder.com/100x100?text=Samsung",
                variants: [
                    { id: 201, name: "128GB, Đen", price: 26990000, stock: 12 },
                    { id: 202, name: "256GB, Đen", price: 28990000, stock: 7 },
                ],
            },
            {
                id: 3,
                name: "Ốp lưng iPhone 14 Pro Max",
                price: 200000,
                image: "https://via.placeholder.com/100x100?text=Case",
                variants: [
                    { id: 301, name: "Trong suốt", price: 200000, stock: 20 },
                    { id: 302, name: "Đen", price: 250000, stock: 15 },
                ],
            },
            {
                id: 4,
                name: "Cáp sạc Lightning",
                price: 290000,
                image: "https://via.placeholder.com/100x100?text=Cable",
                variants: [],
                stock: 30,
            },
        ]

        // Lọc sản phẩm theo từ khóa tìm kiếm
        const filteredProducts = searchQuery
            ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : products

        return Promise.resolve({
            success: true,
            data: filteredProducts,
        })
    },

    // Thêm API để lấy danh sách khách hàng cho việc tạo đơn hàng
    getCustomersForOrder: async (searchQuery = "") => {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const customers = [
            {
                id: 1,
                name: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                phone: "0901234567",
                address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
            },
            {
                id: 2,
                name: "Trần Thị B",
                email: "tranthib@example.com",
                phone: "0912345678",
                address: "456 Đường DEF, Phường UVW, Quận 2, TP.HCM",
            },
            {
                id: 3,
                name: "Lê Văn C",
                email: "levanc@example.com",
                phone: "0923456789",
                address: "789 Đường GHI, Phường JKL, Quận 3, TP.HCM",
            },
        ]

        // Lọc khách hàng theo từ khóa tìm kiếm
        const filteredCustomers = searchQuery
            ? customers.filter(
                (c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.phone.includes(searchQuery) ||
                    c.email.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            : customers

        return Promise.resolve({
            success: true,
            data: filteredCustomers,
        })
    },
    createCustomer: async (customerData) => {
        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            return {
                success: true,
                data: {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...customerData,
                    createdAt: new Date().toISOString(),
                    status: "active",
                    orderCount: 0,
                    totalSpent: 0,
                },
            }
        } catch (error) {
            console.error("Error creating customer:", error)
            return { success: false, error: "Failed to create customer" }
        }
    },


}

const showError = (message) => {
    Alert.alert("Lỗi", message)
}

const showSuccess = (message) => {
    Alert.alert("Thành công", message)
}

export { api, showError, showSuccess }

