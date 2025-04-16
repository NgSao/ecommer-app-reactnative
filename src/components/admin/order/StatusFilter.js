import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native"

const StatusFilter = ({ statusOptions, statusFilter, setStatusFilter, getStatusColor }) => {
    return (
        <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {statusOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.filterButton,
                            statusFilter === option.id && { backgroundColor: getStatusColor(option.id) || "#e30019" },
                        ]}
                        onPress={() => setStatusFilter(option.id)}
                    >
                        <Text style={[styles.filterButtonText, statusFilter === option.id && { color: "#fff" }]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 5,
    },
    filterButtonText: {
        fontSize: 14,
        color: "#333",
    },
})

export default StatusFilter