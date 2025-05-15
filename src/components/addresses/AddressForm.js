


// import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";

// const AddressForm = ({ formData, onChange, errors, onGetLocation, isLoadingLocation }) => (
//     <View style={styles.formContainer}>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Người nhận</Text>
//             <TextInput
//                 style={[styles.input, errors.fullName && styles.inputError]}
//                 value={formData.fullName}
//                 onChangeText={(value) => onChange("fullName", value)}
//                 placeholder="Họ và tên người nhận"
//             />
//             {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
//         </View>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Số điện thoại</Text>
//             <TextInput
//                 style={[styles.input, errors.phone && styles.inputError]}
//                 value={formData.phone}
//                 onChangeText={(value) => onChange("phone", value)}
//                 placeholder="Số điện thoại"
//                 keyboardType="phone-pad"
//             />
//             {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
//         </View>

//         {/* Nút lấy vị trí hiện tại */}
//         <TouchableOpacity
//             style={styles.locationButton}
//             onPress={onGetLocation}
//             disabled={isLoadingLocation}
//         >
//             <Text style={styles.locationButtonText}>
//                 {isLoadingLocation ? "Đang lấy vị trí..." : "Lấy vị trí hiện tại"}
//             </Text>
//         </TouchableOpacity>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Địa chỉ</Text>
//             <TextInput
//                 style={[styles.input, errors.addressDetail && styles.inputError]}
//                 value={formData.addressDetail}
//                 onChangeText={(value) => onChange("addressDetail", value)}
//                 placeholder="Số nhà, tên đường"
//             />
//             {errors.addressDetail && <Text style={styles.errorText}>{errors.addressDetail}</Text>}
//         </View>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Phường/Xã</Text>
//             <TextInput
//                 style={[styles.input, errors.street && styles.inputError]}
//                 value={formData.street}
//                 onChangeText={(value) => onChange("street", value)}
//                 placeholder="Phường/Xã"
//             />
//             {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
//         </View>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Quận/Huyện</Text>
//             <TextInput
//                 style={[styles.input, errors.district && styles.inputError]}
//                 value={formData.district}
//                 onChangeText={(value) => onChange("district", value)}
//                 placeholder="Quận/Huyện"
//             />
//             {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
//         </View>

//         <View style={styles.formRow}>
//             <Text style={styles.label}>Tỉnh/Thành phố</Text>
//             <TextInput
//                 style={[styles.input, errors.city && styles.inputError]}
//                 value={formData.city}
//                 onChangeText={(value) => onChange("city", value)}
//                 placeholder="Tỉnh/Thành phố"
//             />
//             {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
//         </View>

//         <View style={styles.switchRow}>
//             <Text style={styles.label}>Đặt làm địa chỉ mặc định</Text>
//             <Switch
//                 value={formData.active}
//                 onValueChange={(value) => onChange("active", value)}
//                 thumbColor={formData.active ? "#e30019" : "#ccc"}
//                 trackColor={{ false: "#eee", true: "#ffcccc" }}
//             />
//         </View>
//     </View>
// );

// const styles = StyleSheet.create({
//     formContainer: {
//         backgroundColor: "#fff",
//         padding: 15,
//         borderRadius: 10,
//         margin: 15,
//     },
//     formRow: {
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: "bold",
//         marginBottom: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#eee",
//         borderRadius: 5,
//         padding: 10,
//         fontSize: 14,
//     },
//     inputError: {
//         borderColor: "#e30019",
//     },
//     errorText: {
//         color: "#e30019",
//         fontSize: 12,
//         marginTop: 5,
//     },
//     switchRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginBottom: 15,
//     },
//     locationButton: {
//         backgroundColor: "#e30019",
//         padding: 10,
//         borderRadius: 5,
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     locationButtonText: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "bold",
//     },
// });

// export default AddressForm;


import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const AddressForm = ({
    formData,
    onChange,
    errors,
    onGetLocation,
    isLoadingLocation,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên người nhận</Text>
            <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                value={formData.fullName}
                onChangeText={(value) => onChange("fullName", value)}
                placeholder="Nhập tên người nhận"
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={formData.phone}
                onChangeText={(value) => onChange("phone", value)}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <Text style={styles.label}>Địa chỉ chi tiết</Text>
            <TextInput
                style={[styles.input, errors.addressDetail && styles.inputError]}
                value={formData.addressDetail}
                onChangeText={(value) => onChange("addressDetail", value)}
                placeholder="Nhập địa chỉ chi tiết"
            />
            {errors.addressDetail && (
                <Text style={styles.errorText}>{errors.addressDetail}</Text>
            )}

            <Text style={styles.label}>Phường/Xã</Text>
            <TextInput
                style={[styles.input, errors.street && styles.inputError]}
                value={formData.street}
                onChangeText={(value) => onChange("street", value)}
                placeholder="Nhập phường/xã"
            />
            {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}

            <Text style={styles.label}>Quận/Huyện</Text>
            <TextInput
                style={[styles.input, errors.district && styles.inputError]}
                value={formData.district}
                onChangeText={(value) => onChange("district", value)}
                placeholder="Nhập quận/huyện"
            />
            {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

            <Text style={styles.label}>Tỉnh/Thành phố</Text>
            <TextInput
                style={[styles.input, errors.city && styles.inputError]}
                value={formData.city}
                onChangeText={(value) => onChange("city", value)}
                placeholder="Nhập tỉnh/thành phố"
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

            <TouchableOpacity
                style={[styles.locationButton, isLoadingLocation && styles.disabledButton]}
                onPress={onGetLocation}
                disabled={isLoadingLocation}
            >
                <Text style={styles.locationButtonText}>
                    {isLoadingLocation ? "Đang tải..." : "Lấy vị trí hiện tại"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    inputError: {
        borderColor: "#e30019",
    },
    errorText: {
        color: "#e30019",
        fontSize: 12,
        marginBottom: 10,
    },
    locationButton: {
        backgroundColor: "#e30019",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    locationButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
});

export default AddressForm;