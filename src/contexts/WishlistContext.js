
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api, showError, showSuccess } from "../service/api"
import { useAuth } from "./AuthContext"

const WishlistContext = createContext()

// Wishlist provider component
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([])
    const [loading, setLoading] = useState(false)
    const { token, isLoggedIn } = useAuth()

    // Load wishlist when user logs in
    useEffect(() => {
        const loadWishlist = async () => {
            if (isLoggedIn && token) {
                try {
                    setLoading(true)
                    const response = await api.getWishlist(token)
                    if (response.success) {
                        setWishlistItems(response.data)
                    }
                } catch (error) {
                    console.error("Error loading wishlist:", error)
                } finally {
                    setLoading(false)
                }
            } else {
                // If not logged in, try to load from local storage
                try {
                    const storedWishlist = await AsyncStorage.getItem("wishlistItems")
                    if (storedWishlist) {
                        setWishlistItems(JSON.parse(storedWishlist))
                    }
                } catch (error) {
                    console.error("Error loading local wishlist:", error)
                }
            }
        }

        loadWishlist()
    }, [isLoggedIn, token])

    // Save wishlist to storage whenever it changes
    useEffect(() => {
        const saveWishlist = async () => {
            if (!isLoggedIn) {
                try {
                    await AsyncStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
                } catch (error) {
                    console.error("Error saving wishlist:", error)
                }
            }
        }

        saveWishlist()
    }, [wishlistItems, isLoggedIn])

    // Add item to wishlist
    const addToWishlist = async (product) => {
        try {
            setLoading(true)

            // Check if product already exists in wishlist
            const exists = wishlistItems.some((item) => item.id === product.id)
            if (exists) {
                showError("Sản phẩm đã có trong danh sách yêu thích")
                return false
            }

            if (isLoggedIn && token) {
                // Add to server wishlist if logged in
                const response = await api.addToWishlist(token, product.id)
                if (response.success) {
                    setWishlistItems((prev) => [...prev, product])
                    showSuccess("Đã thêm vào danh sách yêu thích")
                    return true
                } else {
                    showError(response.error)
                    return false
                }
            } else {
                // Add to local wishlist if not logged in
                setWishlistItems((prev) => [...prev, product])
                showSuccess("Đã thêm vào danh sách yêu thích")
                return true
            }
        } catch (error) {
            console.error("Add to wishlist error:", error)
            showError("Không thể thêm vào danh sách yêu thích")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Remove item from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            setLoading(true)

            if (isLoggedIn && token) {
                // Remove from server wishlist if logged in
                const response = await api.removeFromWishlist(token, productId)
                if (response.success) {
                    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
                    showSuccess("Đã xóa khỏi danh sách yêu thích")
                    return true
                } else {
                    showError(response.error)
                    return false
                }
            } else {
                // Remove from local wishlist if not logged in
                setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
                showSuccess("Đã xóa khỏi danh sách yêu thích")
                return true
            }
        } catch (error) {
            console.error("Remove from wishlist error:", error)
            showError("Không thể xóa khỏi danh sách yêu thích")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Check if product is in wishlist
    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId)
    }

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
    )
}

// Custom hook to use wishlist context
export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}

