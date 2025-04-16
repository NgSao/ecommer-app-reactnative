import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"

const CustomDatePicker = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showStartDatePicker,
    setShowStartDatePicker,
    showEndDatePicker,
    setShowEndDatePicker,
}) => {
    const formatDate = (date) => {
        if (!date) return "Chọn ngày"
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    return (
        <View style={styles.customDateContainer}>
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowStartDatePicker(true)}
            >
                <Ionicons name="calendar-outline" size={20} color="#333" />
                <Text style={styles.datePickerText}>
                    Từ: {formatDate(startDate)}
                </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowStartDatePicker(false)
                        if (selectedDate) {
                            setStartDate(selectedDate)
                        }
                    }}
                />
            )}

            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowEndDatePicker(true)}
            >
                <Ionicons name="calendar-outline" size={20} color="#333" />
                <Text style={styles.datePickerText}>
                    Đến: {formatDate(endDate)}
                </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowEndDatePicker(false)
                        if (selectedDate) {
                            setEndDate(selectedDate)
                        }
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    customDateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    datePickerButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#eee",
    },
    datePickerText: {
        fontSize: 14,
        color: "#333",
        marginLeft: 10,
    },
})

export default CustomDatePicker