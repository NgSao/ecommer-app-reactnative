import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ShippingAddressSection = ({
    addresses,
    selectedAddress,
    setSelectedAddress,
    showAddAddress,
    setShowAddAddress,
    newAddress,
    setNewAddress,
    handleAddAddress,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
        {addresses.length > 0 ? (
            <View style={styles.addressList}>
                {addresses.map((address) => (
                    <TouchableOpacity
                        key={address.id}
                        style={[
                            styles.addressItem,
                            selectedAddress && selectedAddress.id === address.id && styles.selectedAddress,
                        ]}
                        onPress={() => setSelectedAddress(address)}
                    >
                        <View style={styles.addressHeader}>
                            <Text style={styles.addressName}>
                                {address.fullName} | {address.phone}
                            </Text>
                            {address.active && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultBadgeText}>Mặc định</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.addressText}>
                            {address.addressDetail}, {address.street}, {address.district}, {address.city}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        ) : (
            <Text style={styles.noAddressText}>Chưa có địa chỉ giao hàng</Text>
        )}
        {/* {!showAddAddress ? (
            <TouchableOpacity style={styles.addAddressButton} onPress={() => setShowAddAddress(true)}>
                <Ionicons name="add-circle-outline" size={20} color="#e30019" />
                <Text style={styles.addAddressText}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>
        ) : (
            // <View style={styles.addAddressForm}>
            //     <Text style={styles.formLabel}>Tên địa chỉ (tùy chọn)</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Ví dụ: Nhà riêng, Công ty"
            //         value={newAddress.name}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            //     />
            //     <Text style={styles.formLabel}>Người nhận</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Họ tên người nhận"
            //         value={newAddress.recipient}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, recipient: text })}
            //     />
            //     <Text style={styles.formLabel}>Số điện thoại</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Số điện thoại người nhận"
            //         keyboardType="phone-pad"
            //         value={newAddress.phone}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
            //     />
            //     <Text style={styles.formLabel}>Địa chỉ</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Số nhà, tên đường"
            //         value={newAddress.address}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
            //     />
            //     <Text style={styles.formLabel}>Phường/Xã</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Phường/Xã"
            //         value={newAddress.ward}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, ward: text })}
            //     />
            //     <Text style={styles.formLabel}>Quận/Huyện</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Quận/Huyện"
            //         value={newAddress.district}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, district: text })}
            //     />
            //     <Text style={styles.formLabel}>Tỉnh/Thành phố</Text>
            //     <TextInput
            //         style={styles.input}
            //         placeholder="Tỉnh/Thành phố"
            //         value={newAddress.city}
            //         onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
            //     />
            //     <View style={styles.defaultAddressContainer}>
            //         <TouchableOpacity
            //             style={styles.checkboxContainer}
            //             onPress={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })}
            //         >
            //             <View style={[styles.checkbox, newAddress.isDefault && styles.checkboxChecked]}>
            //                 {newAddress.isDefault && <Ionicons name="checkmark" size={16} color="#fff" />}
            //             </View>
            //             <Text style={styles.checkboxLabel}>Đặt làm địa chỉ mặc định</Text>
            //         </TouchableOpacity>
            //     </View>
            //     <View style={styles.formButtons}>
            //         <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddAddress(false)}>
            //             <Text style={styles.cancelButtonText}>Hủy</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.saveButton} onPress={handleAddAddress}>
            //             <Text style={styles.saveButtonText}>Lưu địa chỉ</Text>
            //         </TouchableOpacity>
            //     </View>
            // </View>

        )} */}
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    addressList: {
        marginBottom: 15,
    },
    addressItem: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    selectedAddress: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    addressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    addressName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    defaultBadge: {
        backgroundColor: "#e30019",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    defaultBadgeText: {
        color: "#fff",
        fontSize: 12,
    },
    addressRecipient: {
        fontSize: 14,
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: "#666",
    },
    noAddressText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 15,
        fontStyle: "italic",
    },
    addAddressButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#e30019",
        borderRadius: 5,
        borderStyle: "dashed",
    },
    addAddressText: {
        color: "#e30019",
        marginLeft: 5,
        fontSize: 14,
    },
    addAddressForm: {
        marginTop: 15,
    },
    formLabel: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
        fontSize: 14,
    },
    defaultAddressContainer: {
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 3,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxChecked: {
        backgroundColor: "#e30019",
        borderColor: "#e30019",
    },
    checkboxLabel: {
        fontSize: 14,
    },
    formButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        alignItems: "center",
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#666",
    },
    saveButton: {
        flex: 1,
        padding: 10,
        backgroundColor: "#e30019",
        borderRadius: 5,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default ShippingAddressSection

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { POST_ADD, GET_ALL } from '../../api/apiService';

// const ShippingAddressSection = ({
//     addresses,
//     selectedAddress,
//     setSelectedAddress,
//     showAddAddress,
//     setShowAddAddress,
//     newAddress,
//     setNewAddress,
//     handleAddAddress,
// }) => {
//     const [provinces, setProvinces] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedWard, setSelectedWard] = useState('');

//     useEffect(() => {
//         fetchProvinces();
//     }, []);

//     useEffect(() => {
//         if (selectedProvince) {
//             fetchDistricts(selectedProvince);
//         }
//     }, [selectedProvince]);

//     useEffect(() => {
//         if (selectedDistrict && selectedProvince) {
//             fetchWards(selectedProvince, selectedDistrict);
//         }
//     }, [selectedDistrict]);

//     const fetchProvinces = async () => {
//         try {
//             const response = await GET_ALL('/shipping/ghn/provinces');
//             if (response.status === 200) {
//                 setProvinces(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching provinces:', error);
//             Alert.alert('Lỗi', 'Không thể tải danh sách tỉnh/thành');
//         }
//     };

//     const fetchDistricts = async (province) => {
//         try {
//             const response = await GET_ALL('shipping/ghn/districts');
//             if (response.status === 200) {
//                 setDistricts(response.data);
//                 setSelectedDistrict('');
//                 setWards([]);
//                 setSelectedWard('');
//             }
//         } catch (error) {
//             console.error('Error fetching districts:', error);
//             Alert.alert('Lỗi', 'Không thể tải danh sách quận/huyện');
//         }
//     };

//     const fetchWards = async (province, districtId) => {
//         try {
//             const response = await GET_ALL(`shipping/ghn/wards?districtId=${districtId}`);
//             if (response.status === 200) {
//                 setWards(response.data);
//                 setSelectedWard('');
//             }
//         } catch (error) {
//             console.error('Error fetching wards:', error);
//             Alert.alert('Lỗi', 'Không thể tải danh sách phường/xã');
//         }
//     };

//     const handleProvinceChange = (provinceName) => {
//         setSelectedProvince(provinceName);
//         setNewAddress({ ...newAddress, city: provinceName });
//     };

//     const handleDistrictChange = (district) => {
//         setSelectedDistrict(district.DistrictID);
//         setNewAddress({ ...newAddress, district: district.DistrictName, districtId: district.DistrictID });
//     };

//     const handleWardChange = (ward) => {
//         setSelectedWard(ward.WardCode);
//         setNewAddress({ ...newAddress, ward: ward.WardName, wardCode: ward.WardCode });
//     };

//     const renderAddressItem = ({ item }) => (
//         <TouchableOpacity
//             style={[styles.addressItem, selectedAddress?.id === item.id && styles.selectedAddress]}
//             onPress={() => setSelectedAddress(item)}
//         >
//             <Text>{`${item.fullName} | ${item.phone}`}</Text>
//             <Text>{`${item.addressDetail}, ${item.district}, ${item.city}`}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Địa chỉ giao hàng</Text>
//             <FlatList
//                 data={addresses}
//                 renderItem={renderAddressItem}
//                 keyExtractor={(item) => item.id}
//                 ListEmptyComponent={<Text>Chưa có địa chỉ nào</Text>}
//             />
//             <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => setShowAddAddress(true)}
//             >
//                 <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
//             </TouchableOpacity>

//             <Modal visible={showAddAddress} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalTitle}>Thêm địa chỉ mới</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Họ và tên"
//                         value={newAddress.fullName}
//                         onChangeText={(text) => setNewAddress({ ...newAddress, fullName: text })}
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Số điện thoại"
//                         value={newAddress.phone}
//                         onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
//                         keyboardType="phone-pad"
//                     />
//                     <Picker
//                         selectedValue={selectedProvince}
//                         onValueChange={handleProvinceChange}
//                         style={styles.picker}
//                     >
//                         <Picker.Item label="Chọn tỉnh/thành" value="" />
//                         {provinces.map((province) => (
//                             <Picker.Item
//                                 key={province.ProvinceID}
//                                 label={province.ProvinceName}
//                                 value={province.ProvinceName}
//                             />
//                         ))}
//                     </Picker>
//                     <Picker
//                         selectedValue={selectedDistrict}
//                         onValueChange={(value) => {
//                             const district = districts.find(d => d.DistrictID === value);
//                             if (district) handleDistrictChange(district);
//                         }}
//                         style={styles.picker}
//                         enabled={districts.length > 0}
//                     >
//                         <Picker.Item label="Chọn quận/huyện" value="" />
//                         {districts.map((district) => (
//                             <Picker.Item
//                                 key={district.DistrictID}
//                                 label={district.DistrictName}
//                                 value={district.DistrictID}
//                             />
//                         ))}
//                     </Picker>
//                     <Picker
//                         selectedValue={selectedWard}
//                         onValueChange={(value) => {
//                             const ward = wards.find(w => w.WardCode === value);
//                             if (ward) handleWardChange(ward);
//                         }}
//                         style={styles.picker}
//                         enabled={wards.length > 0}
//                     >
//                         <Picker.Item label="Chọn phường/xã" value="" />
//                         {wards.map((ward) => (
//                             <Picker.Item
//                                 key={ward.WardCode}
//                                 label={ward.WardName}
//                                 value={ward.WardCode}
//                             />
//                         ))}
//                     </Picker>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Địa chỉ chi tiết (số nhà, đường)"
//                         value={newAddress.addressDetail}
//                         onChangeText={(text) => setNewAddress({ ...newAddress, addressDetail: text })}
//                     />
//                     <View style={styles.modalButtons}>
//                         <TouchableOpacity
//                             style={styles.cancelButton}
//                             onPress={() => setShowAddAddress(false)}
//                         >
//                             <Text style={styles.cancelButtonText}>Hủy</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.saveButton}
//                             onPress={handleAddAddress}
//                         >
//                             <Text style={styles.saveButtonText}>Lưu</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { padding: 16 },
//     title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
//     addressItem: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 8 },
//     selectedAddress: { borderColor: '#007AFF', backgroundColor: '#E6F0FA' },
//     addButton: { padding: 12, backgroundColor: '#007AFF', borderRadius: 8, alignItems: 'center' },
//     addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//     modalContainer: { flex: 1, padding: 16, backgroundColor: '#fff' },
//     modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
//     input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
//     picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
//     modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
//     cancelButton: { padding: 12, backgroundColor: '#ccc', borderRadius: 8 },
//     cancelButtonText: { color: '#fff', fontWeight: 'bold' },
//     saveButton: { padding: 12, backgroundColor: '#007AFF', borderRadius: 8 },
//     saveButtonText: { color: '#fff', fontWeight: 'bold' },
// });

// export default ShippingAddressSection;