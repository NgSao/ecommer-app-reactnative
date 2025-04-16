import { View, FlatList, ActivityIndicato, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import useShippingAddresses from "@hooks/useShippingAddresses"
import AddressHeader from "@components/addresses/AddressHeader"
import AddressItem from "@components/addresses/AddressItem"
import EmptyState from "@components/addresses/EmptyState"
import AddAddressButton from "@components/addresses/AddAddressButton"
import DeleteConfirmModal from "@components/addresses/DeleteConfirmModal"
import styles from "../../styles/ShippingAddressesScreen"

const ShippingAddressesScreen = () => {
    const {
        addresses,
        loading,
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleDeleteAddress,
        confirmDeleteAddress,
        onEditAddress,
        onAddAddress,
        onBack,
    } = useShippingAddresses()

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
                        keyExtractor={(item) => item.id}
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
    )
}

export default ShippingAddressesScreen