import { useState } from "react"
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
        <View style={styles.imageContainer}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const newIndex = Math.floor(e.nativeEvent.contentOffset.x / width)
                    setCurrentImageIndex(newIndex)
                }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.productImage} resizeMode="contain" />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.imageDots}>
                {images.map((_, index) => (
                    <View key={index} style={[styles.dot, currentImageIndex === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: "#fff",
        paddingBottom: 20,
        alignItems: "center",
    },
    productImage: {
        width: width,
        height: 300,
    },
    imageDots: {
        flexDirection: "row",
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ddd",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#e30019",
    },
})

export default ImageCarousel