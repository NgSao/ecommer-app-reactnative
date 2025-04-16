import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const popularSearches = [
    { id: "1", query: "iPhone 16" },
    { id: "2", query: "MacBook M4" },
    { id: "3", query: "Apple Watch" },
    { id: "4", query: "AirPods Pro" },
    { id: "5", query: "Samsung Galaxy" },
]
const PopularSearches = ({ useRecentSearch }) => (
    <View style={styles.popularSearchesContainer}>
        <Text style={styles.popularSearchesTitle}>Tìm kiếm phổ biến</Text>
        <View style={styles.popularSearchTags}>
            {popularSearches.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.popularSearchTag}
                    onPress={() => useRecentSearch(item.query)}
                >
                    <Text style={styles.popularSearchTagText}>{item.query}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
)

const styles = StyleSheet.create({
    popularSearchesContainer: {
        marginTop: 20,
    },
    popularSearchesTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    popularSearchTags: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    popularSearchTag: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 5,
        borderWidth: 1,
        borderColor: "#eee",
    },
    popularSearchTagText: {
        fontSize: 14,
    },
})

export default PopularSearches