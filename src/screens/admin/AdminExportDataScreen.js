import { View, TouchableOpacity, ScrollView, ActivityIndicator, Modal, FlatList, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminExportDataStyles"
import useExportData from "@hooks/useExportData"
import AdminHeader from "@components/admin/AdminHeader"
import ExportTypeOption from "@components/admin/export/ExportTypeOption"
import DateRangeOption from './../../components/admin/export/DateRangeOption';
import CustomDatePicker from './../../components/admin/export/CustomDatePicker';
import FormatOption from "@components/admin/export/FormatOption"

const AdminExportDataScreen = () => {
    const {
        loading,
        exportType,
        setExportType,
        dateRange,
        setDateRange,
        exportFormat,
        setExportFormat,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        showStartDatePicker,
        setShowStartDatePicker,
        showEndDatePicker,
        setShowEndDatePicker,
        previewData,
        previewModalVisible,
        setPreviewModalVisible,
        exportReport,
        previewReport,
    } = useExportData()

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