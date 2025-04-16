import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";

const Description = ({ description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    }

    const truncatedDescription = description && description.length > 100
        ? description.substring(0, 200) + "..."
        : description;

    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
            <Text style={styles.descriptionText}>
                {showFullDescription ? description : truncatedDescription}
            </Text>
            <TouchableOpacity style={styles.viewMoreButton} onPress={toggleDescription}>
                <Text style={styles.viewMoreText}>
                    {showFullDescription ? "Ẩn mô tả" : "Xem thêm mô tả"}
                </Text>
                <Ionicons name={showFullDescription ? "chevron-up" : "chevron-down"} size={16} color="#e30019" />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    descriptionContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    descriptionText: {
        lineHeight: 22,
        color: "#333",
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

export default Description