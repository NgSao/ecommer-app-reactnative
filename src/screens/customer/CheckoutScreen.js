

import { ScrollView, View, Image, Text, Modal, Button, TouchableOpacity } from "react-native";
import styles from "../../styles/CheckoutStyles";
import ShippingAddressSection from "@components/checkout/ShippingAddressSection";
import OrderItemsSection from "@components/checkout/OrderItemsSection";
import PaymentMethodSection from "@components/checkout/PaymentMethodSection";
import OrderNoteSection from "@components/checkout/OrderNoteSection";
import OrderSummarySection from "@components/checkout/OrderSummarySection";
import CheckoutFooter from "@components/checkout/CheckoutFooter";
import PromoCodesModal from "@components/checkout/PromoCodesModal";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { useAuth } from "@contexts/AuthContext";
import { useCart } from "@contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import MapView, { Polyline, Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import PolylineTools from "@mapbox/polyline";
import { Ionicons } from '@expo/vector-icons';
import {
    GET_ALL,
    GET_GHN_SHIPPING_FEE,
    POST_ADD,
    POST_TOKEN,
    POST_VNPAY_CALLBACK,
    PUT_ID,
    GET_GHN_DISTRICTS,
    GET_GHN_WARDS,
    GET_OSRM_DIRECTIONS,
    GET_ID,
    GET_GHTK_SHIPPING_FEE,
} from "api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PromoCodeSection from "./../../components/checkout/PromoCodeSection";
import { formatPrice } from "@utils/formatUtils";

