import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function AboutUsScreen() {
    const navigation = useNavigation()

    // Open social media links
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't open link", err))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Về Minh Tuấn Mobile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Logo and Company Name */}
                <View style={styles.logoContainer}>
                    <Image source={{ uri: "https://placeholder.com/200x100" }} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.companyName}>Minh Tuấn Mobile</Text>
                    <Text style={styles.tagline}>Uy tín tạo nên thương hiệu</Text>
                </View>

                {/* About Us Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giới thiệu</Text>
                    <Text style={styles.paragraph}>
                        Minh Tuấn Mobile được thành lập vào năm 2010, là một trong những chuỗi cửa hàng bán lẻ điện thoại, máy tính
                        bảng, laptop và phụ kiện uy tín hàng đầu tại Việt Nam.
                    </Text>
                    <Text style={styles.paragraph}>
                        Với hơn 50 cửa hàng trên toàn quốc, chúng tôi tự hào mang đến cho khách hàng những sản phẩm chính hãng, chất
                        lượng cao với giá cả cạnh tranh cùng dịch vụ chăm sóc khách hàng tận tâm.
                    </Text>
                </View>

                {/* Mission and Vision */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tầm nhìn & Sứ mệnh</Text>

                    <View style={styles.missionItem}>
                        <Ionicons name="eye-outline" size={24} color="#e30019" style={styles.missionIcon} />
                        <View>
                            <Text style={styles.missionTitle}>Tầm nhìn</Text>
                            <Text style={styles.missionText}>
                                Trở thành nhà bán lẻ sản phẩm công nghệ hàng đầu Việt Nam, mang đến trải nghiệm mua sắm tuyệt vời cho
                                khách hàng.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.missionItem}>
                        <Ionicons name="flag-outline" size={24} color="#e30019" style={styles.missionIcon} />
                        <View>
                            <Text style={styles.missionTitle}>Sứ mệnh</Text>
                            <Text style={styles.missionText}>
                                Cung cấp sản phẩm công nghệ chính hãng với giá tốt nhất, dịch vụ chuyên nghiệp và hậu mãi chu đáo.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Core Values */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giá trị cốt lõi</Text>

                    <View style={styles.valuesContainer}>
                        <View style={styles.valueItem}>
                            <Ionicons name="shield-checkmark-outline" size={30} color="#e30019" />
                            <Text style={styles.valueTitle}>Uy tín</Text>
                        </View>

                        <View style={styles.valueItem}>
                            <Ionicons name="star-outline" size={30} color="#e30019" />
                            <Text style={styles.valueTitle}>Chất lượng</Text>
                        </View>

                        <View style={styles.valueItem}>
                            <Ionicons name="heart-outline" size={30} color="#e30019" />
                            <Text style={styles.valueTitle}>Tận tâm</Text>
                        </View>

                        <View style={styles.valueItem}>
                            <Ionicons name="trending-up-outline" size={30} color="#e30019" />
                            <Text style={styles.valueTitle}>Phát triển</Text>
                        </View>
                    </View>
                </View>

                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

                    <View style={styles.contactItem}>
                        <Ionicons name="location-outline" size={20} color="#e30019" style={styles.contactIcon} />
                        <Text style={styles.contactText}>
                            Trụ sở chính: 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                        </Text>
                    </View>

                    <View style={styles.contactItem}>
                        <Ionicons name="call-outline" size={20} color="#e30019" style={styles.contactIcon} />
                        <Text style={styles.contactText}>Hotline: 1800.1234 (Miễn phí)</Text>
                    </View>

                    <View style={styles.contactItem}>
                        <Ionicons name="mail-outline" size={20} color="#e30019" style={styles.contactIcon} />
                        <Text style={styles.contactText}>Email: info@minhtuanmobile.com</Text>
                    </View>

                    <View style={styles.contactItem}>
                        <Ionicons name="globe-outline" size={20} color="#e30019" style={styles.contactIcon} />
                        <Text style={styles.contactText}>Website: www.minhtuanmobile.com</Text>
                    </View>
                </View>

                {/* Social Media */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Kết nối với chúng tôi</Text>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton} onPress={() => openLink("https://facebook.com")}>
                            <Ionicons name="logo-facebook" size={24} color="#3b5998" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} onPress={() => openLink("https://youtube.com")}>
                            <Ionicons name="logo-youtube" size={24} color="#ff0000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} onPress={() => openLink("https://instagram.com")}>
                            <Ionicons name="logo-instagram" size={24} color="#c13584" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} onPress={() => openLink("https://tiktok.com")}>
                            <Ionicons name="logo-tiktok" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Phiên bản ứng dụng: 1.0.0</Text>
                    <Text style={styles.copyrightText}>© 2023 Minh Tuấn Mobile. All rights reserved.</Text>
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
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logo: {
        width: 150,
        height: 80,
        marginBottom: 10,
    },
    companyName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    tagline: {
        fontSize: 16,
        color: "#666",
        fontStyle: "italic",
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#eee",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#e30019",
    },
    paragraph: {
        fontSize: 14,
        color: "#333",
        lineHeight: 22,
        marginBottom: 10,
    },
    missionItem: {
        flexDirection: "row",
        marginBottom: 15,
    },
    missionIcon: {
        marginRight: 15,
        marginTop: 2,
    },
    missionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    missionText: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
    valuesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    valueItem: {
        width: "48%",
        backgroundColor: "#fff0f0",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    valueTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    contactItem: {
        flexDirection: "row",
        marginBottom: 10,
    },
    contactIcon: {
        marginRight: 10,
        marginTop: 2,
    },
    contactText: {
        fontSize: 14,
        color: "#333",
        flex: 1,
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
    },
    versionContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    versionText: {
        fontSize: 14,
        color: "#999",
        marginBottom: 5,
    },
    copyrightText: {
        fontSize: 12,
        color: "#999",
    },
})

