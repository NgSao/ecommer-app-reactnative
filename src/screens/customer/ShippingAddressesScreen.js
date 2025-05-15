

import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressHeader from "@components/addresses/AddressHeader";
import AddressItem from "@components/addresses/AddressItem";
import EmptyState from "@components/addresses/EmptyState";
import AddAddressButton from "@components/addresses/AddAddressButton";
import DeleteConfirmModal from "@components/addresses/DeleteConfirmModal";
import styles from "../../styles/ShippingAddressesScreen";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/AuthContext";
import { Alert } from "react-native";
import { DELETE_TOKEN } from "api/apiService";

const ShippingAddressesScreen = () => {
    const navigation = useNavigation();
    const { user, loading, token, fetchUser } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (user && user.addresses) {
            setAddresses(user.addresses);
        }
    }, [user]);

    const refreshAddresses = async () => {
        if (!token) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để xem địa chỉ");
            navigation.navigate("Login");
            return;
        }
        try {
            await fetchUser();
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải danh sách địa chỉ");
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            refreshAddresses();
        });
        return unsubscribe;
    }, [navigation, token]);

    const handleDeleteAddress = (address) => {
        setSelectedAddress(address);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteAddress = async () => {
        if (selectedAddress) {
            if (!token) {
                Alert.alert("Lỗi", "Bạn cần đăng nhập để xóa địa chỉ");
                navigation.navigate("Login");
                return;
            }
            try {
                const id = selectedAddress.id;
                const response = await DELETE_TOKEN("address/delete", id, token);
                if (response.status !== 200) {
                    Alert.alert("Lỗi", "Không thể xóa địa chỉ");
                    return;
                }
                const updatedAddresses = addresses.filter((addr) => addr.id !== selectedAddress.id);
                setAddresses(updatedAddresses);
                Alert.alert("Thành công", "Đã xóa địa chỉ thành công");
            } catch (error) {
                Alert.alert("Lỗi", "Không thể xóa địa chỉ");
            }
        }
        setShowDeleteConfirm(false);
        setSelectedAddress(null);
    };

    const onEditAddress = (address) => {
        navigation.navigate("EditAddress", { address });
    };

    const onAddAddress = () => {
        navigation.navigate("AddAddress");
    };

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <AddressHeader onBack={onBack} />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={addresses}
                        renderItem={({ item }) => (
                            <AddressItem
                                item={item}
                                onEdit={onEditAddress}
                                onDelete={handleDeleteAddress}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
                        contentContainerStyle={styles.addressList}
                        ListEmptyComponent={<EmptyState />}
                    />
                    <AddAddressButton onPress={onAddAddress} />
                </>
            )}
            <DeleteConfirmModal
                visible={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDeleteAddress}
            />
        </SafeAreaView>
    );
};

export default ShippingAddressesScreen;