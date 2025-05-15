

// import { View, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styles from "../../styles/EditAddressStyles";
// import AddressForm from "@components/addresses/AddressForm";
// import SaveButton from "@components/addresses/SaveButton";
// import EditAddressHeader from "@components/addresses/EditAddressHeader";
// import { useState } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import * as Location from "expo-location";
// import { POST_TOKEN } from "api/apiService";
// import { useAuth } from "@contexts/AuthContext";

// const EditAddressScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { address } = route.params || {};
//     const { token, user, updateUser } = useAuth();

//     const [formData, setFormData] = useState({
//         id: address?.id || "",
//         fullName: address?.fullName || "",
//         phone: address?.phone || "",
//         addressDetail: address?.addressDetail || "",
//         street: address?.street || "",
//         district: address?.district || address?.ward || "",
//         city: address?.city || "",
//         active: address?.active || false,
//     });
//     const [errors, setErrors] = useState({});
//     const [isLoadingLocation, setIsLoadingLocation] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     const getCurrentLocation = async () => {
//         setIsLoadingLocation(true);
//         try {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== "granted") {
//                 Alert.alert("Lỗi", "Quyền truy cập vị trí bị từ chối");
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             const { latitude, longitude } = location.coords;

//             let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
//             if (addressResponse.length > 0) {
//                 const geoAddress = addressResponse[0];
//                 setFormData((prev) => ({
//                     ...prev,
//                     addressDetail: geoAddress.name || "",
//                     street: geoAddress.district || "",
//                     district: geoAddress.subregion || "",
//                     city: geoAddress.region || geoAddress.city || "",
//                 }));
//             } else {
//                 Alert.alert("Lỗi", "Không thể lấy địa chỉ từ vị trí hiện tại");
//             }
//         } catch (error) {
//             console.error("Lỗi khi lấy vị trí:", error);
//             Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại");
//         } finally {
//             setIsLoadingLocation(false);
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập tên người nhận";
//         if (!formData.phone.trim()) {
//             newErrors.phone = "Vui lòng nhập số điện thoại";
//         } else if (!/^\d{10,11}$/.test(formData.phone)) {
//             newErrors.phone = "Số điện thoại không hợp lệ";
//         }
//         if (!formData.addressDetail.trim()) newErrors.addressDetail = "Vui lòng nhập địa chỉ";
//         if (!formData.street.trim()) newErrors.street = "Vui lòng nhập phường/xã";
//         if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện";
//         if (!formData.city.trim()) newErrors.city = "Vui lòng nhập tỉnh/thành phố";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (field, value) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//         if (errors[field]) {
//             setErrors((prev) => ({ ...prev, [field]: null }));
//         }
//     };

//     const handleSave = async () => {
//         if (!validateForm()) {
//             return;
//         }

//         if (!token) {
//             Alert.alert("Lỗi", "Bạn cần đăng nhập để cập nhật địa chỉ");
//             navigation.navigate("Login");
//             return;
//         }

//         setIsSaving(true);
//         try {
//             const response = await POST_TOKEN("address/updated", token, formData);
//             if (response.status === 200) {
//                 const updatedAddress = response.data.data;
//                 const updatedAddresses = (user.addresses || []).map((addr) =>
//                     addr.id === updatedAddress.id ? updatedAddress : addr
//                 );
//                 updateUser({ ...user, addresses: updatedAddresses });

