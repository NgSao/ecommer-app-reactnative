import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";

const Specifications = ({ specifications }) => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    }
    const specificationArray = specifications
        ? specifications
            .split(/\.\s*/)
            .map(item => {
                const [label, ...rest] = item.split(":");
                return label && rest.length > 0
                    ? {
                        label: label.trim(),
                        value: rest.join(":").trim(),
                    }
                    : null;
            })
            .filter(Boolean)
        : [];

    if (specificationArray.length === 0) return null;


    return (
        <View style={styles.specificationsContainer}>
            <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>

            {(showAll ? specificationArray : specificationArray.slice(0, 5)).map((spec, index) => (
                <View key={index} style={styles.specRow}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                </View>
            ))}

            {specificationArray.length > 5 && (
                <TouchableOpacity style={styles.viewMoreButton} onPress={toggleShowAll}>
                    <Text style={styles.viewMoreText}>
                        {showAll ? "Ẩn bớt thông số" : "Xem thêm thông số"}
                    </Text>
                    <Ionicons name={showAll ? "chevron-up" : "chevron-down"} size={16} color="#e30019" />
                </TouchableOpacity>
            )}
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
