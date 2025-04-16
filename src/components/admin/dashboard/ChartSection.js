import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import { LineChart, BarChart, PieChart } from "react-native-chart-kit"
import { Ionicons } from "@expo/vector-icons"

const screenWidth = Dimensions.get("window").width - 30

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(227, 0, 25, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
}

const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(0, 100, 200, ${opacity})`,
}

const ChartSection = ({ revenueData, categoryData, orderStatusData, onExport, onViewRevenueReport, onViewCategoryReport, onViewOrders }) => (
    <>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Thống kê chi tiết</Text>
            <TouchableOpacity style={styles.exportButton} onPress={onExport}>
                <Ionicons name="download-outline" size={20} color="#fff" />
                <Text style={styles.exportButtonText}>Xuất báo cáo</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Doanh thu 6 tháng gần nhất</Text>
                <TouchableOpacity onPress={onViewRevenueReport}>
                    <Text style={styles.viewMoreText}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <LineChart
                data={revenueData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />
        </View>
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Doanh thu theo danh mục</Text>
                <TouchableOpacity onPress={onViewCategoryReport}>
                    <Text style={styles.viewMoreText}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <PieChart
                data={categoryData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="data"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trạng thái đơn hàng</Text>
                <TouchableOpacity onPress={onViewOrders}>
                    <Text style={styles.viewMoreText}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <BarChart
                data={orderStatusData}
                width={screenWidth}
                height={220}
                chartConfig={barChartConfig}
                style={styles.chart}
                verticalLabelRotation={0}
            />
        </View>
    </>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    exportButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e30019",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    exportButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontWeight: "600",
    },
    sectionContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    viewMoreText: {
        fontSize: 14,
        color: "#e30019",
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
    },
})

export default ChartSection