
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Mock FAQ data
const faqData = [
    {
        id: "1",
        question: "Làm thế nào để theo dõi đơn hàng của tôi?",
        answer:
            "Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản của mình, sau đó vào mục 'Đơn hàng của tôi'. Tại đây, bạn sẽ thấy trạng thái hiện tại của đơn hàng và thông tin vận chuyển.",
    },
    {
        id: "2",
        question: "Chính sách đổi trả của Minh Tuấn Mobile là gì?",
        answer:
            "Minh Tuấn Mobile cho phép đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và hộp đựng. Đối với sản phẩm lỗi do nhà sản xuất, thời gian đổi trả là 15 ngày.",
    },
    {
        id: "3",
        question: "Làm thế nào để hủy đơn hàng?",
        answer:
            "Bạn có thể hủy đơn hàng trong mục 'Đơn hàng của tôi' nếu đơn hàng chưa được xử lý. Nếu đơn hàng đã được xử lý, vui lòng liên hệ với bộ phận Chăm sóc khách hàng qua số hotline 1800.1234 để được hỗ trợ.",
    },
    {
        id: "4",
        question: "Minh Tuấn Mobile có cung cấp dịch vụ bảo hành không?",
        answer:
            "Có, Minh Tuấn Mobile cung cấp dịch vụ bảo hành chính hãng cho tất cả sản phẩm. Thời gian bảo hành tùy thuộc vào từng loại sản phẩm và hãng sản xuất, thông thường từ 12 đến 24 tháng.",
    },
    {
        id: "5",
        question: "Làm thế nào để tôi có thể thanh toán?",
        answer:
            "Minh Tuấn Mobile chấp nhận nhiều phương thức thanh toán khác nhau bao gồm: thanh toán khi nhận hàng (COD), thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, và các ví điện tử như Momo, ZaloPay, VNPay.",
    },
]

// Mock contact methods
const contactMethods = [
    {
        id: "1",
        title: "Hotline",
        description: "1800.1234 (Miễn phí)",
        icon: "call-outline",
        action: "Gọi ngay",
    },
    {
        id: "2",
        title: "Email",
        description: "support@minhtuanmobile.com",
        icon: "mail-outline",
        action: "Gửi email",
    },
    {
        id: "3",
        title: "Facebook",
        description: "fb.com/minhtuanmobile",
        icon: "logo-facebook",
        action: "Nhắn tin",
    },
    {
        id: "4",
        title: "Zalo",
        description: "zalo.me/minhtuanmobile",
        icon: "chatbubble-outline",
        action: "Chat Zalo",
    },
]

export default function HelpCenterScreen() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedFaq, setExpandedFaq] = useState(null)

    // Filter FAQs based on search query
    const filteredFaqs = searchQuery
        ? faqData.filter(
            (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        : faqData

    // Toggle FAQ expansion
    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id)
    }

    // Render FAQ item
    const renderFaqItem = ({ item }) => (
        <TouchableOpacity style={styles.faqItem} onPress={() => toggleFaq(item.id)}>
            <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>{item.question}</Text>
                <Ionicons name={expandedFaq === item.id ? "chevron-up" : "chevron-down"} size={20} color="#666" />
            </View>

            {expandedFaq === item.id && <Text style={styles.faqAnswer}>{item.answer}</Text>}
        </TouchableOpacity>
    )

    // Render contact method item
    const renderContactMethodItem = ({ item }) => (
        <TouchableOpacity style={styles.contactMethodItem}>
            <View style={styles.contactMethodIcon}>
                <Ionicons name={item.icon} size={24} color="#e30019" />
            </View>
            <View style={styles.contactMethodInfo}>
                <Text style={styles.contactMethodTitle}>{item.title}</Text>
                <Text style={styles.contactMethodDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.contactMethodAction}>
                <Text style={styles.contactMethodActionText}>{item.action}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trung tâm hỗ trợ</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm câu hỏi..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery ? (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    ) : null}
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => renderFaqItem({ item: faq }))
                    ) : (
                        <Text style={styles.noResultsText}>
                            Không tìm thấy câu hỏi phù hợp. Vui lòng thử từ khóa khác hoặc liên hệ với chúng tôi.
                        </Text>
                    )}
                </View>

                {/* Contact Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Liên hệ với chúng tôi</Text>

                    {contactMethods.map((method) => renderContactMethodItem({ item: method }))}
                </View>

                {/* Store Locations */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hệ thống cửa hàng</Text>

                    <TouchableOpacity style={styles.storeLocationsButton} onPress={() => navigation.navigate("StoreLocations")}>
                        <Ionicons name="location-outline" size={20} color="#e30019" />
                        <Text style={styles.storeLocationsText}>Xem danh sách cửa hàng</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    placeholder: {
        width: 34, // Same width as backButton for centering
    },
    content: {
        padding: 15,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    faqItem: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    faqQuestion: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    faqQuestionText: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
        marginRight: 10,
    },
    faqAnswer: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
    noResultsText: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 10,
    },
    contactMethodItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    contactMethodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff0f0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    contactMethodInfo: {
        flex: 1,
    },
    contactMethodTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    contactMethodDescription: {
        fontSize: 14,
        color: "#666",
    },
    contactMethodAction: {
        backgroundColor: "#e30019",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    contactMethodActionText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    storeLocationsButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },
    storeLocationsText: {
        fontSize: 16,
        color: "#e30019",
        fontWeight: "500",
        marginLeft: 10,
    },
})

