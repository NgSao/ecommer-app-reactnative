import { View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "../../styles/EditAddressStyles"
import useEditAddress from "@hooks/useEditAddress"
import AddressForm from "@components/addresses/AddressForm"
import SaveButton from "@components/addresses/SaveButton"
import EditAddressHeader from "@components/addresses/EditAddressHeader"

const EditAddressScreen = () => {
    const {
        formData,
        errors,
        handleChange,
        handleSave,
        onBack,
        isFormValid,
    } = useEditAddress()

    return (
        <SafeAreaView style={styles.container}>
            <EditAddressHeader onBack={onBack} />
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

export default EditAddressScreen