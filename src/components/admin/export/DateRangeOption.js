import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const DateRangeOption = ({ dateRange, setDateRange }) => {
    const options = [
        { id: "today", title: "Hôm nay" },
        { id: "week", title: "Tuần này" },
        { id: "month", title: "Tháng này" },
        { id: "quarter", title: "Quý này" },
        { id: "year", title: "Năm nay" },
        { id: "custom", title: "Tùy chỉnh" },
    ]

    return (
        <View style={styles.dateRangeContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={[styles.dateRangeOption, dateRange === option.id && styles.selectedDateRangeOption]}
                    onPress={() => setDateRange(option.id)}
                >
                    <Text style={[styles.dateRangeText, dateRange === option.id && styles.selectedDateRangeText]}>
                        {option.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    dateRangeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    dateRangeOption: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#eee",
    },
    selectedDateRangeOption: {
        backgroundColor: "#e30019",
        borderColor: "#e30019",
    },
    dateRangeText: {
        fontSize: 14,
        color: "#333",
    },
    selectedDateRangeText: {
        color: "#fff",
        fontWeight: "500",
    },
})

export default DateRangeOption