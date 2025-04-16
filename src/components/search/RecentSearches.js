import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const RecentSearches = ({ recentSearches, useRecentSearch, clearRecentSearches }) => {
    const renderRecentSearchItem = ({ item }) => (
        <TouchableOpacity style={styles.recentSearchItem} onPress={() => useRecentSearch(item)}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.recentSearchText}>{item}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.recentSearchesContainer}>
            <View style={styles.recentSearchesHeader}>
                <Text style={styles.recentSearchesTitle}>Tìm kiếm gần đây</Text>
                {recentSearches.length > 0 && (
                    <TouchableOpacity onPress={clearRecentSearches}>
                        <Text style={styles.clearRecentText}>Xóa tất cả</Text>
                    </TouchableOpacity>
                )}
            </View>
            {recentSearches.length > 0 ? (
                <FlatList
                    data={recentSearches}
                    renderItem={renderRecentSearchItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.noRecentSearchesText}>Không có tìm kiếm gần đây</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    recentSearchesContainer: {
        flex: 1,
        padding: 15,
    },
    recentSearchesHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    recentSearchesTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    clearRecentText: {
        color: "#e30019",
        fontSize: 14,
    },
    recentSearchItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    recentSearchText: {
        marginLeft: 10,
        fontSize: 14,
    },
    noRecentSearchesText: {
        color: "#999",
        textAlign: "center",
        marginVertical: 20,
    },
})

export default RecentSearches