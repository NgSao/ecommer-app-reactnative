import { View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "../../styles/EditAddressStyles"
import AddAddressHeader from "@components/addresses/AddAddressHeader"
import AddressForm from "@components/addresses/AddressForm"
import SaveButton from "@components/addresses/SaveButton"
import useAddAddress from "@hooks/useAddAddress"

const AddAddressScreen = () => {
    const {
        formData,
        errors,
        handleChange,
        handleSave,
        onBack,
        isFormValid,
    } = useAddAddress()

    return (
        <SafeAreaView style={styles.container}>
            <AddAddressHeader onBack={onBack} />
            <ScrollView>
                <AddressForm
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />
                <SaveButton
                    onPress={handleSave}
                    disabled={!isFormValid()}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAddressScreen