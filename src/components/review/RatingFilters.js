import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const RatingFilters = ({ ratingFilter, setRatingFilter, reviewStats }) => (
    <View style={styles.ratingFilters}>
        <TouchableOpacity
            style={[styles.ratingFilterButton, ratingFilter === 0 && styles.activeRatingFilter]}
            onPress={() => setRatingFilter(0)}
        >
            <Text style={styles.ratingFilterText}>Tất cả ({reviewStats.total})</Text>
        </TouchableOpacity>
        {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
                key={rating}
                style={[styles.ratingFilterButton, ratingFilter === rating && styles.activeRatingFilter]}
                onPress={() => setRatingFilter(rating)}
            >
                <Text style={styles.ratingFilterText}>
                    {rating} ⭐ ({reviewStats.distribution[rating]})
                </Text>
            </TouchableOpacity>
        ))}
    </View>
)

const styles = StyleSheet.create({
    ratingFilters: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    ratingFilterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        marginRight: 8,
        marginBottom: 8,
    },
    activeRatingFilter: {
        backgroundColor: "#FFE9A0",
    },
    ratingFilterText: {
        fontSize: 13,
    },
})

export default RatingFilters