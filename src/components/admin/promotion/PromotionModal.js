// import {
//     Modal,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator,
//     ScrollView,
//     Switch,
//     StyleSheet,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import DateTimePicker from "@react-native-community/datetimepicker"
// import { formatDate } from '@utils/formatUtils';

// const PromotionModal = ({
//     visible,
//     onClose,
//     editingPromotion,
//     promotionName,
//     setPromotionName,
//     promotionCode,
//     setPromotionCode,
//     discountType,
//     setDiscountType,
//     discountValue,
//     setDiscountValue,
//     minOrderValue,
//     setMinOrderValue,
//     maxDiscount,
//     setMaxDiscount,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     isActive,
//     setIsActive,
//     usageLimit,
//     setUsageLimit,
//     showStartDatePicker,
//     setShowStartDatePicker,
//     showEndDatePicker,
//     setShowEndDatePicker,
//     savePromotion,
//     savingPromotion,
// }) => {
//     return (
//         <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <ScrollView>
//                         <View style={styles.modalHeader}>
//                             <Text style={styles.modalTitle}>
//                                 {editingPromotion ? "Sửa khuyến mãi" : "Thêm khuyến mãi mới"}
//                             </Text>
//                             <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                                 <Ionicons name="close" size={24} color="#333" />
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Tên khuyến mãi</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nhập tên khuyến mãi"
//                                 value={promotionName}
//                                 onChangeText={setPromotionName}
//                             />
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Mã khuyến mãi</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nhập mã khuyến mãi (VD: SUMMER2023)"
//                                 value={promotionCode}
//                                 onChangeText={setPromotionCode}
//                                 autoCapitalize="characters"
//                             />
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Loại giảm giá</Text>
//                             <View style={styles.radioGroup}>
//                                 <TouchableOpacity style={styles.radioOption} onPress={() => setDiscountType("percentage")}>
//                                     <View style={[styles.radioButton, discountType === "percentage" && styles.radioButtonSelected]}>
//                                         {discountType === "percentage" && <View style={styles.radioButtonInner} />}
//                                     </View>
//                                     <Text style={styles.radioLabel}>Phần trăm (%)</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.radioOption} onPress={() => setDiscountType("fixed")}>
//                                     <View style={[styles.radioButton, discountType === "fixed" && styles.radioButtonSelected]}>
//                                         {discountType === "fixed" && <View style={styles.radioButtonInner} />}
//                                     </View>
//                                     <Text style={styles.radioLabel}>Số tiền cố định</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Giá trị giảm giá {discountType === "percentage" ? "(%)" : "(VNĐ)"}</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder={`Nhập giá trị ${discountType === "percentage" ? "phần trăm" : "tiền"}`}
//                                 value={discountValue}
//                                 onChangeText={setDiscountValue}
//                                 keyboardType="numeric"
//                             />
//                         </View>

//                         {discountType === "percentage" && (
//                             <View style={styles.formGroup}>
//                                 <Text style={styles.label}>Giảm tối đa (VNĐ, để trống nếu không giới hạn)</Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Nhập số tiền giảm tối đa"
//                                     value={maxDiscount}
//                                     onChangeText={setMaxDiscount}
//                                     keyboardType="numeric"
//                                 />
//                             </View>
//                         )}

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Giá trị đơn hàng tối thiểu (VNĐ, 0 = không giới hạn)</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nhập giá trị đơn hàng tối thiểu"
//                                 value={minOrderValue}
//                                 onChangeText={setMinOrderValue}
//                                 keyboardType="numeric"
//                             />
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Ngày bắt đầu</Text>
//                             <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartDatePicker(true)}>
//                                 <Text>{formatDate(startDate)}</Text>
//                                 <Ionicons name="calendar-outline" size={20} color="#666" />
//                             </TouchableOpacity>
//                             {showStartDatePicker && (
//                                 <DateTimePicker
//                                     value={startDate}
//                                     mode="date"
//                                     display="default"
//                                     onChange={(event, selectedDate) => {
//                                         setShowStartDatePicker(false)
//                                         if (selectedDate) {
//                                             setStartDate(selectedDate)
//                                         }
//                                     }}
//                                 />
//                             )}
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Ngày kết thúc</Text>
//                             <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndDatePicker(true)}>
//                                 <Text>{formatDate(endDate)}</Text>
//                                 <Ionicons name="calendar-outline" size={20} color="#666" />
//                             </TouchableOpacity>
//                             {showEndDatePicker && (
//                                 <DateTimePicker
//                                     value={endDate}
//                                     mode="date"
//                                     display="default"
//                                     onChange={(event, selectedDate) => {
//                                         setShowEndDatePicker(false)
//                                         if (selectedDate) {
//                                             setEndDate(selectedDate)
//                                         }
//                                     }}
//                                 />
//                             )}
//                         </View>

