

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showError, showSuccess } from "api/apiService"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem("cartItems")
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart))
                }
            } catch (error) {
                console.error("Error loading cart:", error)
            }
        }

        loadCart()
    }, [])

    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems))
                console.log('cartne', JSON.stringify(cartItems))
            } catch (error) {
                console.error("Error saving cart:", error)
            }
        }

        saveCart()
    }, [cartItems])

    const addToCart = (product, quantity = 1, options = {}) => {
        try {
            setLoading(true)
            const { color, storage, size } = options

            const hasVariants = color || storage || size

            const existingItemIndex = cartItems.findIndex((item) => {
                if (hasVariants) {
                    return (
                        item.id === product.id &&
                        item.color === color &&
                        item.storage === storage &&
                        item.size === size
                    )
                } else {
                    // For non-variant products, match by id only
                    return item.id === product.id
                }
            })

            if (existingItemIndex !== -1) {
                // Update quantity of existing item
                const updatedItems = [...cartItems]
                updatedItems[existingItemIndex].quantity += quantity
                if (updatedItems[existingItemIndex].quantity > product.maxQuantity) {
                    updatedItems[existingItemIndex].quantity = product.maxQuantity
                    showError(`Số lượng tối đa là ${product.maxQuantity}`)
                }
                setCartItems(updatedItems)
                showSuccess("Đã cập nhật số lượng sản phẩm trong giỏ hàng")
            } else {
                // Add new item to cart
                const newItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                    maxQuantity: product.maxQuantity,
                    ...(hasVariants ? { color, storage, size } : {}),
                }
                setCartItems((prev) => [...prev, newItem])
                showSuccess("Đã thêm sản phẩm vào giỏ hàng")
            }

            return true
        } catch (error) {
            console.error("Add to cart error:", error)
            showError("Không thể thêm sản phẩm vào giỏ hàng")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Update item quantity
    const updateQuantity = (itemIndex, quantity) => {
        try {
            if (quantity < 1) {
                return false
            }

            const updatedItems = [...cartItems]
            if (quantity > updatedItems[itemIndex].maxQuantity) {
                updatedItems[itemIndex].quantity = updatedItems[itemIndex].maxQuantity
                showError(`Số lượng tối đa là ${updatedItems[itemIndex].maxQuantity}`)
            } else {
                updatedItems[itemIndex].quantity = quantity
            }
            setCartItems(updatedItems)
            return true
        } catch (error) {
            console.error("Update quantity error:", error)
            showError("Không thể cập nhật số lượng")
            return false
        }
    }

    // Remove item from cart
    const removeItem = (itemIndex) => {
        try {
            const updatedItems = [...cartItems]
            updatedItems.splice(itemIndex, 1)
            setCartItems(updatedItems)
            showSuccess("Đã xóa sản phẩm khỏi giỏ hàng")
            return true
        } catch (error) {
            console.error("Remove item error:", error)
            showError("Không thể xóa sản phẩm")
            return false
        }
    }

    // Clear cart
    const clearCart = () => {
        try {
            setCartItems([])
            return true
        } catch (error) {
            console.error("Clear cart error:", error)
            showError("Không thể xóa giỏ hàng")
            return false
        }
    }

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    // Calculate total items in cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                loading,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                calculateSubtotal,
                getTotalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}