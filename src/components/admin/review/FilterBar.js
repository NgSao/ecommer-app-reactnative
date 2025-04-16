import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native"

const FilterBar = ({ ratingFilter, setRatingFilter, statusFilter, setStatusFilter }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {/* Lọc theo đánh giá sao */}
            <TouchableOpacity
                style={[styles.filterButton, ratingFilter === 0 && styles.activeFilterButton]}
                onPress={() => setRatingFilter(0)}
            >
                <Text style={[styles.filterButtonText, ratingFilter === 0 && styles.activeFilterButtonText]}>Tất cả sao</Text>
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

            {/* Lọc theo trạng thái phản hồi */}
            <TouchableOpacity
                style={[styles.filterButton, statusFilter === "all" && styles.activeFilterButton]}
                onPress={() => setStatusFilter("all")}
            >
                <Text style={[styles.filterButtonText, statusFilter === "all" && styles.activeFilterButtonText]}>
                    Tất cả trạng thái
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.filterButton, statusFilter === "replied" && styles.activeFilterButton]}
                onPress={() => setStatusFilter("replied")}
            >
                <Text style={[styles.filterButtonText, statusFilter === "replied" && styles.activeFilterButtonText]}>
                    Đã phản hồi
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.filterButton, statusFilter === "not_replied" && styles.activeFilterButton]}
                onPress={() => setStatusFilter("not_replied")}
            >
                <Text style={[styles.filterButtonText, statusFilter === "not_replied" && styles.activeFilterButtonText]}>
                    Chưa phản hồi
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    filterButton: {
        paddingVertical: 6,
        paddingBottom: 20,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
        marginRight: 8,

    },
    activeFilterButton: {
        backgroundColor: "#e30019",
    },
    filterButtonText: {
        fontSize: 14,
        color: "#666",
        paddingVertical: 12
    },
    activeFilterButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default FilterBar