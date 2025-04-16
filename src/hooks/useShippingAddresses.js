import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"
import { Alert } from "react-native"

const useShippingAddresses = () => {
    const navigation = useNavigation()
    const { user, loading } = useAuth()
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    useEffect(() => {
        if (user && user.addresses) {
            setAddresses(user.addresses)
        }
    }, [user])

    const handleDeleteAddress = (address) => {
        setSelectedAddress(address)
        setShowDeleteConfirm(true)
    }

    const confirmDeleteAddress = () => {
        if (selectedAddress) {
            const updatedAddresses = addresses.filter((addr) => addr.id !== selectedAddress.id)
            setAddresses(updatedAddresses)
            Alert.alert("Thành công", "Đã xóa địa chỉ thành công")
        }
        setShowDeleteConfirm(false)
        setSelectedAddress(null)
    }

    const onEditAddress = (address) => {
        navigation.navigate("EditAddress", { address })
    }

    const onAddAddress = () => {
        navigation.navigate("AddAddress")
    }

    const onBack = () => {
        navigation.goBack()
    }

    return {
        addresses,
        loading,
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleDeleteAddress,
        confirmDeleteAddress,
        onEditAddress,
        onAddAddress,
        onBack,
    }
}

export default useShippingAddresses