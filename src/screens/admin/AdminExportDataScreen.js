import { View, TouchableOpacity, ScrollView, ActivityIndicator, Modal, FlatList, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminExportDataStyles"
import AdminHeader from "@components/admin/AdminHeader"
import ExportTypeOption from "@components/admin/export/ExportTypeOption"
import DateRangeOption from './../../components/admin/export/DateRangeOption';
import CustomDatePicker from './../../components/admin/export/CustomDatePicker';
import FormatOption from "@components/admin/export/FormatOption"
import { useState } from "react"
import { Alert, Platform, PermissionsAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import * as Print from "expo-print"
const AdminExportDataScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [exportType, setExportType] = useState("")
    const [dateRange, setDateRange] = useState("month")
    const [exportFormat, setExportFormat] = useState("pdf")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [previewData, setPreviewData] = useState(null)
    const [previewModalVisible, setPreviewModalVisible] = useState(false)

    // Dữ liệu mẫu cho các loại báo cáo
    const generateMockData = () => {
        const now = new Date()
        const mockData = {
            sales: [
                { id: 1, date: now.toISOString(), amount: 1500000, customer: "Nguyen Van A", orderId: "ORD001" },
                { id: 2, date: now.toISOString(), amount: 2300000, customer: "Tran Thi B", orderId: "ORD002" },
            ],
            inventory: [
                { id: 1, product: "iPhone 14", stock: 50, lastUpdated: now.toISOString() },
                { id: 2, product: "Samsung S23", stock: 30, lastUpdated: now.toISOString() },
            ],
            customers: [
                { id: 1, name: "Nguyen Van A", email: "nva@example.com", totalOrders: 5 },
                { id: 2, name: "Tran Thi B", email: "ttb@example.com", totalOrders: 3 },
            ],
            orders: [
                { id: 1, orderId: "ORD001", date: now.toISOString(), total: 1500000, status: "Delivered" },
                { id: 2, orderId: "ORD002", date: now.toISOString(), total: 2300000, status: "Pending" },
            ],
            products: [
                { id: 1, name: "iPhone 14", price: 20000000, category: "Phone" },
                { id: 2, name: "Samsung S23", price: 18000000, category: "Phone" },
            ],
        }

        // Lọc dữ liệu theo dateRange
        const filteredData = mockData[exportType] || []
        if (dateRange === "custom" && startDate && endDate) {
            return filteredData.filter((item) => {
                const itemDate = new Date(item.date || item.lastUpdated)
                return itemDate >= startDate && itemDate <= endDate
            })
        } else if (dateRange !== "all") {
            // Giả lập lọc theo khoảng thời gian (today, week, month, v.v.)
            const timeRanges = {
                today: 1,
                week: 7,
                month: 30,
                quarter: 90,
                year: 365,
            }
            const days = timeRanges[dateRange] || 0
            const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
            return filteredData.filter((item) => {
                const itemDate = new Date(item.date || item.lastUpdated)
                return itemDate >= cutoffDate
            })
        }
        return filteredData
    }

    const checkPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Quyền truy cập bộ nhớ",
                        message: "Ứng dụng cần quyền truy cập bộ nhớ để lưu báo cáo.",
                        buttonNeutral: "Hỏi lại sau",
                        buttonNegative: "Hủy",
                        buttonPositive: "Đồng ý",
                    }
                )
                return granted === PermissionsAndroid.RESULTS.GRANTED
            } catch (err) {
                console.warn(err)
                return false
            }
        }
        return true
    }

    const previewReport = () => {
        if (!exportType) {
            Alert.alert("Thông báo", "Vui lòng chọn loại báo cáo")
            return
        }

        if (dateRange === "custom" && (!startDate || !endDate)) {
            Alert.alert("Thông báo", "Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc")
            return
        }

        if (dateRange === "custom" && startDate && endDate && startDate > endDate) {
            Alert.alert("Thông báo", "Ngày bắt đầu không thể lớn hơn ngày kết thúc")
            return
        }

        setLoading(true)
        try {
            const data = generateMockData()
            setPreviewData(data)
            setPreviewModalVisible(true)
        } catch (error) {
            console.error("Error previewing report:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải dữ liệu xem trước")
        } finally {
            setLoading(false)
        }
    }

    const exportReport = async () => {
        if (!exportType) {
            Alert.alert("Thông báo", "Vui lòng chọn loại báo cáo")
            return
        }

        if (dateRange === "custom" && (!startDate || !endDate)) {
            Alert.alert("Thông báo", "Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc")
            return
        }

        if (dateRange === "custom" && startDate && endDate && startDate > endDate) {
            Alert.alert("Thông báo", "Ngày bắt đầu không thể lớn hơn ngày kết thúc")
            return
        }

        const hasPermission = await checkPermission()
        if (!hasPermission) {
            Alert.alert("Thông báo", "Cần quyền truy cập bộ nhớ để xuất báo cáo")
            return
        }

        setLoading(true)
        try {
            const data = generateMockData()
            const date = new Date()
            const timestamp = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
            const fileName = `${exportType}_${timestamp}.${exportFormat}`
            const fileUri = `${FileSystem.documentDirectory}${fileName}`

            if (exportFormat === "pdf") {
                // Tạo HTML cho PDF
                const htmlContent = `
                    <html>
                        <body>
                            <h1>Báo cáo ${exportType}</h1>
                            <table border="1">
                                <thead>
                                    <tr>
                                        ${Object.keys(data[0] || {})
                        .map((key) => `<th>${key}</th>`)
                        .join("")}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data
                        .map(
                            (item) => `
                                        <tr>
                                            ${Object.values(item)
                                    .map((value) => `<td>${value}</td>`)
                                    .join("")}
                                        </tr>
                                    `
                        )
                        .join("")}
                                </tbody>
                            </table>
                        </body>
                    </html>
                `
                const { uri } = await Print.printToFileAsync({ html: htmlContent })
                await FileSystem.moveAsync({ from: uri, to: fileUri })
            } else if (exportFormat === "xlsx" || exportFormat === "csv") {
                // Tạo nội dung CSV (giả lập Excel)
                const headers = Object.keys(data[0] || {}).join(",")
                const rows = data
                    .map((item) =>
                        Object.values(item)
                            .map((value) => `"${value}"`)
                            .join(",")
                    )
                    .join("\n")
                const csvContent = `${headers}\n${rows}`
                await FileSystem.writeAsStringAsync(fileUri, csvContent, {
                    encoding: FileSystem.EncodingType.UTF8,
                })
            }

            const isAvailable = await Sharing.isAvailableAsync()
            if (isAvailable) {
                await Sharing.shareAsync(fileUri, {
                    mimeType:
                        exportFormat === "pdf"
                            ? "application/pdf"
                            : exportFormat === "xlsx"
                                ? "text/csv"
                                : "text/csv",
                    dialogTitle: "Lưu hoặc chia sẻ báo cáo",
                })
                Alert.alert(
                    "Thành công",
                    `Báo cáo đã được tạo thành công!\nFile được lưu tại: ${fileUri}`
                )
            } else {
                Alert.alert("Thông báo", "Thiết bị không hỗ trợ chia sẻ file")
            }
        } catch (error) {
            console.error("Error exporting report:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xuất báo cáo")
        } finally {
            setLoading(false)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title="Xuất báo cáo" />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chọn loại báo cáo</Text>
                    <ExportTypeOption exportType={exportType} setExportType={setExportType} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Khoảng thời gian</Text>
                    <DateRangeOption dateRange={dateRange} setDateRange={setDateRange} />
                </View>

                {dateRange === "custom" && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tùy chỉnh thời gian</Text>
                        <CustomDatePicker
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            showStartDatePicker={showStartDatePicker}
                            setShowStartDatePicker={setShowStartDatePicker}
                            showEndDatePicker={showEndDatePicker}
                            setShowEndDatePicker={setShowEndDatePicker}
                        />
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Định dạng xuất</Text>
                    <FormatOption exportFormat={exportFormat} setExportFormat={setExportFormat} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.previewButton}
                        onPress={previewReport}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="eye-outline" size={20} color="#fff" />
                                <Text style={styles.previewButtonText}>Xem trước</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.exportButton}
                        onPress={exportReport}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="download-outline" size={20} color="#fff" />
                                <Text style={styles.exportButtonText}>Xuất báo cáo</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal xem trước */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={previewModalVisible}
                onRequestClose={() => setPreviewModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Xem trước báo cáo {exportType}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setPreviewModalVisible(false)}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        {previewData && previewData.length > 0 ? (
                            <FlatList
                                data={previewData}
                                renderItem={({ item }) => (
                                    <View style={styles.previewItem}>
                                        {Object.entries(item).map(([key, value]) => (
                                            <Text key={key} style={styles.previewText}>
                                                {key}: {value}
                                            </Text>
                                        ))}
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                            <Text style={styles.emptyText}>Không có dữ liệu để hiển thị</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default AdminExportDataScreen