import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

const FilterBar = ({ ratingFilter, setRatingFilter, statusFilter, setStatusFilter }) => {
    return (
        <View style={styles.filterContainer}>
            {/* Lọc theo đánh giá sao */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, ratingFilter === 0 && styles.activeFilterButton]}
                    onPress={() => setRatingFilter(0)}                >
                    <Text style={[styles.filterButtonText, ratingFilter === 0 && styles.activeFilterButtonText]}>
                        Tất cả sao
                    </Text>
                </TouchableOpacity>

                {[5, 4, 3, 2, 1].map((rating) => (
                    <TouchableOpacity
                        key={`rating-${rating}`}
                        style={[styles.filterButton, ratingFilter === rating && styles.activeFilterButton]}
                        onPress={() => setRatingFilter(rating)}
                    >
                        <Text style={[styles.filterButtonText, ratingFilter === rating && styles.activeFilterButtonText]}>
                            {rating} sao
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Lọc theo trạng thái phản hồi */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                {["all", "replied", "not_replied"].map((status) => (
                    <TouchableOpacity
                        key={`status-${status}`}
                        style={[styles.filterButton, statusFilter === status && styles.activeFilterButton]}
                        onPress={() => setStatusFilter(status)}
                    >
                        <Text style={[styles.filterButtonText, statusFilter === status && styles.activeFilterButtonText]}>
                            {status === "all" ? "Tất cả trạng thái" : status === "replied" ? "Đã phản hồi" : "Chưa phản hồi"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
        marginTop: 10
    },
    scrollContainer: {
        marginBottom: 8,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 80,
    },
    activeFilterButton: {
        backgroundColor: "#e30019",
    },
    filterButtonText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    activeFilterButtonText: {
        color: "#fff",
        fontWeight: "600", // Giảm độ đậm để tránh ảnh hưởng kích thước
    },
});

export default FilterBar;