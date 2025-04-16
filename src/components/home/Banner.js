import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const Banner = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Banner clicked:", item.link)}>
        <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="repeat" />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    bannerImage: {
        width: width,
        height: 150,
    },
})

export default Banner