import { View, Text, TextInput, StyleSheet } from "react-native"

const OrderNoteSection = ({ note, setNote }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ghi chú đơn hàng</Text>
        <TextInput
            style={styles.noteInput}
            placeholder="Nhập ghi chú cho đơn hàng (tùy chọn)"
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
        />
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    noteInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        height: 80,
        textAlignVertical: "top",
    },
})

export default OrderNoteSection