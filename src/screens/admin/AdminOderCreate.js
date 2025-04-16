import { View, ScrollView, TextInput, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminCreateOrderStyles"
import useCreateOrder from "@hooks/useCreateOrder"
import AdminHeader from "@components/admin/AdminHeader"
import CustomerSelector from "@components/admin/order/CustomerSelector"
import CartItem from "@components/admin/order/CartItem"
import PaymentInfo from "@components/admin/order/PaymentInfo"
import PaymentMethodSelector from "@components/admin/order/PaymentMethodSelector"
import ProductSelector from "@components/admin/order/ProductSelector"

const AdminOderCreate = () => {
    const {
        customer,
        setCustomer,
        showCustomerModal,
        setShowCustomerModal,
        customerSearchQuery,
        setCustomerSearchQuery,
        customers,
        loadingCustomers,
        cartItems,
        showProductModal,
        setShowProductModal,
        productSearchQuery,
        setProductSearchQuery,
        products,
        loadingProducts,
        selectedProduct,
        setSelectedProduct,
        selectedVariant,
        setSelectedVariant,
        quantity,
        setQuantity,
        shippingFee,
        setShippingFee,
        discount,
        setDiscount,
        note,
        setNote,
        paymentMethod,
        setPaymentMethod,
        subtotal,
        shippingFeeValue,
        discountValue,
        tax,
        total,
        submitting,
        fetchCustomers,
        fetchProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        createOrder,
        navigateToCreateCustomer,
    } = useCreateOrder()

    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title="Tạo đơn hàng mới" />

            <ScrollView style={styles.scrollContainer}>
                <CustomerSelector
                    customer={customer}
                    setCustomer={setCustomer}
                    showCustomerModal={showCustomerModal}
                    setShowCustomerModal={setShowCustomerModal}
                    customerSearchQuery={customerSearchQuery}
                    setCustomerSearchQuery={setCustomerSearchQuery}
                    customers={customers}
                    loadingCustomers={loadingCustomers}
                    fetchCustomers={fetchCustomers}
                    navigateToCreateCustomer={navigateToCreateCustomer}
                />

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sản phẩm</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                                setSelectedProduct(null)
                                setSelectedVariant(null)
                                setQuantity("1")
                                setShowProductModal(true)
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#e30019" />
                            <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                        </TouchableOpacity>
                    </View>

                    {cartItems.length === 0 ? (
                        <View style={styles.emptyCartContainer}>
                            <Ionicons name="cart-outline" size={40} color="#ccc" />
                            <Text style={styles.emptyCartText}>Chưa có sản phẩm nào trong đơn hàng</Text>
                            <TouchableOpacity style={styles.addProductButton} onPress={() => setShowProductModal(true)}>
                                <Text style={styles.addProductButtonText}>Thêm sản phẩm</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ))
                    )}
                </View>

                <PaymentInfo
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    setShippingFee={setShippingFee}
                    discount={discount}
                    setDiscount={setDiscount}
                    tax={tax}
                    total={total}
                />

                <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ghi chú</Text>
                    <TextInput
                        style={styles.noteInput}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Nhập ghi chú cho đơn hàng (nếu có)..."
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.createOrderButton, submitting && styles.disabledButton]}
                    onPress={createOrder}
                    disabled={submitting || cartItems.length === 0 || !customer}
                >
                    {submitting ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                            <Text style={styles.createOrderButtonText}>Tạo đơn hàng</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>

            <ProductSelector
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                productSearchQuery={productSearchQuery}
                setProductSearchQuery={setProductSearchQuery}
                products={products}
                loadingProducts={loadingProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                quantity={quantity}
                setQuantity={setQuantity}
                fetchProducts={fetchProducts}
                addToCart={addToCart}
            />
        </SafeAreaView>
    )
}

export default AdminOderCreate

