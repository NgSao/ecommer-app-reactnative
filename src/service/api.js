
import { Alert } from "react-native"

// Base URL for API
const API_BASE_URL = "https://api.example.com"

// Mock data for development
const mockProducts = [
    {
        id: "1",
        name: "iPhone 16 Pro Max",
        price: 30490000,
        originalPrice: 32990000,
        image:
            "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
        category: "iPhone",
        subcategory: "iPhone 16 Series",
        isHot: true,
        isNew: true,
        discount: 8,
        rating: 4.8,
        ratingCount: 156,
        sold: 120,
        saleEndDate: "2025-04-30T23:59:59",
        saleQuantity: 100,
        soldQuantity: 65,
        promotions: ["Giảm 10% khi thanh toán online", "Tặng kèm ốp lưng chính hãng", "Bảo hành 2 năm chính hãng"],
        description:
            "iPhone 16 Pro Max là chiếc điện thoại cao cấp nhất của Apple với màn hình 6.7 inch Super Retina XDR OLED, chip A18 Pro mạnh mẽ, hệ thống camera chuyên nghiệp và thời lượng pin cả ngày. Sản phẩm được thiết kế với khung viền titan, mặt kính Ceramic Shield bền bỉ và khả năng chống nước IP68.",
        specifications: [
            { label: "Màn hình", value: "6.7 inch, Super Retina XDR OLED" },
            { label: "Chip", value: "A18 Pro" },
            { label: "RAM", value: "8GB" },
            { label: "Camera sau", value: "48MP, 12MP, 12MP" },
            { label: "Camera trước", value: "12MP" },
            { label: "Pin", value: "4422 mAh" },
            { label: "Hệ điều hành", value: "iOS 18" },
            { label: "Độ phân giải", value: "2796 x 1290 pixels" },
        ],
        variants: [
            {
                id: "1-1",
                color: "Đen",
                storage: "128GB",
                price: 30490000,
                originalPrice: 32990000,
                stock: 15,
                image:
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                ],
            },
            {
                id: "1-2",
                color: "Đen",
                storage: "256GB",
                price: 33990000,
                originalPrice: 36990000,
                stock: 10,
                image:
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                ],
            },
            {
                id: "1-3",
                color: "Đen",
                storage: "512GB",
                price: 39990000,
                originalPrice: 42990000,
                stock: 5,
                image:
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                ],
            },
            {
                id: "1-4",
                color: "Đen",
                storage: "1TB",
                price: 45990000,
                originalPrice: 48990000,
                stock: 0,
                image:
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                ],
            },
            {
                id: "1-5",
                color: "Trắng",
                storage: "128GB",
                price: 30490000,
                originalPrice: 32990000,
                stock: 20,
                image: "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                ],
            },
            {
                id: "1-6",
                color: "Trắng",
                storage: "256GB",
                price: 33990000,
                originalPrice: 36990000,
                stock: 0,
                image: "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                ],
            },
            {
                id: "1-7",
                color: "Trắng",
                storage: "512GB",
                price: 39990000,
                originalPrice: 42990000,
                stock: 8,
                image: "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                ],
            },
            {
                id: "1-8",
                color: "Trắng",
                storage: "1TB",
                price: 45990000,
                originalPrice: 48990000,
                stock: 3,
                image: "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                images: [
                    "https://minhtuanmobile.com/uploads/products/240910084604-iphone16-pro-max-256gb2.jpg",
                    "https://minhtuanmobile.com/uploads/products/240910084654-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
                ],
            },
            {
                id: "1-9",
                color: "Xanh",
                storage: "128GB",
                price: 30490000,
                originalPrice: 32990000,
                stock: 12,
                image: "https://placeholder.com/400x400?text=iPhone+Xanh",
                images: [
                    "https://placeholder.com/400x400?text=iPhone+Xanh",
                    "https://placeholder.com/400x400?text=iPhone+Xanh+2",
                ],
            },
            {
                id: "1-10",
                color: "Xanh",
                storage: "256GB",
                price: 33990000,
                originalPrice: 36990000,
                stock: 7,
                image: "https://placeholder.com/400x400?text=iPhone+Xanh",
                images: [
                    "https://placeholder.com/400x400?text=iPhone+Xanh",
                    "https://placeholder.com/400x400?text=iPhone+Xanh+2",
                ],
            },
            {
                id: "1-11",
                color: "Vàng",
                storage: "128GB",
                price: 30490000,
                originalPrice: 32990000,
                stock: 0,
                image: "https://placeholder.com/400x400?text=iPhone+Vàng",
                images: [
                    "https://placeholder.com/400x400?text=iPhone+Vàng",
                    "https://placeholder.com/400x400?text=iPhone+Vàng+2",
                ],
            },
        ],
    },
    // Thêm các sản phẩm khác ở đây
]