//                         <View style={styles.formGroup}>
//                             <Text style={styles.label}>Giới hạn sử dụng (để trống nếu không giới hạn)</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nhập số lần sử dụng tối đa"
//                                 value={usageLimit}
//                                 onChangeText={setUsageLimit}
//                                 keyboardType="numeric"
//                             />
//                         </View>

//                         <View style={[styles.formGroup, styles.switchContainer]}>
//                             <Text style={styles.label}>Trạng thái</Text>
//                             <View style={styles.switchRow}>
//                                 <Text style={styles.switchLabel}>{isActive ? "Hoạt động" : "Không hoạt động"}</Text>
//                                 <Switch
//                                     value={isActive}
//                                     onValueChange={setIsActive}
//                                     trackColor={{ false: "#ccc", true: "#e30019" }}
//                                     thumbColor="#fff"
//                                 />
//                             </View>
//                         </View>

//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//                                 <Text style={styles.cancelButtonText}>Hủy</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.saveButton, savingPromotion && styles.disabledButton]}
//                                 onPress={savePromotion}
//                                 disabled={savingPromotion}
//                             >
//                                 {savingPromotion ? (
//                                     <ActivityIndicator size="small" color="#fff" />
//                                 ) : (
//                                     <Text style={styles.saveButtonText}>Lưu</Text>
//                                 )}
//                             </TouchableOpacity>
//                         </View>
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     )
// }

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         padding: 20,
//     },
//     modalContent: {
//         backgroundColor: "#fff",
//         borderRadius: 10,
//         padding: 20,
//         maxHeight: "90%",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     closeButton: {
//         padding: 5,
//     },
//     formGroup: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         color: "#333",
//         marginBottom: 8,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         fontSize: 16,
//     },
//     radioGroup: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     radioOption: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginRight: 20,
//     },
//     radioButton: {
//         height: 20,
//         width: 20,
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: "#e30019",
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 8,
//     },
//     radioButtonSelected: {
//         borderColor: "#e30019",
//     },
//     radioButtonInner: {
//         height: 10,
//         width: 10,
//         borderRadius: 5,
//         backgroundColor: "#e30019",
//     },
//     radioLabel: {
//         fontSize: 16,
//         color: "#333",
//     },
//     dateInput: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         paddingVertical: 12,
//     },
//     switchContainer: {
//         marginBottom: 30,
//     },
//     switchRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//     },
//     switchLabel: {
//         fontSize: 16,
//         color: "#333",
//     },
//     buttonContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 10,
//     },
//     cancelButton: {
//         flex: 1,
//         backgroundColor: "#f0f0f0",
//         paddingVertical: 12,
//         borderRadius: 8,
//         marginRight: 10,
//         alignItems: "center",
//     },
//     cancelButtonText: {
//         fontSize: 16,
//         color: "#333",
//         fontWeight: "bold",
//     },
//     saveButton: {
//         flex: 1,
//         backgroundColor: "#e30019",
//         paddingVertical: 12,
//         borderRadius: 8,
//         alignItems: "center",
//     },
//     saveButtonText: {
//         fontSize: 16,
//         color: "#fff",
//         fontWeight: "bold",
//     },
//     disabledButton: {
//         opacity: 0.7,
//     },
// })

// export default PromotionModal
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Switch,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from '@utils/formatUtils';