//                 Alert.alert("Thành công", "Địa chỉ đã được cập nhật", [
//                     {
//                         text: "OK",
//                         onPress: () => navigation.goBack(),
//                     },
//                 ]);
//             } else {
//                 Alert.alert("Lỗi", response.data?.message || "Không thể cập nông địa chỉ");
//             }
//         } catch (error) {
//             const errorMessage = error.message || "Đã xảy ra lỗi khi cập nhật địa chỉ";
//             if (errorMessage.includes("JWT")) {
//                 Alert.alert("Lỗi", "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
//                 navigation.navigate("Login");
//             } else {
//                 Alert.alert("Lỗi", errorMessage);
//             }
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const onBack = () => {
//         navigation.goBack();
//     };

//     const isFormValid = () => {
//         return (
//             formData.fullName.trim() &&
//             formData.phone.trim() &&
//             /^\d{10,11}$/.test(formData.phone) &&
//             formData.addressDetail.trim() &&
//             formData.street.trim() &&
//             formData.district.trim() &&
//             formData.city.trim()
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <EditAddressHeader onBack={onBack} />
//             <ScrollView>
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                     style={{ flex: 1 }}
//                     keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
//                 >
//                     <AddressForm
//                         formData={formData}
//                         onChange={handleChange}
//                         errors={errors}
//                         onGetLocation={getCurrentLocation}
//                         isLoadingLocation={isLoadingLocation}
//                     />
//                 </KeyboardAvoidingView>

//                 <SaveButton
//                     onPress={handleSave}
//                     disabled={!isFormValid() || isSaving}
//                     isLoading={isSaving}
//                 />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default EditAddressScreen;


import {
    View,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/EditAddressStyles";
import AddressForm from "@components/addresses/AddressForm";
import SaveButton from "@components/addresses/SaveButton";
import EditAddressHeader from "@components/addresses/EditAddressHeader";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { POST_TOKEN } from "api/apiService";
import { useAuth } from "@contexts/AuthContext";
import MapView, { Marker, UrlTile } from "react-native-maps";

const EditAddressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { address } = route.params || {};
    const { token, user, updateUser } = useAuth();

    const [formData, setFormData] = useState({
        id: address?.id || "",
        fullName: address?.fullName || "",
        phone: address?.phone || "",
        addressDetail: address?.addressDetail || "",
        street: address?.street || "",
        district: address?.district || address?.ward || "",
        city: address?.city || "",
        active: address?.active || false,
        latitude: address?.latitude || null,
        longitude: address?.longitude || null,
    });
    const [errors, setErrors] = useState({});
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (formData.latitude && formData.longitude) {
            setMapRegion({
                latitude: formData.latitude,
                longitude: formData.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [formData.latitude, formData.longitude]);

    const getCurrentLocation = async () => {
        setIsLoadingLocation(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Lỗi", "Quyền truy cập vị trí bị từ chối");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (addressResponse.length > 0) {
                const geoAddress = addressResponse[0];
                setFormData((prev) => ({
                    ...prev,
                    addressDetail: geoAddress.name || "",
                    street: geoAddress.district || "",
                    district: geoAddress.subregion || geoAddress.city || "",
                    city: geoAddress.region || geoAddress.city || "",
                    latitude,
                    longitude,
                }));
                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                Alert.alert("Lỗi", "Không thể lấy địa chỉ từ vị trí hiện tại");
            }
        } catch (error) {
            console.error("Lỗi khi lấy vị trí:", error);
            Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại");
        } finally {
            setIsLoadingLocation(false);
        }
    };

    const searchLocation = async () => {
        if (!searchQuery.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ để tìm kiếm");
            return;
        }
        setIsLoadingLocation(true);
        try {
            const result = await Location.geocodeAsync(searchQuery);
            if (result.length > 0) {
                const { latitude, longitude } = result[0];
                let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (addressResponse.length > 0) {
                    const address = addressResponse[0];
                    console.log("Vịtris", address);
                    setFormData((prev) => ({
                        ...prev,
                        addressDetail: address.name || address.street || "",
                        street: address.district || address.subregion || "",
                        district: address.subregion || address.city || "",
                        city: address.region || address.city || "",
                        latitude,
                        longitude,
                    }));
                    setMapRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                } else {
                    Alert.alert("Lỗi", "Không thể lấy địa chỉ từ tọa độ");
                }
            } else {
                Alert.alert("Lỗi", "Không tìm thấy địa chỉ");
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm địa chỉ:", error);
            Alert.alert("Lỗi", "Không thể tìm kiếm địa chỉ");
        } finally {
            setIsLoadingLocation(false);
        }
    };

    const handleMarkerDrag = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        try {
            let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (addressResponse.length > 0) {
                const address = addressResponse[0];
                console.log("assss", address)
                setFormData((prev) => ({
                    ...prev,
                    addressDetail: address.name || address.street || "",
                    street: address.district || address.subregion || "",
                    district: address.subregion || address.city || "",
                    city: address.region || address.city || "",
                    latitude,
                    longitude,
                }));
            }
        } catch (error) {
            console.error("Lỗi khi dịch ngược tọa độ:", error);
            Alert.alert("Lỗi", "Không thể lấy địa chỉ từ vị trí đã chọn");
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập tên người nhận";
        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^\d{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }
        if (!formData.addressDetail.trim()) newErrors.addressDetail = "Vui lòng nhập địa chỉ";
        if (!formData.street.trim()) newErrors.street = "Vui lòng nhập phường/xã";
        if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện";
        if (!formData.city.trim()) newErrors.city = "Vui lòng nhập tỉnh/thành phố";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        if (!token) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để cập nhật địa chỉ");
            navigation.navigate("Login");
            return;
        }

        setIsSaving(true);
        try {
            const response = await POST_TOKEN("address/updated", token, {
                ...formData,
                latitude: formData.latitude || undefined,
                longitude: formData.longitude || undefined,
            });
            if (response.status === 200) {
                const updatedAddress = response.data.data;
                const updatedAddresses = (user.addresses || []).map((addr) =>
                    addr.id === updatedAddress.id ? updatedAddress : addr
                );
                updateUser({ ...user, addresses: updatedAddresses });
                Alert.alert("Thành công", "Địa chỉ đã được cập nhật", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Lỗi", response.data?.message || "Không thể cập nhật địa chỉ");
            }
        } catch (error) {
            const errorMessage = error.message || "Đã xảy ra lỗi khi cập nhật địa chỉ";
            if (errorMessage.includes("JWT")) {
                Alert.alert("Lỗi", "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
                navigation.navigate("Login");
            } else {
                Alert.alert("Lỗi", errorMessage);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const onBack = () => {
        navigation.goBack();
    };

    const isFormValid = () => {
        return (
            formData.fullName.trim() &&
            formData.phone.trim() &&
            /^\d{10,11}$/.test(formData.phone) &&
            formData.addressDetail.trim() &&
            formData.street.trim() &&
            formData.district.trim() &&
            formData.city.trim()
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <EditAddressHeader onBack={onBack} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <AddressForm
                        formData={formData}
                        onChange={handleChange}
                        errors={errors}
                        onGetLocation={getCurrentLocation}
                        isLoadingLocation={isLoadingLocation}
                    />
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Nhập địa chỉ để tìm kiếm (VD: 123 Nguyễn Thị Minh Khai, Quận 1)"
                        />
                        <Button title="Tìm kiếm" onPress={searchLocation} color="#e30019" />
                    </View>
                    {isLoadingLocation ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#e30019" />
                            <Text style={styles.loadingText}>Đang tải vị trí...</Text>
                        </View>
                    ) : mapRegion ? (
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                region={mapRegion}
                                onRegionChangeComplete={setMapRegion}
                            >
                                <UrlTile
                                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    maximumZ={19}
                                    subdomains={["a", "b", "c"]}
                                />
                                {formData.latitude && formData.longitude && (
                                    <Marker
                                        coordinate={{
                                            latitude: formData.latitude,
                                            longitude: formData.longitude,
                                        }}
                                        draggable
                                        onDragEnd={handleMarkerDrag}
                                        title="Vị trí đã chọn"
                                    />
                                )}
                            </MapView>
                            <Button
                                title="Định vị lại"
                                onPress={getCurrentLocation}
                                color="#e30019"
                            />
                        </View>
                    ) : (
                        <Text style={styles.noMapText}>
                            Nhấn "Lấy vị trí hiện tại" hoặc tìm kiếm để xem bản đồ
                        </Text>
                    )}
                    <SaveButton
                        onPress={handleSave}
                        disabled={!isFormValid() || isSaving}
                        isLoading={isSaving}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};

export default EditAddressScreen;