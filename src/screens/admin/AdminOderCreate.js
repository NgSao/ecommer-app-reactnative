import { View, ScrollView, TextInput, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminCreateOrderStyles"
import CustomerSelector from "@components/admin/order/CustomerSelector"
import CartItem from "@components/admin/order/CartItem"
import PaymentInfo from "@components/admin/order/PaymentInfo"
import PaymentMethodSelector from "@components/admin/order/PaymentMethodSelector"
import ProductSelector from "@components/admin/order/ProductSelector"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { ADMIN_GET_SEARCH, GET_ALL, POST_ADD, POST_TOKEN, POST_VNPAY_CALLBACK } from "api/apiService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import WebView from "react-native-webview"
import { useAuth } from "@contexts/AuthContext"
const AdminOderCreate = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { token } = useAuth()

    // Thông tin khách hàng
    const [customer, setCustomer] = useState(null)
    const [showCustomerModal, setShowCustomerModal] = useState(false)
    const [customerSearchQuery, setCustomerSearchQuery] = useState("")
    const [customers, setCustomers] = useState([])
    const [loadingCustomers, setLoadingCustomers] = useState(false)

    // Thông tin sản phẩm
    const [cartItems, setCartItems] = useState([])
    const [showProductModal, setShowProductModal] = useState(false)
    const [productSearchQuery, setProductSearchQuery] = useState("")
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [quantity, setQuantity] = useState("1")

    // Thông tin đơn hàng
    const [shippingFee, setShippingFee] = useState("0")
    const [discount, setDiscount] = useState("0")
    const [note, setNote] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cod")

    // Tính toán tổng tiền
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingFeeValue = Number.parseInt(shippingFee) || 0
    const discountValue = Number.parseInt(discount) || 0
    // const tax = Math.round(subtotal * 0.1) // VAT 10%
    const tax = 0

    const total = subtotal + shippingFeeValue + tax - discountValue

    const [showWebView, setShowWebView] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");
    const [userId, setUserId] = useState(null)

    const fetchCustomers = async (query = "") => {
        setLoadingCustomers(true)
        try {
            const response = await ADMIN_GET_SEARCH("users/orders", { keyword: query });
            if (response.status === 200) {
                setCustomers(response.data.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách khách hàng")
            }
        } catch (error) {
            console.error("Error fetching customers:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khách hàng")
        } finally {
            setLoadingCustomers(false)
        }
    }

    const fetchProducts = async (query = "") => {
        setLoadingProducts(true)
        try {
            const response = await ADMIN_GET_SEARCH("products/orders", { keyword: query });
            if (response.status === 200) {
                setProducts(response.data.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm")
            }
        } catch (error) {
            console.error("Error fetching products:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách sản phẩm")
        } finally {
            setLoadingProducts(false)
        }
    }

    const addToCart = () => {
        if (!selectedProduct) return

        const productToAdd = {
            id: selectedVariant ? selectedVariant.id : selectedProduct.id,
            productId: selectedProduct?.id,
            colorId: selectedVariant?.id,
            name: selectedProduct?.name,
            color: selectedVariant?.color,
            variant: selectedVariant ? selectedVariant.variant : null,
            price: selectedVariant
                ? (selectedVariant.salePrice && selectedVariant.salePrice < selectedVariant.originalPrice
                    ? selectedVariant.salePrice
                    : selectedVariant.originalPrice)
                : (selectedProduct.salePrice && selectedProduct.salePrice < selectedProduct.originalPrice
                    ? selectedProduct.salePrice
                    : selectedProduct.originalPrice),
            quantity: Number.parseInt(quantity) || 1,
            image: selectedVariant ? selectedVariant.image : selectedProduct.image,
        }

        const existingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id)

        if (existingItemIndex !== -1) {
            const updatedItems = [...cartItems]
            updatedItems[existingItemIndex].quantity += productToAdd.quantity
            setCartItems(updatedItems)
        } else {
            setCartItems([...cartItems, productToAdd])
        }

        setSelectedProduct(null)
        setSelectedVariant(null)
        setQuantity("1")
        setShowProductModal(false)
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId))
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return

        const updatedItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCartItems(updatedItems)
    }

    const createOrder = async () => {
        if (!customer) {
            Alert.alert("Thông báo", "Vui lòng chọn khách hàng")
            return
        }

        if (cartItems.length === 0) {
            Alert.alert("Thông báo", "Vui lòng thêm ít nhất một sản phẩm vào đơn hàng")
            return
        }

        setSubmitting(true)

        try {
            setUserId(customer?.id)
            const orderData = {
                userId: customer?.id,
                items: cartItems.map((item) => ({
                    productId: item.id,
                    colorId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    storage: item.variant,
                    imageUrl: item.image,
                })),
                shipping: {
                    method: "Giao hàng tiêu chuẩn",
                    fee: shippingFeeValue,
                    fullName: customer.fullName,
                    phone: customer.phone,
                    addressDetail: `${customer.address?.[0]?.addressDetail || ''}, ${customer.address?.[0]?.street || ''}, ${customer.address?.[0]?.district || ''}, ${customer.address?.[0]?.city || ''}`
                },
                payment: {
                    method: paymentMethod,
                    status: paymentMethod === "cod" ? "Chưa thanh toán" : "Đã thanh toán",
                },
                promoCode: null,
                discount: discountValue,
                total: total,
                note,
            }

            if (paymentMethod === "vnpay") {
                const fromVnPay = {
                    amount: total,
                    orderId: `MT-${Date.now()}`,
                    returnUrl: "http://localhost:8080/api/v1/public/vnpay/callback",
                    ipAddr: "127.0.0.1"
                }

                const paymentResponse = await POST_ADD("vnpay/payment", fromVnPay);

                if (paymentResponse.status == 200 && paymentResponse.data.data.paymentUrl) {
                    setPaymentUrl(paymentResponse.data.data.paymentUrl);
                    setShowWebView(true);
                    await AsyncStorage.setItem("pendingOrder", JSON.stringify(orderData));
                } else {
                    Alert.alert("Thông", "Không thể tạo thanh toán qua VNPay");
                }
            } else {


                const response = await POST_TOKEN("user/create-order", token, orderData)

                if (response.status === 200) {
                    Alert.alert("Thành công", `Đã tạo đơn hàng #${response.data.data.orderCode} thành công`, [
                        {
                            text: "Xem chi tiết",
                            onPress: () => navigation.replace("AdminOrderDetail", { orderId: response.data.data.id, userId: userId }),
                        },
                        {
                            text: "Quay lại danh sách",
                            onPress: () => navigation.replace("AdminOrdersManagement")
                        },
                    ])
                } else {
                    Alert.alert("Lỗi", response.error || "Không thể tạo đơn hàng")
                }
            }
        } catch (error) {
            console.error("Error creating order:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo đơn hàng")
        } finally {
            setSubmitting(false)
        }
    }

    const navigateToCreateCustomer = () => {
        setShowCustomerModal(false)
        navigation.navigate("AdminCreateCustomer")
    }

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
    }, [])

    const handleWebViewNavigation = async (navState) => {
        const { url } = navState;
        if (url.includes("vnpay/callback")) {
            setShowWebView(false); // Ẩn WebView

            // Lấy orderData từ AsyncStorage
            const orderData = await AsyncStorage.getItem("pendingOrder");
            if (!orderData) {
                Alert.alert("Lỗi", "Không tìm thấy dữ liệu đơn hàng");
                return;
            }
            const queryParams = new URLSearchParams(url.split("?")[1]);
            const vnpayParamsObj = {};
            queryParams.forEach((value, key) => {
                vnpayParamsObj[key] = value;
            });
            const parsedOrderData = JSON.parse(orderData);

            const fromDataCallback = {
                vnpayParams: vnpayParamsObj,
                orderDTO: parsedOrderData,
            }
            try {
                const response = await POST_VNPAY_CALLBACK("vnpay/callback", fromDataCallback);
                if (response.status === 200) {
                    if (response.data.data.status === "failed") {
                        Alert.alert("Thông báo", "Thanh toán không thành công.");
                        return;
                    }
                    clearCart();
                    Alert.alert("Thành công", `Đã tạo đơn hàng #${response.data.data.orderCode} thành công`, [
                        {
                            text: "Xem chi tiết",
                            onPress: () => navigation.navigate("AdminOrderDetail", { orderId: response.data.data.id, userId: userId }),
                        },
                        {
                            text: "Quay lại danh sách",
                            onPress: () => navigation.replace("AdminOrdersManagement")
                        },
                    ]);
                    await AsyncStorage.removeItem("pendingOrder");
                } else {
                    Alert.alert("Lỗi", response.message || "Thanh toán không thành công");

                }
            } catch (error) {
            }
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {showWebView ? (
                <>
                    <WebView
                        source={{ uri: paymentUrl }}
                        onNavigationStateChange={handleWebViewNavigation}
                        style={{ flex: 1 }}
                        onError={() => {
                            setShowWebView(false);
                            Alert.alert("Lỗi", "Không thể tải trang thanh toán");
                        }}
                    />
                </>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Tạo đơn hàng mới</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <ScrollView style={styles.scrollContainer}>
                        <CustomerSelector
                            customer={customer}
                            setCustomer={setCustomer}
                            showCustomerModal={showCustomerModal}
                            setShowCustomerModal={setShowCustomerModal}
                            customerSearchQuery={customerSearchQuery}
                            setCustomerSearchQuery={setCustomerSearchQuery}
                            customers={customers}
                            loadingCustomers={loadingCustomers}
                            fetchCustomers={fetchCustomers}
                            navigateToCreateCustomer={navigateToCreateCustomer}
                        />

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Sản phẩm</Text>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        setSelectedProduct(null)
                                        setSelectedVariant(null)
                                        setQuantity("1")
                                        setShowProductModal(true)
                                    }}
                                >
                                    <Ionicons name="add-circle-outline" size={20} color="#e30019" />
                                    <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                                </TouchableOpacity>
                            </View>

                            {cartItems.length === 0 ? (
                                <View style={styles.emptyCartContainer}>
                                    <Ionicons name="cart-outline" size={40} color="#ccc" />
                                    <Text style={styles.emptyCartText}>Chưa có sản phẩm nào trong đơn hàng</Text>
                                    <TouchableOpacity style={styles.addProductButton} onPress={() => setShowProductModal(true)}>
                                        <Text style={styles.addProductButtonText}>Thêm sản phẩm</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeFromCart={removeFromCart}
                                    />
                                ))
                            )}
                        </View>

                        <PaymentInfo
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            setShippingFee={setShippingFee}
                            discount={discount}
                            setDiscount={setDiscount}
                            tax={tax}
                            total={total}
                        />

                        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

                        <KeyboardAvoidingView
                            style={styles.container}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ghi chú</Text>
                                <TextInput
                                    style={styles.noteInput}
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder="Nhập ghi chú cho đơn hàng (nếu có)..."
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <TouchableOpacity
                            style={[styles.createOrderButton, submitting && styles.disabledButton]}
                            onPress={createOrder}
                        // disabled={submitting || cartItems.length === 0 || !customer}
                        >
                            {submitting ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                                    <Text style={styles.createOrderButtonText}>Tạo đơn hàng</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </ScrollView>

                    <ProductSelector
                        showProductModal={showProductModal}
                        setShowProductModal={setShowProductModal}
                        productSearchQuery={productSearchQuery}
                        setProductSearchQuery={setProductSearchQuery}
                        products={products}
                        loadingProducts={loadingProducts}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        fetchProducts={fetchProducts}
                        addToCart={addToCart}
                    />
                </>
            )}
        </SafeAreaView>
    )
}

export default AdminOderCreate