const PromotionModal = ({
    visible,
    onClose,
    editingPromotion,
    promotionName,
    setPromotionName,
    promotionCode,
    setPromotionCode,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    minOrderValue,
    setMinOrderValue,
    maxDiscount,
    setMaxDiscount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
    usageLimit,
    setUsageLimit,
    showStartDatePicker,
    setShowStartDatePicker,
    showEndDatePicker,
    setShowEndDatePicker,
    savePromotion,
    savingPromotion,
    associatedProductId,
    setAssociatedProductId,
}) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingPromotion ? "Sửa khuyến mãi" : "Thêm khuyến mãi mới"}
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tên khuyến mãi</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên khuyến mãi"
                                value={promotionName}
                                onChangeText={setPromotionName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Mã khuyến mãi</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mã khuyến mãi (VD: SUMMER2023)"
                                value={promotionCode}
                                onChangeText={setPromotionCode}
                                autoCapitalize="characters"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Loại giảm giá</Text>
                            <View style={styles.radioGroup}>
                                <TouchableOpacity style={styles.radioOption} onPress={() => setDiscountType("percentage")}>
                                    <View style={[styles.radioButton, discountType === "percentage" && styles.radioButtonSelected]}>
                                        {discountType === "percentage" && <View style={styles.radioButtonInner} />}
                                    </View>
                                    <Text style={styles.radioLabel}>Phần trăm (%)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.radioOption} onPress={() => setDiscountType("fixed")}>
                                    <View style={[styles.radioButton, discountType === "fixed" && styles.radioButtonSelected]}>
                                        {discountType === "fixed" && <View style={styles.radioButtonInner} />}
                                    </View>
                                    <Text style={styles.radioLabel}>Số tiền cố định</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Giá trị giảm giá {discountType === "percentage" ? "(%)" : "(VNĐ)"}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Nhập giá trị ${discountType === "percentage" ? "phần trăm" : "tiền"}`}
                                value={discountValue}
                                onChangeText={setDiscountValue}
                                keyboardType="numeric"
                            />
                        </View>

                        {discountType === "percentage" && (
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Giảm tối đa (VNĐ, để trống nếu không giới hạn)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số tiền giảm tối đa"
                                    value={maxDiscount}
                                    onChangeText={setMaxDiscount}
                                    keyboardType="numeric"
                                />
                            </View>
                        )}

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Giá trị đơn hàng tối thiểu (VNĐ, 0 = không giới hạn)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập giá trị đơn hàng tối thiểu"
                                value={minOrderValue}
                                onChangeText={setMinOrderValue}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>ID sản phẩm (tùy chọn)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập ID sản phẩm để gán khuyến mãi"
                                value={associatedProductId ? associatedProductId.toString() : ""}
                                onChangeText={(text) => setAssociatedProductId(text ? Number(text) : null)}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Ngày bắt đầu</Text>
                            <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartDatePicker(true)}>
                                <Text>{formatDate(startDate)}</Text>
                                <Ionicons name="calendar-outline" size={20} color="#666" />
                            </TouchableOpacity>
                            {showStartDatePicker && (
                                <DateTimePicker
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowStartDatePicker(false);
                                        if (selectedDate) {
                                            setStartDate(selectedDate);
                                        }
                                    }}
                                />
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Ngày kết thúc</Text>
                            <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndDatePicker(true)}>
                                <Text>{formatDate(endDate)}</Text>
                                <Ionicons name="calendar-outline" size={20} color="#666" />
                            </TouchableOpacity>
                            {showEndDatePicker && (
                                <DateTimePicker
                                    value={endDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowEndDatePicker(false);
                                        if (selectedDate) {
                                            setEndDate(selectedDate);
                                        }
                                    }}
                                />
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Giới hạn sử dụng (để trống nếu không giới hạn)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập số lần sử dụng tối đa"
                                value={usageLimit}
                                onChangeText={setUsageLimit}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={[styles.formGroup, styles.switchContainer]}>
                            <Text style={styles.label}>Trạng thái</Text>
                            <View style={styles.switchRow}>

                                <Text style={styles.switchLabel}>{isActive ? "Hoạt động" : "Không hoạt động"}</Text>
                                <Switch
                                    value={isActive}
                                    onValueChange={setIsActive}
                                    trackColor={{ false: "#ccc", true: "#e30019" }}
                                    thumbColor="#fff"
                                />
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveButton, savingPromotion && styles.disabledButton]}
                                onPress={savePromotion}
                                disabled={savingPromotion}
                            >
                                {savingPromotion ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Lưu</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#e30019",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    radioButtonSelected: {
        borderColor: "#e30019",
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#e30019",
    },
    radioLabel: {
        fontSize: 16,
        color: "#333",
    },
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    switchContainer: {
        marginBottom: 30,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    switchLabel: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#e30019",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        opacity: 0.7,
    },
});

export default PromotionModal;