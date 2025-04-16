import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";

const Specifications = ({ specifications }) => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    }

    return (
        <View style={styles.specificationsContainer}>
            <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>

            {specifications && specifications.length > 0 ? (
                // Hiển thị danh sách thông số, nếu showAll là false, chỉ hiển thị 5 thông số đầu tiên
                (showAll ? specifications : specifications.slice(0, 5)).map((spec, index) => (
                    <View key={index} style={styles.specRow}>
                        <Text style={styles.specLabel}>{spec.label}</Text>
                        <Text style={styles.specValue}>{spec.value}</Text>
                    </View>
                ))
            ) : (
                // Nếu không có thông số từ props, hiển thị thông số mặc định
                <>

                </>
            )}

            <TouchableOpacity style={styles.viewMoreButton} onPress={toggleShowAll}>
                <Text style={styles.viewMoreText}>
                    {showAll ? "Ẩn bớt thông số" : "Xem thêm thông số"}
                </Text>
                <Ionicons name={showAll ? "chevron-up" : "chevron-down"} size={16} color="#e30019" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    specificationsContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    specRow: {
        flexDirection: "row",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    specLabel: {
        width: "30%",
        color: "#666",
    },
    specValue: {
        width: "70%",
        fontWeight: "500",
    },
    viewMoreButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    viewMoreText: {
        color: "#e30019",
        marginRight: 5,
    },
})

export default Specifications;
