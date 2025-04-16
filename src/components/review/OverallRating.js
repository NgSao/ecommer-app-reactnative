import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const OverallRating = ({ reviewStats, renderRatingStars, calculateRatingPercentage }) => (
    <View style={styles.overallRating}>
        <View style={styles.overallRatingLeft}>
            <Text style={styles.overallRatingScore}>{reviewStats.average.toFixed(1)}</Text>
            <View style={styles.ratingStarsLarge}>{renderRatingStars(Math.round(reviewStats?.average || 0))}</View>
            <Text style={styles.totalReviews}>{reviewStats.total} đánh giá</Text>
        </View>
        <View style={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((rating) => (
                <View key={rating} style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>{rating} sao</Text>
                    <View style={styles.ratingBarBackground}>
                        <View style={[styles.ratingBarFill, { width: `${calculateRatingPercentage(rating)}%` }]} />
                    </View>
                    <Text style={styles.ratingBarCount}>{reviewStats.distribution[rating]}</Text>
                </View>
            ))}
        </View>
    </View>
)

const styles = StyleSheet.create({
    overallRating: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 15,
    },
    overallRatingLeft: {
        alignItems: "center",
        width: "30%",
        borderRightWidth: 1,
        borderRightColor: "#eee",
        paddingRight: 10,
    },
    overallRatingScore: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#e30019",
    },
    ratingStarsLarge: {
        flexDirection: "row",
        marginVertical: 5,
    },
    totalReviews: {
        color: "#666",
        fontSize: 12,
    },
    ratingBars: {
        flex: 1,
        paddingLeft: 15,
    },
    ratingBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    ratingBarLabel: {
        width: 40,
        fontSize: 12,
        color: "#666",
    },
    ratingBarBackground: {
        flex: 1,
        height: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginHorizontal: 5,
    },
    ratingBarFill: {
        height: 8,
        backgroundColor: "#FFD700",
        borderRadius: 4,
    },
    ratingBarCount: {
        width: 30,
        fontSize: 12,
        color: "#666",
        textAlign: "right",
    },
})

export default OverallRating