const STORE_LOCATION = {
    district_id: 1443, // Quận 7, TP.HCM
    ward_code: "20210", // Phường Tân Phú
    district_name: "Quận 2",
    ward_name: "Phường Thảo Điền",
    city: "TP. Hồ Chí Minh",
    coordinates: { latitude: 10.8087245, longitude: 106.7310773 }, // Replace with actual
};

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, token, isLoggedIn } = useAuth();
    const { cartItems, calculateSubtotal: calculateCartSubtotal, clearCart } = useCart();

    const {
        cartItems: routeCartItems = cartItems,
        subtotal: routeSubtotal,
        discount: routeDiscount,
        total: routeTotal,
        appliedPromo,
    } = route.params || {};

    const [loading, setLoading] = useState(false);
    const [shipping, setShipping] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [note, setNote] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromoCode, setAppliedPromoCode] = useState(appliedPromo || null);
    const [promoCodeError, setPromoCodeError] = useState("");
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showPromoCodesModal, setShowPromoCodesModal] = useState(false);
    const [availablePromoCodes, setAvailablePromoCodes] = useState([]);
    const [loadingPromoCodes, setLoadingPromoCodes] = useState(false);
    const [newAddress, setNewAddress] = useState({
        fullName: "",
        phone: "",
        addressDetail: "",
        street: "",
        district: "",
        city: "",
        active: false,
    });
    const [showWebView, setShowWebView] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [qr, setQr] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");
    const [districts, setDistricts] = useState([]);
    const [buyerLocation, setBuyerLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [locationPermission, setLocationPermission] = useState(null);
    const [polling, setPolling] = useState(false); // New state for polling
    const [transactionId, setTransactionId] = useState(null);
    const [OrderIdNow, setOrderIdNow] = useState(`SN-${Date.now()}`)
    const [OrderNumber, setOrderNumber] = useState(OrderIdNow.split("-")[1])
    const pollingIntervalRef = useRef(null);
    const [shippingProvider, setShippingProvider] = useState("GHN");
    const [ghtkDeliveryOption, setGhtkDeliveryOption] = useState("xteam")
    const [routeDistance, setRouteDistance] = useState(null);




    const calculateDistance = (coords) => {
        const toRadians = (degrees) => degrees * Math.PI / 180;
        const R = 6371;

        let totalDistance = 0;

        for (let i = 0; i < coords.length - 1; i++) {
            const { latitude: lat1, longitude: lon1 } = coords[i];
            const { latitude: lat2, longitude: lon2 } = coords[i + 1];

            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const lat1Rad = toRadians(lat1);
            const lat2Rad = toRadians(lat2);

            const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;

            totalDistance += distance;
        }

        return totalDistance.toFixed(2);
    };


    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status);
        };
        requestLocationPermission();
        if (isLoggedIn && user) {
            if (user.addresses && user.addresses.length > 0) {
                setAddresses(user.addresses);
                const defaultAddress = user.addresses.find((addr) => addr.active);
                setSelectedAddress(defaultAddress || user.addresses[0]);
            }
            fetchPromoCodes();
            fetchDistricts();
        }
    }, [isLoggedIn, user]);

    useEffect(() => {
        if (selectedAddress && districts.length > 0) {
            const fetchShippingData = async () => {
                try {

                    const normalize = (str) =>
                        str.toLowerCase().replace(/\./g, '').replace(/\s+/g, '').trim();

                    const inputDistrict = normalize(selectedAddress.district);

                    const district = districts.find((d) =>
                        normalize(d.DistrictName) === inputDistrict ||
                        (d.NameExtension && d.NameExtension.some(
                            (name) => normalize(name) === inputDistrict
                        ))
                    );


                    if (!district) {
                        Alert.alert("Lỗi", "Không thể xác định quận/huyện.");
                        setShipping(0);
                        setRouteDistance(null);
                        return;
                    }

                    const wards = await GET_GHN_WARDS({ district_id: district.DistrictID });

                    const inputWard = normalize(selectedAddress.street);

                    const ward = wards.find((d) =>
                        normalize(d.WardName) === inputWard ||
                        (d.NameExtension && d.NameExtension.some(
                            (name) => normalize(name) === inputWard
                        ))
                    );

                    if (!ward) {
                        Alert.alert("Lỗi", "Không thể xác định phường/xã.");
                        setShipping(0);
                        setRouteDistance(null);
                        return;
                    }

                    // Get precise coordinates
                    let coordinates = null;
                    if (locationPermission === "granted") {
                        const location = await Location.geocodeAsync(
                            `${selectedAddress.addressDetail}, ${selectedAddress.street}, ${selectedAddress.district}`
                        );

                        if (location.length > 0) {
                            coordinates = {
                                latitude: location[0].latitude,
                                longitude: location[0].longitude,
                            };
                        }
                    }

                    setBuyerLocation({
                        district_id: district.DistrictID,
                        ward_code: ward.WardCode,
                        district_name: district.DistrictName,
                        ward_name: ward.WardName,
                        city: selectedAddress.city,
                        coordinates: coordinates || {
                            latitude: 10.8087245,
                            longitude: 106.7310773,
                        },
                    });

                    const fee = await calculateShippingFee(district.DistrictID, ward.WardCode);
                    setShipping(fee);

                    if (coordinates) {
                        const polyline = await GET_OSRM_DIRECTIONS(STORE_LOCATION.coordinates, coordinates);
                        const decodedPoints = PolylineTools.decode(polyline);
                        const route = decodedPoints.map((point) => ({
                            latitude: point[0],
                            longitude: point[1],
                        }));
                        setRouteCoordinates(route);
                        const totalDistance = calculateDistance(route);
                        setRouteDistance(totalDistance);

                    }
                } catch (error) {
                    console.error("Error fetching shipping data:", error);
                    setShipping(0);
                    setRouteDistance(null);
                }
            };
            fetchShippingData();
        }
    }, [selectedAddress, districts, locationPermission, shippingProvider, ghtkDeliveryOption]);
    const fetchDistricts = async () => {
        try {
            const response = await GET_GHN_DISTRICTS();
            setDistricts(response);

        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const fetchPromoCodes = async () => {
        if (!isLoggedIn) return;
        try {
            setLoadingPromoCodes(true);
            const response = await GET_ALL("promotions");
            if (response.status === 200) {
                setAvailablePromoCodes(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching promo codes:", error);
        } finally {
            setLoadingPromoCodes(false);
        }
    };

    const calculateShippingFee = async (toDistrictId, toWardCode) => {
        if (!selectedAddress || !toDistrictId || !toWardCode) return 0;
        try {
            const totalWeight = routeCartItems.reduce(
                (total, item) => total + (item.weight || 200) * item.quantity,
                0
            );
            const totalValue = calculateSubtotal();

            if (shippingProvider === "GHTK") {
                const payload = {
                    pick_province: STORE_LOCATION.city,
                    pick_district: STORE_LOCATION.district_name,
                    pick_ward: STORE_LOCATION.ward_name,
                    province: selectedAddress.city,
                    district: selectedAddress.district,
                    ward: selectedAddress.street,
                    weight: Math.round(totalWeight),
                    value: Math.round(totalValue),
                    deliver_option: ghtkDeliveryOption,
                    tags: [],
                };

                const response = await GET_GHTK_SHIPPING_FEE(payload);
                if (response.success) {
                    const totalFee = response.fee.fee + (response.fee.insurance_fee || 0) +
                        (response.fee.extFees?.reduce((sum, fee) => sum + fee.amount, 0) || 0);
                    setShipping(totalFee);
                    return totalFee;
                } else {
                    console.error("GHTK delivery not supported or error:", response.message);
                    return 0;
                }
            } else {
                const dimensions = {
                    length: Math.max(...routeCartItems.map((item) => item.length || 20)),
                    width: Math.max(...routeCartItems.map((item) => item.width || 20)),
                    height: Math.max(...routeCartItems.map((item) => item.height || 50)),
                };

                const hoChiMinhVariants = [
                    "Hồ Chí Minh",
                    "TP.Hồ Chí Minh",
                    "TP. Hồ Chí Minh",
                    "TP Hồ Chí Minh",
                    "Thành phố Hồ Chí Minh",
                    "HCM",
                    "hochiminh",
                    "saigon",
                    "sg",
                    "Ho Chi Minh",
                    "ho chi minh"
                ];
                const inputCity = selectedAddress.city.trim().toLowerCase();

                const isHoChiMinh = hoChiMinhVariants.some(
                    (name) => name.toLowerCase() === inputCity
                );

                const serviceId = isHoChiMinh ? 53320 : 53321;
                const payload = {
                    from_district_id: STORE_LOCATION.district_id,
                    from_ward_code: STORE_LOCATION.ward_code,
                    service_id: serviceId,
                    service_type_id: null,
                    to_district_id: toDistrictId,
                    to_ward_code: toWardCode,
                    height: Math.round(dimensions.height),
                    length: Math.round(dimensions.length),
                    weight: Math.round(totalWeight),
                    width: Math.round(dimensions.width),
                    insurance_value: Math.round(calculateSubtotal()),
                    cod_failed_amount: paymentMethod === "cod" ? calculateSubtotal() : 0,
                    coupon: null,
                };
                const response = await GET_GHN_SHIPPING_FEE(payload);
                return response.total || 0;
            }

        } catch (error) {
            console.error("Error calculating shipping fee:", error);
            Alert.alert("Lỗi", "Không thể tính phí vận chuyển.");
            return 0;
        }
    };

    const calculatePromoDiscount = () => {
        if (routeDiscount) return routeDiscount;
        if (!appliedPromoCode || calculateSubtotal() < appliedPromoCode.minOrderValue) return 0;
        let discount = 0;
        if (appliedPromoCode.discountType === "percentage") {
            discount = (calculateSubtotal() * appliedPromoCode.discountValue) / 100;
            if (appliedPromoCode.maxDiscount) {
                discount = Math.min(discount, appliedPromoCode.maxDiscount);
            }
        } else if (appliedPromoCode.discountType === "fixed") {
            discount = appliedPromoCode.discountValue;
        }
        return discount;
    };

    const calculateSubtotal = () => {
        if (routeSubtotal) return routeSubtotal;
        return routeCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + (shipping || 0) - calculatePromoDiscount();
    };

    const formatExpiryDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };


    const applyPromoCode = async () => {
        if (!promoCode.trim()) {
            setPromoCodeError("Vui lòng nhập mã giảm giá");
            return;
        }
        try {
            setLoading(true);
            const formData = { orderTotal: calculateSubtotal() };
            const response = await PUT_ID("promotions/apply", promoCode, formData);
            console.log("okeee", formData);
            if (response.status === 200) {
                setAppliedPromoCode(response.data.data);
                setPromoCodeError("");
                setPromoCode("");
            } else {
                setPromoCodeError(response.error);
            }
        } catch (error) {
            setPromoCodeError("Mã giảm giá không hợp lệ.");
        } finally {
            setLoading(false);
        }
    };

    const removePromoCode = () => {
        setAppliedPromoCode(null);
    };

    const selectPromoCode = async (code) => {
        setPromoCode(code.code);
        setShowPromoCodesModal(false);
        try {
            setLoading(true);
            const formData = {
                orderTotal: calculateSubtotal()
            };
            const response = await PUT_ID("promotions/apply", code.code, formData);
            if (response.status === 200) {
                setAppliedPromoCode(response.data.data);
                setPromoCodeError("");
                setPromoCode("");
            } else {
                setPromoCodeError(response.error);
            }
        } catch (error) {
            setPromoCodeError("Mã giảm giá không hợp lệ.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = () => {
        if (
            !newAddress.fullName ||
            !newAddress.phone ||
            !newAddress.addressDetail ||
            !newAddress.city
        ) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin địa chỉ");
            return;
        }
        const newAddressList = [...addresses, { ...newAddress, id: Date.now().toString() }];
        setAddresses(newAddressList);
        setSelectedAddress(newAddressList[newAddressList.length - 1]);
        setShowAddAddress(false);
        setNewAddress({
            fullName: "",
            phone: "",
            addressDetail: "",
            street: "",
            district: "",
            city: "",
            active: false,
        });
    };

    useEffect(() => {
        if (showQr) {
            startPolling();
        } else {
            stopPolling();
        }
        return () => stopPolling();
    }, [showQr, paymentMethod]);

    const startPolling = () => {
        if (pollingIntervalRef.current) {
            console.log("Polling already active, skipping new interval");
            return;
        }
        const maxPollingTime = 5 * 60 * 1000; // 5 minutes
        const pollingInterval = 5000; // 5 seconds
        const startTime = Date.now();

        setPolling(true);
        pollingIntervalRef.current = setInterval(async () => {
            if (Date.now() - startTime > maxPollingTime) {
                stopPolling();
                setShowQr(false);
                Alert.alert("Thông báo", "Hết thời gian chờ thanh toán. Vui lòng thử lại.");
                return;
            }
            const response = await GET_ID("sepay/check", OrderNumber);
            if (response.status === 200) {
                stopPolling();
                setShowQr(false);
                const orderData = await AsyncStorage.getItem("pendingOrder");
                const parsedOrderData = JSON.parse(orderData);
                try {
                    const orderResponse = await POST_TOKEN("user/create-order", token, parsedOrderData);
                    if (orderResponse.status === 200) {
                        clearCart();
                        await AsyncStorage.removeItem("pendingOrder");
                        console.log("Đã lưu");

                        Alert.alert(
                            "Thanh toán thành công",
                            `Đơn hàng ${orderResponse.data.data.orderCode} đã được tạo.`,
                            [{ text: "OK", onPress: () => navigation.replace("AppTab") }]
                        );
                        return;
                    } else {
                        Alert.alert("Lỗi", orderResponse.error || "Đã có lỗi xảy ra khi tạo đơn hàng");
                    }
                } catch (error) {
                    stopPolling();
                    setShowQr(false);
                    console.error("Error creating order:", error);
                    Alert.alert("Lỗi", "Đã có lỗi xảy ra khi tạo đơn hàng");
                }
            }
        }, pollingInterval);
    };
    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        setPolling(false);
    };

    const handlePlaceOrder = async () => {
        if (!isLoggedIn) {
            Alert.alert("Đăng nhập", "Vui lòng đăng nhập để tiếp tục thanh toán", [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
            ]);
            return;
        }
        if (!selectedAddress) {
            Alert.alert("Lỗi", "Vui lòng chọn địa chỉ giao hàng");
            return;
        }
        try {
            setLoading(true);
            const orderData = {
                userId: user.id,
                items: routeCartItems.map((item) => ({
                    productId: item.id,
                    colorId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    storage: item.storage,
                    imageUrl: item.image,
                })),
                shipping: {
                    method: shippingProvider === "GHTK"
                        ? `Giao Hàng Tiết Kiệm (${ghtkDeliveryOption === "xteam" ? "Giao Nhanh" : "Giao Thường"})`
                        : "Giao Hàng Nhanh",
                    fee: shipping,
                    fullName: selectedAddress.fullName,
                    phone: selectedAddress.phone,
                    addressDetail: `${selectedAddress.addressDetail}, ${selectedAddress.district}, ${selectedAddress.city}`,
                    from_location: `${STORE_LOCATION.district_name}, ${STORE_LOCATION.ward_name}, ${STORE_LOCATION.city}`,
                    to_location: buyerLocation
                        ? `${buyerLocation.district_name}, ${buyerLocation.ward_name}, ${buyerLocation.city}`
                        : `${selectedAddress.district}, ${selectedAddress.street}, ${selectedAddress.city}`,
                },
                payment: {
                    method: paymentMethod,
                    status: paymentMethod === "cod" ? "Chưa thanh toán" : "Đã thanh toán",
                },
                promoCode: appliedPromo ? appliedPromo.code : appliedPromoCode ? appliedPromoCode.code : null,
                discount: calculatePromoDiscount(),
                total: calculateTotal(),
                note,
            };

            if (paymentMethod === "vnpay") {
                const formVnPay = {
                    amount: calculateTotal(),
                    orderId: OrderIdNow,
                    returnUrl: "http://localhost:8080/api/v1/public/vnpay/callback",
                    ipAddr: "127.0.0.1",
                };
                const paymentResponse = await POST_ADD("vnpay/payment", formVnPay);
                if (paymentResponse.status === 200 && paymentResponse.data.data.paymentUrl) {
                    setPaymentUrl(paymentResponse.data.data.paymentUrl);
                    setShowWebView(true);
                    await AsyncStorage.setItem("pendingOrder", JSON.stringify(orderData));
                } else {
                    Alert.alert("Thông báo", "Không thể tạo thanh toán qua VNPay");
                }
            } else if (paymentMethod === "momo") {
                const momoData = {
                    amount: calculateTotal(),
                    orderId: OrderIdNow,
                    ipAddr: "127.0.0.1",
                };
                const paymentResponse = await POST_ADD("momo/payment", momoData);
                if (paymentResponse.status === 200 && paymentResponse.data.data.paymentUrl) {
                    setPaymentUrl(paymentResponse.data.data.paymentUrl);
                    setShowWebView(true);
                    await AsyncStorage.setItem("pendingOrder", JSON.stringify(orderData));
                } else {
                    Alert.alert("Thông báo", "Không thể tạo thanh toán qua MoMo");
                }
            } else if (paymentMethod === "zalopay") {
                const zaloData = {
                    amount: calculateTotal(),
                    orderId: OrderIdNow,
                };
                const paymentResponse = await POST_ADD("zalopay/payment", zaloData);
                if (paymentResponse.status === 200 && paymentResponse.data.data.paymentUrl) {
                    setPaymentUrl(paymentResponse.data.data.paymentUrl);
                    setShowWebView(true);
                    await AsyncStorage.setItem("pendingOrder", JSON.stringify(orderData));
                } else {
                    Alert.alert("Thông báo", "Không thể tạo thanh toán qua ZaloPay");
                }
            } else if (paymentMethod === "bank") {
                const sePayData = {
                    amount: calculateTotal(),
                    orderId: OrderIdNow,
                    virtualAccount: "SEPSN29064"
                };
                const paymentResponse = await POST_ADD("sepay/payment", sePayData);
                if (paymentResponse.status === 200 && paymentResponse.data.data.qrUrl) {
                    setQr(paymentResponse.data.data.qrUrl);
                    setShowQr(true);
                    setPolling(true);
                    await AsyncStorage.setItem("pendingOrder", JSON.stringify(orderData));
                    startPolling()
                } else {
                    Alert.alert("Thông báo", "Không thể tạo thanh toán qua SePay");
                }
            } else {
                const response = await POST_TOKEN("user/create-order", token, orderData);
                if (response.status === 200) {
                    clearCart();
                    Alert.alert(
                        "Đặt hàng thành công",
                        `Đơn hàng ${response.data.data.orderCode} đã được tạo thành công.`,
                        [{ text: "OK", onPress: () => navigation.navigate("AppTab") }]
                    );
                } else {
                    Alert.alert("Lỗi", response.error || "Đã có lỗi xảy ra khi đặt hàng");
                }
            }
        } catch (error) {
            console.error("Place order error:", error);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra khi đặt hàng");
        } finally {
            setLoading(false);
        }
    };

    const handleWebViewNavigation = async (navState) => {
        const { url } = navState;
        if (url.includes("vnpay/callback")) {
            setShowWebView(false);
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
            const formDataCallback = {
                vnpayParams: vnpayParamsObj,
                orderDTO: parsedOrderData,
            };
            try {
                const response = await POST_VNPAY_CALLBACK("vnpay/callback", formDataCallback);
                if (response.status === 200) {
                    if (response.data.data.status === "failed") {
                        Alert.alert("Thông báo", "Thanh toán không thành công.");
                        return;
                    }
                    clearCart();
                    Alert.alert(
                        "Thanh toán thành công",
                        `Đơn hàng ${response.data.data.orderId} đã được tạo.`,
                        [{ text: "OK", onPress: () => navigation.replace("AppTab") }]
                    );
                    await AsyncStorage.removeItem("pendingOrder");
                } else {
                    Alert.alert("Lỗi", response.message || "Thanh toán không thành công");
                }
            } catch (error) {
                console.error("VNPay callback error:", error);
                Alert.alert("Lỗi", "Đã có lỗi xảy ra khi xử lý thanh toán VNPay");
            }
        } else if (url.includes("momo/callback")) {
            setShowWebView(false);
            const orderData = await AsyncStorage.getItem("pendingOrder");
            if (!orderData) {
                Alert.alert("Lỗi", "Không tìm thấy dữ liệu đơn hàng");
                return;
            }
            const queryParams = new URLSearchParams(url.split("?")[1]);
            const momoParamsObj = {};
            queryParams.forEach((value, key) => {
                momoParamsObj[key] = value;
            });
            const parsedOrderData = JSON.parse(orderData);
            const formDataCallback = {
                momoParams: momoParamsObj,
                orderDTO: parsedOrderData,
            };
            try {
                const response = await POST_VNPAY_CALLBACK("momo/callback", formDataCallback);
                if (response.status === 200 && response.data.status === "success") {
                    clearCart();
                    Alert.alert(
                        "Thanh toán thành công",
                        `Đơn hàng ${response.data.orderId} đã được tạo.`,
                        [{ text: "OK", onPress: () => navigation.replace("AppTab") }]
                    );
                    await AsyncStorage.removeItem("pendingOrder");
                } else {
                    Alert.alert("Thông báo", response.data.message || "Thanh toán không thành công");
                }
            } catch (error) {
                console.error("MoMo callback error:", error);
                Alert.alert("Lỗi", "Đã có lỗi xảy ra khi xử lý thanh toán MoMo");
            }
        } else if (url.includes("zalopay/callback")) {
            setShowWebView(false);
            const orderData = await AsyncStorage.getItem("pendingOrder");
            if (!orderData) {
                Alert.alert("Lỗi", "Không tìm thấy dữ liệu đơn hàng");
                return;
            }
            const queryParams = new URLSearchParams(url.split("?")[1]);
            const zaloParamsObj = {};
            queryParams.forEach((value, key) => {
                zaloParamsObj[key] = value;
            });
            const parsedOrderData = JSON.parse(orderData);
            const formDataCallback = {
                zalopayParams: zaloParamsObj,
                orderDTO: parsedOrderData,
            };
            try {
                const response = await POST_VNPAY_CALLBACK("zalopay/callback", formDataCallback);
                if (response.status === 200 && response.data.status === "success") {
                    clearCart();
                    Alert.alert(
                        "Thanh toán thành công",
                        `Đơn hàng ${response.data.orderId} đã được tạo.`,
                        [{ text: "OK", onPress: () => navigation.replace("AppTab") }]
                    );
                    await AsyncStorage.removeItem("pendingOrder");
                } else {
                    Alert.alert("Thông báo", response.data.message || "Thanh toán không thành công");
                }
            } catch (error) {
                console.error("ZaloPay callback error:", error);
                Alert.alert("Lỗi", "Đã có lỗi xảy ra khi xử lý thanh toán ZaloPay");
            }
        }
    };

    const ShippingProviderSection = () => {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chọn đơn vị vận chuyển</Text>
                <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                        setShippingProvider("GHN");
                        setGhtkDeliveryOption("xteam");
                    }}
                >
                    <View style={[styles.radio, shippingProvider === "GHN" && styles.radioSelected]} />
                    <Text style={styles.radioLabel}>Giao Hàng Nhanh (GHN)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setShippingProvider("GHTK")}
                >
                    <View style={[styles.radio, shippingProvider === "GHTK" && styles.radioSelected]} />
                    <Text style={styles.radioLabel}>Giao Hàng Tiết Kiệm (GHTK)</Text>
                </TouchableOpacity>
                {shippingProvider === "GHTK" && (
                    <View style={styles.subSection}>
                        <Text style={styles.subSectionTitle}>Loại hình giao hàng</Text>
                        <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setGhtkDeliveryOption("xteam")}
                        >
                            <View
                                style={[styles.radio, ghtkDeliveryOption === "xteam" && styles.radioSelected]}
                            />
                            <Text style={styles.radioLabel}>Giao Nhanh (xteam)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setGhtkDeliveryOption("none")}
                        >
                            <View
                                style={[styles.radio, ghtkDeliveryOption === "none" && styles.radioSelected]}
                            />
                            <Text style={styles.radioLabel}>Giao Thường (none)</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };




    return (
        <SafeAreaView style={styles.container}>
            {showWebView ? (
                <WebView
                    source={{ uri: paymentUrl }}
                    onNavigationStateChange={handleWebViewNavigation}
                    style={{ flex: 1 }}
                    onError={() => {
                        setShowWebView(false);
                        Alert.alert("Lỗi", "Không thể tải trang thanh toán");
                    }}
                />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ShippingAddressSection
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            showAddAddress={showAddAddress}
                            setShowAddAddress={setShowAddAddress}
                            newAddress={newAddress}
                            setNewAddress={setNewAddress}
                            handleAddAddress={handleAddAddress}
                        />
                        {/* Map Section */}
                        {buyerLocation && routeCoordinates.length > 0 && (
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    provider={PROVIDER_DEFAULT} // Default: Google on Android, Apple on iOS
                                    initialRegion={{
                                        latitude: STORE_LOCATION.coordinates.latitude,
                                        longitude: STORE_LOCATION.coordinates.longitude,
                                        latitudeDelta: 0.1,
                                        longitudeDelta: 0.1,
                                    }}
                                >
                                    <UrlTile
                                        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        maximumZ={19}
                                        subdomains={["a", "b", "c"]}
                                    />
                                    {/* <Marker
                                        coordinate={STORE_LOCATION.coordinates}
                                        title="Cửa hàng"
                                        description={`${STORE_LOCATION.district_name}, ${STORE_LOCATION.city}`}
                                    /> */}
                                    <Marker coordinate={STORE_LOCATION.coordinates}
                                        title="Cửa hàng"
                                        description={`${STORE_LOCATION.district_name}, ${STORE_LOCATION.city}`}>
                                        <Ionicons name="storefront" size={32} color="#e30019" />
                                    </Marker>

                                    <Marker coordinate={buyerLocation.coordinates}
                                        title="Địa chỉ giao hàng"
                                        description={`${buyerLocation.district_name}, ${buyerLocation.city}`}
                                    >
                                        <Ionicons name="person-circle" size={32} color="red" />
                                    </Marker>

                                    {/* <Marker
                                        coordinate={buyerLocation.coordinates}
                                        title="Địa chỉ giao hàng"
                                        description={`${buyerLocation.district_name}, ${buyerLocation.city}`}
                                    /> */}
                                    <Polyline
                                        coordinates={routeCoordinates}
                                        strokeColor="#e30019"
                                        strokeWidth={4}
                                    />
                                </MapView>
                            </View>
                        )}
                        <OrderItemsSection cartItems={routeCartItems} />
                        <PaymentMethodSection
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                        <OrderNoteSection note={note} setNote={setNote} />
                        <PromoCodeSection
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            appliedPromoCode={appliedPromoCode}
                            promoCodeError={promoCodeError}
                            applyPromoCode={applyPromoCode}
                            removePromoCode={removePromoCode}
                            setShowPromoCodesModal={setShowPromoCodesModal}
                            calculatePromoDiscount={calculatePromoDiscount}
                            setPromoCodeError={setPromoCodeError}
                            loading={loading}
                        />
                        <ShippingProviderSection />

                        <OrderSummarySection
                            calculateSubtotal={calculateSubtotal}
                            calculateShippingFee={shipping}
                            calculatePromoDiscount={calculatePromoDiscount}
                            calculateTotal={calculateTotal}
                            appliedPromoCode={appliedPromoCode}
                            storeLocation={STORE_LOCATION}
                            buyerLocation={buyerLocation}
                            shippingProvider={shippingProvider}
                            ghtkDeliveryOption={ghtkDeliveryOption}
                            routeDistance={routeDistance}
                        />
                    </ScrollView>
                    <CheckoutFooter
                        calculateTotal={calculateTotal}
                        handlePlaceOrder={handlePlaceOrder}
                        loading={loading}
                    />
                    <PromoCodesModal
                        showPromoCodesModal={showPromoCodesModal}
                        setShowPromoCodesModal={setShowPromoCodesModal}
                        availablePromoCodes={availablePromoCodes}
                        loadingPromoCodes={loadingPromoCodes}
                        selectPromoCode={selectPromoCode}
                        formatExpiryDate={formatExpiryDate}
                    />
                    {paymentMethod === "bank" && (
                        <Modal
                            visible={showQr}
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => {
                                setShowQr(false);
                                stopPolling();
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                            >
                                <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
                                        Quét mã QR để thanh toán
                                    </Text>
                                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                                        <Image source={{ uri: qr }} style={{ width: 200, height: 200 }} />
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={{ fontSize: 16, marginBottom: 5 }}>
                                            <Text style={{ fontWeight: "bold" }}>Ngân hàng: </Text>OCB
                                        </Text>
                                        <Text style={{ fontSize: 16, marginBottom: 5 }}>
                                            <Text style={{ fontWeight: "bold" }}>Tên tài khoản: </Text>NGUYEN SAO
                                        </Text>
                                        <Text style={{ fontSize: 16, marginBottom: 5 }}>
                                            <Text style={{ fontWeight: "bold" }}>Số tiền: </Text>{formatPrice(calculateTotal())}
                                        </Text>
                                        <Text style={{ fontSize: 16, marginBottom: 5 }}>
                                            <Text style={{ fontWeight: "bold" }}>Nội dung: </Text>SN{OrderNumber}
                                        </Text>
                                    </View>
                                    <Button
                                        title="Đóng"
                                        onPress={() => {
                                            setShowQr(false);
                                            stopPolling();
                                        }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}