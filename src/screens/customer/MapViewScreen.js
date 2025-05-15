import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const MapViewScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { address } = route.params || {};
    const [mapRegion, setMapRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAddressLocation = async () => {
            setIsLoading(true);
            try {
                let latitude, longitude;

                // Use provided coordinates if available
                if (address.latitude && address.longitude) {
                    latitude = address.latitude;
                    longitude = address.longitude;
                } else {
                    // Geocode the address if coordinates are missing
                    const addressString = `${address.addressDetail}, ${address.street}, ${address.district}, ${address.city}`;
                    const result = await Location.geocodeAsync(addressString);
                    if (result.length > 0) {
                        latitude = result[0].latitude;
                        longitude = result[0].longitude;
                    } else {
                        throw new Error("Không thể tìm thấy tọa độ cho địa chỉ này");
                    }
                }

                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } catch (err) {
                setError("Không thể tải vị trí bản đồ");
                console.error("Lỗi khi tải vị trí:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (address) {
            loadAddressLocation();
        } else {
            setError("Không có thông tin địa chỉ");
            setIsLoading(false);
        }
    }, [address]);

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Vị trí địa chỉ</Text>
            </View>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải bản đồ...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button title="Quay lại" onPress={onBack} color="#e30019" />
                </View>
            ) : (
                <>
                    <View style={styles.addressInfo}>
                        <Text style={styles.addressName}>{address.name || "Địa chỉ"}</Text>
                        <Text style={styles.addressRecipient}>
                            {address.fullName} | {address.phone}
                        </Text>
                        <Text style={styles.addressText}>
                            {address.addressDetail}, {address.street}, {address.district}, {address.city}
                        </Text>
                    </View>
                    {mapRegion && (
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
                            <Marker
                                coordinate={{
                                    latitude: mapRegion.latitude,
                                    longitude: mapRegion.longitude,
                                }}
                                title={address.name || "Địa chỉ"}
                                description={`${address.addressDetail}, ${address.city}`}
                            />
                        </MapView>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: "#e30019",
        marginBottom: 20,
        textAlign: "center",
    },
    addressInfo: {
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    addressName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    addressRecipient: {
        fontSize: 14,
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: "#666",
    },
    map: {
        flex: 1,
    },
});

export default MapViewScreen;