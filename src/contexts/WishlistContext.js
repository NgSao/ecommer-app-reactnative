
import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showError, showSuccess } from "api/apiService"

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load wishlist from AsyncStorage when app starts
    useEffect(() => {
        const loadWishlist = async () => {
            try {
                setLoading(true);
                const storedWishlist = await AsyncStorage.getItem("wishlistItems");
                if (storedWishlist) {
                    setWishlistItems(JSON.parse(storedWishlist));
                }
            } catch (error) {
                console.error("Error loading wishlist:", error);
                showError("Lỗi khi tải danh sách yêu thích");
            } finally {
                setLoading(false);
            }
        };

        loadWishlist();
    }, []);

    useEffect(() => {
        const saveWishlist = async () => {
            try {
                await AsyncStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
            } catch (error) {
                console.error("Error saving wishlist:", error);
                showError("Lỗi khi lưu danh sách yêu thích");
            }
        };

        saveWishlist();
    }, [wishlistItems]);

    // Add item to wishlist
    const addToWishlist = async (product) => {
        try {
            setLoading(true);

            const exists = wishlistItems.some(
                (item) =>
                    item.productId === product.productId ||
                    item.id === product.productId ||
                    item.id === product.id
            );
            if (exists) {
                showError("Sản phẩm đã có trong danh sách yêu thích");
                return false;
            }

            // Create new item with all possible properties
            const newItem = {
                id: product.id, // Could be variantId or productId
                productId: product.productId || product.id, // Ensure productId is always stored
                name: product.name,
                price: product.price || 0,
                image: product.image,
                ...(product.color && { color: product.color }),
                ...(product.storage && { storage: product.storage }),
            };

            setWishlistItems((prev) => [...prev, newItem]);
            showSuccess("Đã thêm vào danh sách yêu thích");
            return true;
        } catch (error) {
            console.error("Add to wishlist error:", error);
            showError("Không thể thêm vào danh sách yêu thích");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            setLoading(true);

            setWishlistItems((prev) =>
                prev.filter((item) => item.productId !== productId && item.id !== productId)
            );
            showSuccess("Đã xóa khỏi danh sách yêu thích");
            return true;
        } catch (error) {
            console.error("Remove from wishlist error:", error);
            showError("Không thể xóa khỏi danh sách yêu thích");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Check if product is in wishlist
    const isInWishlist = (productId) => {
        return wishlistItems.some(
            (item) => item.productId === productId || item.id === productId
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                loading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};