// Mock reviews data
const mockReviews = {
    "1": {
        reviews: [
            {
                id: "1",
                userName: "Nguyễn Văn A",
                rating: 5,
                date: "2025-03-15T10:30:00Z",
                comment: "Sản phẩm rất tốt, đóng gói cẩn thận. Pin trâu, màn hình đẹp. Rất hài lòng với sản phẩm.",
                images: ["https://photo2.tinhte.vn/data/attachment-files/2024/09/8445269_Cover-review-iphone-15-pro-tinhte-anhtu.jpg", "https://placeholder.com/100x100"],
            },
            {
                id: "2",
                userName: "Trần Thị B",
                rating: 4,
                date: "2025-03-10T08:30:00Z",
                comment: "Máy đẹp, chụp ảnh sắc nét. Chỉ tiếc là pin hơi tụt nhanh khi chơi game nặng.",
            },
            {
                id: "3",
                userName: "Lê Văn C",
                rating: 5,
                date: "2025-03-05T14:15:00Z",
                comment: "Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Camera chụp đêm rất tốt, pin dùng cả ngày không hết.",
                images: ["https://placeholder.com/100x100"],
                reply: "Cảm ơn bạn đã tin tưởng và ủng hộ Minh Tuấn Mobile. Chúc bạn có trải nghiệm tuyệt vời với sản phẩm!",
            },
            {
                id: "4",
                userName: "Phạm Thị D",
                rating: 3,
                date: "2025-03-01T16:45:00Z",
                comment: "Sản phẩm tạm ổn, nhưng giá hơi cao so với các tính năng được cung cấp.",
            },
            {
                id: "5",
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
}

// Mock promo codes
const mockPromoCodes = [
    {
        id: "WELCOME10",
        code: "SAO",
        description: "Giảm 10% cho đơn hàng đầu tiên",
        discountType: "percentage",
        discountValue: 10,
        minOrderValue: 1000000,
        maxDiscount: 500000,
        expiryDate: "2025-12-31T23:59:59Z",
        isActive: true,
    },
    {
        id: "SUMMER25",
        code: "SUMMER25",
        description: "Giảm 25% cho sản phẩm mùa hè",
        discountType: "percentage",
        discountValue: 25,
        minOrderValue: 2000000,
        maxDiscount: 1000000,
        expiryDate: "2025-08-31T23:59:59Z",
        isActive: true,
    },
    {
        id: "FREESHIP",
        code: "FREESHIP",
        description: "Miễn phí vận chuyển cho đơn hàng từ 500K",
        discountType: "fixed",
        discountValue: 50000,
        minOrderValue: 500000,
        maxDiscount: 50000,
        expiryDate: "2025-06-30T23:59:59Z",
        isActive: true,
    },
]



const mockBanners = [
    { id: "1", image: "https://minhtuanmobile.com/uploads/landingpage/1000x500-21-2503190813.png", link: "/promotion/1" },
    { id: "2", image: "https://minhtuanmobile.com/uploads/slide/dam-chat-viet-sale-cuc-nhiet-250331103523.jpg", link: "/promotion/2" },
]

const mockUsers = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        email: "sao@gmail.com",
        phone: "0901234567",
        role: "USER",
        password: "123456",
        addresses: [
            {
                id: "1",
                name: "Nhà riêng",
                recipient: "Nguyễn Văn A",
                phone: "0901234567",
                address: "123 Đường Lê Lợi",
                ward: "Phường Bến Nghé",
                district: "Quận 1",
                city: "TP. Hồ Chí Minh",
                isDefault: true,
            },
        ],
        orders: [
            {
                id: "ORD001",
                date: "2023-03-15T08:30:00Z",
                status: "Đã giao hàng",
                total: 30490000,
                items: [
                    {
                        productId: "1",
                        name: "iPhone 16 Pro Max",
                        price: 30490000,
                        quantity: 1,
                        color: "Đen",
                        storage: "256GB",
                    },
                ],
                shipping: {
                    method: "Giao hàng tiêu chuẩn",
                    fee: 0,
                    address: {
                        recipient: "Nguyễn Văn A",
                        phone: "0901234567",
                        address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
                    },
                },
                payment: {
                    method: "COD",
                    status: "Đã thanh toán",
                },
            },
        ],
        wishlist: ["1", "3", "5"],
    },
    {
        id: "2",
        name: "Nguyễn Văn B",
        email: "admin@gmail.com",
        phone: "0901234567",
        role: "ADMIN",
        password: "123456",
        addresses: [
            {
                id: "1",
                name: "Nhà riêng",
                recipient: "Nguyễn Văn A",
                phone: "0901234567",
                address: "123 Đường Lê Lợi",
                ward: "Phường Bến Nghé",
                district: "Quận 1",
                city: "TP. Hồ Chí Minh",
                isDefault: true,
            },
        ],
        orders: [
            {
                id: "ORD001",
                date: "2023-03-15T08:30:00Z",
                status: "Đã giao hàng",
                total: 30490000,
                items: [
                    {
                        productId: "1",
                        name: "iPhone 16 Pro Max",
                        price: 30490000,
                        quantity: 1,
                        color: "Đen",
                        storage: "256GB",
                    },
                ],
                shipping: {
                    method: "Giao hàng tiêu chuẩn",
                    fee: 0,
                    address: {
                        recipient: "Nguyễn Văn A",
                        phone: "0901234567",
                        address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
                    },
                },
                payment: {
                    method: "COD",
                    status: "Đã thanh toán",
                },
            },
        ],
        wishlist: ["1", "3", "5"],
    },
]


const mockCategories = [
    {
        id: "1",
        name: "iPhone",
        icon: "phone-portrait-outline",
        color: "#FFDDDD",
        subcategories: [
            { id: "1-1", name: "iPhone 16 Series", image: "https://placeholder.com/100x100" },
            { id: "1-2", name: "iPhone 15 Series", image: "https://placeholder.com/100x100" },
            { id: "1-3", name: "iPhone 14", image: "https://placeholder.com/100x100" },
            { id: "1-4", name: "iPhone 13", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p1-1", name: "Dưới 15 triệu" },
            { id: "p1-2", name: "15 - 25 triệu" },
            { id: "p1-3", name: "17.25 - 35 triệu" },
            { id: "p1-4", name: "Trên 35 triệu" },
        ],
    },
    {
        id: "2",
        name: "iPad",
        icon: "tablet-portrait-outline",
        color: "#DDDDFF",
        subcategories: [
            { id: "2-1", name: "iPad Pro", image: "https://placeholder.com/100x100" },
            { id: "2-2", name: "iPad Air", image: "https://placeholder.com/100x100" },
            { id: "2-3", name: "iPad Mini", image: "https://placeholder.com/100x100" },
            { id: "2-4", name: "iPad Gen 11", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p2-1", name: "Dưới 10 triệu" },
            { id: "p2-2", name: "10 - 20 triệu" },
            { id: "p2-3", name: "Trên 20 triệu" },
        ],
    },
    {
        id: "3",
        name: "Watch",
        icon: "watch-outline",
        color: "#FFEECC",
        subcategories: [
            { id: "3-1", name: "Apple Watch Series 10", image: "https://placeholder.com/100x100" },
            { id: "3-2", name: "Apple Watch SE", image: "https://placeholder.com/100x100" },
            { id: "3-3", name: "Apple Watch Ultra", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p3-1", name: "Dưới 8 triệu" },
            { id: "p3-2", name: "8 - 15 triệu" },
            { id: "p3-3", name: "Trên 15 triệu" },
        ],
    },
    {
        id: "4",
        name: "AirPods",
        icon: "headset-outline",
        color: "#FFDDFF",
        subcategories: [
            { id: "4-1", name: "AirPods Pro", image: "https://placeholder.com/100x100" },
            { id: "4-2", name: "AirPods 4", image: "https://placeholder.com/100x100" },
            { id: "4-3", name: "AirPods Max", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p4-1", name: "Dưới 5 triệu" },
            { id: "p4-2", name: "5 - 10 triệu" },
            { id: "p4-3", name: "Trên 10 triệu" },
        ],
    },
    {
        id: "5",
        name: "Mac",
        icon: "laptop-outline",
        color: "#DDFFEE",
        subcategories: [
            { id: "5-1", name: "MacBook Pro", image: "https://placeholder.com/100x100" },
            { id: "5-2", name: "MacBook Air", image: "https://placeholder.com/100x100" },
            { id: "5-3", name: "iMac", image: "https://placeholder.com/100x100" },
            { id: "5-4", name: "Mac Mini", image: "https://placeholder.com/100x100" },
            { id: "5-5", name: "Mac Studio", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p5-1", name: "Dưới 25 triệu" },
            { id: "p5-2", name: "25 - 40 triệu" },
            { id: "p5-3", name: "Trên 40 triệu" },
        ],
    },
    {
        id: "6",
        name: "Laptop",
        icon: "laptop-outline",
        color: "#EEDDFF",
        subcategories: [
            { id: "6-1", name: "Dell", image: "https://placeholder.com/100x100" },
            { id: "6-2", name: "HP", image: "https://placeholder.com/100x100" },
            { id: "6-3", name: "Lenovo", image: "https://placeholder.com/100x100" },
            { id: "6-4", name: "Asus", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p6-1", name: "Dưới 15 triệu" },
            { id: "p6-2", name: "15 - 25 triệu" },
            { id: "p6-3", name: "Trên 25 triệu" },
        ],
    },
    {
        id: "7",
        name: "Samsung",
        icon: "phone-portrait-outline",
        color: "#DDFFFF",
        subcategories: [
            { id: "7-1", name: "Galaxy S Series", image: "https://placeholder.com/100x100" },
            { id: "7-2", name: "Galaxy Z Fold", image: "https://placeholder.com/100x100" },
            { id: "7-3", name: "Galaxy Z Flip", image: "https://placeholder.com/100x100" },
            { id: "7-4", name: "Galaxy Tab", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p7-1", name: "Dưới 10 triệu" },
            { id: "p7-2", name: "10 - 20 triệu" },
            { id: "p7-3", name: "Trên 20 triệu" },
        ],
    },
    {
        id: "8",
        name: "Điện Thoại",
        icon: "phone-portrait-outline",
        color: "#FFDDCC",
        subcategories: [
            { id: "8-1", name: "Xiaomi", image: "https://placeholder.com/100x100" },
            { id: "8-2", name: "Oppo", image: "https://placeholder.com/100x100" },
            { id: "8-3", name: "Vivo", image: "https://placeholder.com/100x100" },
            { id: "8-4", name: "Nokia", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p8-1", name: "Dưới 5 triệu" },
            { id: "p8-2", name: "5 - 10 triệu" },
            { id: "p8-3", name: "Trên 10 triệu" },
        ],
    },
    {
        id: "9",
        name: "Âm thanh",
        icon: "musical-notes-outline",
        color: "#DDFFDD",
        subcategories: [
            { id: "9-1", name: "Loa", image: "https://placeholder.com/100x100" },
            { id: "9-2", name: "Tai nghe", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [
            { id: "p9-1", name: "Dưới 2 triệu" },
            { id: "p9-2", name: "2 - 5 triệu" },
            { id: "p9-3", name: "Trên 5 triệu" },
        ],
    },
    {
        id: "10",
        name: "Phụ kiện",
        icon: "hardware-chip-outline",
        color: "#EEFFDD",
        subcategories: [
            { id: "10-1", name: "Sạc & Cáp", image: "https://placeholder.com/100x100" },
            { id: "10-2", name: "Ốp lưng", image: "https://placeholder.com/100x100" },
            { id: "10-3", name: "Miếng dán màn hình", image: "https://placeholder.com/100x100" },
            { id: "10-4", name: "Pin dự phòng", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [],
    },
    {
        id: "11",
        name: "Gia dụng",
        icon: "home-outline",
        color: "#FFCCFF",
        subcategories: [
            { id: "11-1", name: "Máy lọc không khí", image: "https://placeholder.com/100x100" },
            { id: "11-2", name: "Robot hút bụi", image: "https://placeholder.com/100x100" },
            { id: "11-3", name: "Máy lọc nước", image: "https://placeholder.com/100x100" },
        ],
        priceRanges: [],
    },
]

// Mock notifications data
const mockNotifications = [
    {
        id: "1",
        type: "order",
        title: "Đơn hàng #ORD001 đã được giao thành công",
        message: "Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm tại Minh Tuấn Mobile!",
        date: "2023-03-15T10:30:00Z",
        read: false,
        data: {
            orderId: "ORD001",
        },
    },
    {
        id: "2",
        type: "promotion",
        title: "Giảm giá 10% cho tất cả sản phẩm Apple",
        message:
            "Nhân dịp khai trương cửa hàng mới, Minh Tuấn Mobile giảm giá 10% cho tất cả sản phẩm Apple từ ngày 20/03 đến 25/03.",
        date: "2023-03-14T08:00:00Z",
        read: true,
        data: {
            promotionId: "PROMO001",
        },
    },
    {
        id: "3",
        type: "news",
        title: "iPhone 16 sắp ra mắt tại Minh Tuấn Mobile",
        message:
            "iPhone 16 sẽ chính thức được bán tại Minh Tuấn Mobile từ ngày 30/03. Đặt trước ngay để nhận ưu đãi đặc biệt!",
        date: "2023-03-12T14:15:00Z",
        read: false,
        data: {
            newsId: "NEWS001",
        },
    },
    {
        id: "4",
        type: "order",
        title: "Đơn hàng #ORD002 đã được xác nhận",
        message: "Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị giao hàng.",
        date: "2023-03-10T16:45:00Z",
        read: true,
        data: {
            orderId: "ORD002",
        },
    },
    {
        id: "5",
        type: "promotion",
        title: "Mã giảm giá 500.000đ cho đơn hàng trên 10 triệu",
        message: "Sử dụng mã MINHTUANVIP để được giảm 500.000đ cho đơn hàng trên 10 triệu đồng.",
        date: "2023-03-08T09:20:00Z",
        read: true,
        data: {
            promotionId: "PROMO002",
        },
    },
]


// API functions
export const api = {
    //Notifi
    getNotifications: async () => {
        try {
            return { success: true, data: mockNotifications }
        } catch (error) {
            console.error("Error fetching Notifi:", error)
            return { success: false, error: "Failed to fetch Notifi" }
        }

    },

    // Product APIs
    getProducts: async (params = {}) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/products`, { params });

            // For now, return mock data
            return { success: true, data: mockProducts }
        } catch (error) {
            console.error("Error fetching products:", error)
            return { success: false, error: "Failed to fetch products" }
        }
    },

    getProductById: async (id) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/products/${id}`);

            // For now, return mock data
            const product = mockProducts.find((p) => p.id === id)
            if (product) {
                return { success: true, data: product }
            } else {
                return { success: false, error: "Product not found" }
            }
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error)
            return { success: false, error: "Failed to fetch product" }
        }
    },

    getProductsByCategory: async (category, subcategory = null) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/products?category=${category}&subcategory=${subcategory}`);

            // For now, filter mock data
            let filteredProducts = mockProducts.filter((p) => p.category === category)
            if (subcategory) {
                filteredProducts = filteredProducts.filter((p) => p.subcategory === subcategory)
            }
            return { success: true, data: filteredProducts }
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error)
            return { success: false, error: "Failed to fetch products by category" }
        }
    },

    searchProducts: async (query) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/products/search?q=${query}`);

            // For now, filter mock data
            const filteredProducts = mockProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.description.toLowerCase().includes(query.toLowerCase()),
            )
            return { success: true, data: filteredProducts }
        } catch (error) {
            console.error(`Error searching products for "${query}":`, error)
            return { success: false, error: "Failed to search products" }
        }
    },

    // Category APIs
    getCategories: async () => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/categories`);

            // For now, return mock data
            return { success: true, data: mockCategories }
        } catch (error) {
            console.error("Error fetching categories:", error)
            return { success: false, error: "Failed to fetch categories" }
        }
    },

    // Banner APIs
    getBanners: async () => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/banners`);

            // For now, return mock data
            return { success: true, data: mockBanners }
        } catch (error) {
            console.error("Error fetching banners:", error)
            return { success: false, error: "Failed to fetch banners" }
        }
    },

    // User APIs
    login: async (email, password) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/auth/login`, {
            //   method: 'POST',
            //   body: JSON.stringify({ email, password }),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, check against mock data
            const user = mockUsers.find((u) => u.email === email && u.password === password)
            if (user) {
                const { password, ...userWithoutPassword } = user
                console.log("User role:", userWithoutPassword.role);
                return { success: true, data: { user: userWithoutPassword, token: "mock-token-123" } }
            } else {
                return { success: false, error: "Email hoặc mật khẩu không đúng" }
            }
        } catch (error) {
            console.error("Error during login:", error)
            return { success: false, error: "Đăng nhập thất bại" }
        }
    },

    register: async (userData) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/auth/register`, {
            //   method: 'POST',
            //   body: JSON.stringify(userData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, check if email exists in mock data
            const existingUser = mockUsers.find((u) => u.email === userData.email)
            if (existingUser) {
                return { success: false, error: "Email đã được sử dụng" }
            }

            // In a real app, the new user would be added to the database
            return { success: true, data: { message: "Đăng ký thành công" } }
        } catch (error) {
            console.error("Error during registration:", error)
            return { success: false, error: "Đăng ký thất bại" }
        }
    },

    getUserProfile: async (token) => {
        try {
            // In a real app, this would be a fetch call to your API with the token
            // return await fetch(`${API_BASE_URL}/user/profile`, {
            //   headers: { 'Authorization': `Bearer ${token}` }
            // });

            // For now, return the first mock user
            const { password, ...userWithoutPassword } = mockUsers[0]
            return { success: true, data: userWithoutPassword }
        } catch (error) {
            console.error("Error fetching user profile:", error)
            return { success: false, error: "Failed to fetch user profile" }
        }
    },

    updateUserProfile: async (token, userData) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/user/profile`, {
            //   method: 'PUT',
            //   body: JSON.stringify(userData),
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            //   }
            // });

            // For now, return success
            return { success: true, data: { message: "Cập nhật thông tin thành công" } }
        } catch (error) {
            console.error("Error updating user profile:", error)
            return { success: false, error: "Failed to update user profile" }
        }
    },

    // Order APIs
    createOrder: async (token, orderData) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/orders`, {
            //   method: 'POST',
            //   body: JSON.stringify(orderData),
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            //   }
            // });

            // For now, return success with a mock order ID
            return {
                success: true,
                data: {
                    orderId: `ORD${Math.floor(Math.random() * 1000)
                        .toString()
                        .padStart(3, "0")}`,
                    message: "Đặt hàng thành công",
                },
            }
        } catch (error) {
            console.error("Error creating order:", error)
            return { success: false, error: "Failed to create order" }
        }
    },

    getOrders: async (token) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/orders`, {
            //   headers: { 'Authorization': `Bearer ${token}` }
            // });

            // For now, return mock orders from the first user
            return { success: true, data: mockUsers[0].orders }
        } catch (error) {
            console.error("Error fetching orders:", error)
            return { success: false, error: "Failed to fetch orders" }
        }
    },

    // getOrderById: async (token, orderId) => {
    //     try {
    //         // In a real app, this would be a fetch call to your API
    //         // return await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    //         //   headers: { 'Authorization': `Bearer ${token}` }
    //         // });

    //         // For now, find the order in mock data
    //         const order = mockUsers[0].orders.find((o) => o.id === orderId)
    //         if (order) {
    //             return { success: true, data: order }
    //         } else {
    //             return { success: false, error: "Order not found" }
    //         }
    //     } catch (error) {
    //         console.error(`Error fetching order ${orderId}:`, error)
    //         return { success: false, error: "Failed to fetch order" }
    //     }
    // }, 
    getOrderById: async (token, orderId) => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            //   headers: { 'Authorization': `Bearer ${token}` }
            // });

            // Trả về dữ liệu mẫu
            if (orderId === "ORD001") {
                return {
                    success: true,
                    data: {
                        id: "ORD001",
                        date: "2025-03-15T10:30:00Z",
                        status: "Đã giao hàng",
                        total: 30490000,
                        promoCode: "WELCOME10",
                        discount: 3049000,
                        items: [
                            {
                                id: "1",
                                name: "iPhone 16 Pro Max",
                                price: 33539000,
                                quantity: 1,
                                color: "Đen",
                                storage: "256GB",
                            },
                        ],
                        shipping: {
                            method: "Giao hàng tiêu chuẩn",
                            fee: 0,
                            address: {
                                recipient: "Nguyễn Văn A",
                                phone: "0987654321",
                                address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
                            },
                        },
                        payment: {
                            method: "cod",
                            status: "Đã thanh toán",
                        },
                        note: "",
                    },
                }
            } else {
                return { success: false, error: "Order not found" }
            }
        } catch (error) {
            console.error(`Error fetching order ${orderId}:`, error)
            return { success: false, error: "Failed to fetch order" }
        }
    },

    // Wishlist APIs
    getWishlist: async (token) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/wishlist`, {
            //   headers: { 'Authorization': `Bearer ${token}` }
            // });

            // For now, get wishlist product IDs from mock user and fetch the products
            const wishlistIds = mockUsers[0].wishlist
            const wishlistProducts = mockProducts.filter((p) => wishlistIds.includes(p.id))
            return { success: true, data: wishlistProducts }
        } catch (error) {
            console.error("Error fetching wishlist:", error)
            return { success: false, error: "Failed to fetch wishlist" }
        }
    },

    addToWishlist: async (token, productId) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/wishlist`, {
            //   method: 'POST',
            //   body: JSON.stringify({ productId }),
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            //   }
            // });

            // For now, return success
            return { success: true, data: { message: "Đã thêm vào danh sách yêu thích" } }
        } catch (error) {
            console.error(`Error adding product ${productId} to wishlist:`, error)
            return { success: false, error: "Failed to add to wishlist" }
        }
    },

    removeFromWishlist: async (token, productId) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
            //   method: 'DELETE',
            //   headers: { 'Authorization': `Bearer ${token}` }
            // });

            // For now, return success
            return { success: true, data: { message: "Đã xóa khỏi danh sách yêu thích" } }
        } catch (error) {
            console.error(`Error removing product ${productId} from wishlist:`, error)
            return { success: false, error: "Failed to remove from wishlist" }
        }
    },

    completeRegistration: async (userData) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/auth/complete-registration`, {
            //   method: 'POST',
            //   body: JSON.stringify(userData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, simulate a successful registration
            // In a real app, the new user would be added to the database
            mockUsers.push({
                id: `${mockUsers.length + 1}`,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password, // In a real app, this would be hashed
                addresses: [],
                orders: [],
                wishlist: [],
            })

            return { success: true, data: { message: "Đăng ký thành công" } }
        } catch (error) {
            console.error("Error during registration completion:", error)
            return { success: false, error: "Đăng ký thất bại" }
        }
    },

    getProductReviews: async (productId) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/products/${productId}/reviews`);

            // For now, return mock data
            const reviews = mockReviews[productId]
            if (reviews) {
                return { success: true, data: reviews }
            } else {
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
        } catch (error) {
            console.error(`Error fetching reviews for product ${productId}:`, error)
            return { success: false, error: "Failed to fetch reviews" }
        }
    },

    submitProductReview: async (reviewData) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/reviews`, {
            //   method: 'POST',
            //   body: JSON.stringify(reviewData),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, just return success
            return { success: true, data: { message: "Review submitted successfully" } }
        } catch (error) {
            console.error("Error submitting review:", error)
            return { success: false, error: "Failed to submit review" }
        }
    },

    // Promo Code APIs
    getPromoCodes: async () => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/promo-codes`);

            // For now, return mock data
            return { success: true, data: mockPromoCodes }
        } catch (error) {
            console.error("Error fetching promo codes:", error)
            return { success: false, error: "Failed to fetch promo codes" }
        }
    },

    validatePromoCode: async (code, cartTotal) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/promo-codes/validate`, {
            //   method: 'POST',
            //   body: JSON.stringify({ code, cartTotal }),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, validate against mock data
            const promoCode = mockPromoCodes.find((p) => p.code === code && p.isActive && new Date(p.expiryDate) > new Date())

            if (!promoCode) {
                return { success: false, error: "Mã giảm giá không hợp lệ hoặc đã hết hạn" }
            }

            if (cartTotal < promoCode.minOrderValue) {
                return {
                    success: false,
                    error: `Giá trị đơn hàng tối thiểu phải từ ${promoCode.minOrderValue.toLocaleString("vi-VN")}đ`,
                }
            }

            let discountAmount = 0
            if (promoCode.discountType === "percentage") {
                discountAmount = (cartTotal * promoCode.discountValue) / 100
                if (discountAmount > promoCode.maxDiscount) {
                    discountAmount = promoCode.maxDiscount
                }
            } else {
                discountAmount = promoCode.discountValue
            }

            return {
                success: true,
                data: {
                    code: promoCode.code,
                    description: promoCode.description,
                    discountAmount,
                },
            }
        } catch (error) {
            console.error("Error validating promo code:", error)
            return { success: false, error: "Failed to validate promo code" }
        }
    },

    savePromoCode: async (userId, promoCodeId) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/users/${userId}/promo-codes`, {
            //   method: 'POST',
            //   body: JSON.stringify({ promoCodeId }),
            //   headers: { 'Content-Type': 'application/json' }
            // });

            // For now, just return success
            return { success: true, data: { message: "Promo code saved successfully" } }
        } catch (error) {
            console.error("Error saving promo code:", error)
            return { success: false, error: "Failed to save promo code" }
        }
    },

    getUserPromoCodes: async (userId) => {
        try {
            // In a real app, this would be a fetch call to your API
            // return await fetch(`${API_BASE_URL}/users/${userId}/promo-codes`);

            // For now, return all active promo codes
            const activeCodes = mockPromoCodes.filter((p) => p.isActive && new Date(p.expiryDate) > new Date())
            return { success: true, data: activeCodes }
        } catch (error) {
            console.error("Error fetching user promo codes:", error)
            return { success: false, error: "Failed to fetch user promo codes" }
        }
    },
    getSaleProducts: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/products/sale`);

            // Lọc sản phẩm đang sale từ mockProducts
            const saleProducts = mockProducts.filter(
                (product) => product.saleEndDate && new Date(product.saleEndDate) > new Date() && product.discount > 0,
            )

            return { success: true, data: saleProducts }
        } catch (error) {
            console.error("Error fetching sale products:", error)
            return { success: false, error: "Failed to fetch sale products" }
        }
    },

    // Thêm hàm getHotDeals để lấy các sản phẩm giảm giá nhiều nhất
    getHotDeals: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/products/hot-deals`);

            // Lọc và sắp xếp sản phẩm theo mức giảm giá
            const hotDeals = mockProducts
                .filter((product) => product.discount > 0)
                .sort((a, b) => b.discount - a.discount)
                .slice(0, 5) // Lấy 5 sản phẩm giảm giá nhiều nhất

            return { success: true, data: hotDeals }
        } catch (error) {
            console.error("Error fetching hot deals:", error)
            return { success: false, error: "Failed to fetch hot deals" }
        }
    },

    // Thêm hàm getFlashSaleProducts để lấy sản phẩm flash sale
    getFlashSaleProducts: async () => {
        try {
            // Trong thực tế, đây sẽ là một API call
            // return await fetch(`${API_BASE_URL}/products/flash-sale`);

            // Lọc sản phẩm flash sale (có saleEndDate và saleQuantity)
            const flashSaleProducts = mockProducts.filter(
                (product) =>
                    product.saleEndDate &&
                    new Date(product.saleEndDate) > new Date() &&
                    product.saleQuantity &&
                    product.soldQuantity < product.saleQuantity,
            )

            return { success: true, data: flashSaleProducts }
        } catch (error) {
            console.error("Error fetching flash sale products:", error)
            return { success: false, error: "Failed to fetch flash sale products" }
        }
    },
}

// Helper function to show error alerts
export const showError = (message) => {
    Alert.alert("Lỗi", message || "Đã có lỗi xảy ra")
}

// Helper function to show success alerts
export const showSuccess = (message) => {
    Alert.alert("Thành công", message)
}



// import { Alert } from "react-native"

// const showError = (message) => {
//   Alert.alert("Lỗi", message)
// }

// const showSuccess = (message) => {
//   Alert.alert("Thành công", message)
// }

// const API_BASE_URL = "https://your-api-base-url.com" // Replace with your actual API base URL

// const api = {
//   login: async (email, password) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   register: async (userData) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   completeRegistration: async (userData) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getUserProfile: async (token) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   updateUserProfile: async (token, userData) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getCategories: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getProducts: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getSaleProducts: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getFlashSaleProducts: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getHotDeals: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getBanners: async () => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getProductById: async (productId) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getProductsByCategory: async (category, subcategory) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   searchProducts: async (query) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getWishlist: async (token) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   addToWishlist: async (token, productId) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   removeFromWishlist: async (token, productId) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   createOrder: async (token, orderData) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getProductReviews: async (productId) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   submitProductReview: async (reviewData) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   validatePromoCode: async (promoCode, subtotal) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   getUserPromoCodes: async (userId) => {
//     // Placeholder implementation
//     return Promise.resolve({ success: false, error: "Not implemented" })
//   },
//   admin: {
//     getProducts: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getCategories: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     deleteProduct: async (productId) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     createCategory: async (categoryData) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     updateCategory: async (categoryId, categoryData) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     deleteCategory: async (categoryId) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getOrders: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     updateOrderStatus: async (orderId, newStatus) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getStats: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getRevenueData: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getCategorySales: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getOrderStatusStats: async () => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     importProductsFromExcel: async (fileUri) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     exportReport: async (params) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//     getOrderById: async (token, orderId) => {
//       return Promise.resolve({ success: false, error: "Not implemented" })
//     },
//   },
// }

// export { api, showError, showSuccess }

