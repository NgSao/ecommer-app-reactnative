import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '@screens/customer/HomeScreen';
import CategoryScreen from '@screens/customer/CategoryScreen';
import ProfileScreen from '@screens/customer/ProfileScreen';
import NotificationScreen from '@screens/customer/NotificationScreen';

import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from '@screens/customer/ProductDetailScreen';
import ProductListScreen from '@screens/customer/ProductListScreen';
import SearchScreen from '@screens/customer/SearchScreen';
import CartScreen from '@screens/customer/CartScreen';
import CheckoutScreen from '@screens/customer/CheckoutScreen';
import SettingsScreen from '@screens/customer/SettingsScreen';
import AboutUsScreen from '@screens/customer/AboutUsScreen';
import ChatScreen from '@screens/customer/ChatScreen';
import HelpCenterScreen from '@screens/customer/HelpCenterScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import VerifyEmailScreen from '@screens/auth/VerifyEmailScreen';
import PaymentMethodsScreen from '@screens/customer/PaymentMethodsScreen';
import OrderHistoryScreen from '@screens/customer/OrderHistoryScreen';
import OrderDetailScreen from '@screens/customer/OrderDetailScreen';
import WishlistScreen from '@screens/customer/WishlistScreen';
import ShippingAddressesScreen from '@screens/customer/ShippingAddressesScreen';
import EditAddressScreen from '@screens/customer/EditAddressScreen';
import AddAddressScreen from './../screens/customer/AddAddressScreen';
import EditProfileScreen from '@screens/customer/EditProfileScreen';
import ChangePasswordScreen from '@screens/customer/ChangePasswordScreen';
import AdminDashboardScreen from '@screens/admin/AdminDashboardScreen';
import AdminProductsScreen from '@screens/admin/AdminProductsScreen';
import AdminProductEdit from '@screens/admin/AdminProductEdit';
import AdminProductAdd from '@screens/admin/AdminProductAdd';
import AdminOrdersManagement from '@screens/admin/AdminOrdersManagement';
import AdminOderCreate from '@screens/admin/AdminOderCreate';
import AdminOrderDetail from '@screens/admin/AdminOrderDetail';
import AdminCategoriesManagement from '@screens/admin/AdminCategoriesManagement';
import AdminPromotionsManagement from '@screens/admin/AdminPromotionsManagement';
import AdminExportDataScreen from '@screens/admin/AdminExportDataScreen';
import AdminCustomersManagement from '@screens/admin/AdminCustomersManagement';
import AdminCreateCustomer from '@screens/admin/AdminCreateCustomer';
import AdminSettings from '@screens/admin/AdminSettings';
import AdminReviewsManagement from '@screens/admin/AdminReviewsManagement';
import AdminChatManagement from '@screens/admin/AdminChatManagement';
import AdminChatDetail from '@screens/admin/AdminChatDetail';
import AdminProductDetails from '@screens/admin/AdminProductDetails';
import AdminBrandManagement from '@screens/admin/AdminBrandManagement';
import MapViewScreen from '@screens/customer/MapViewScreen';

const AppNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();


    function AppTabs() {
        return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#d70018',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    position: 'absolute',
                    height: 60,
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                }
            }}>
                <Tab.Screen name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Trang chủ", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="home-sharp" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="black" />
                        ),
                        tabBarLabelStyle: ({ focused }) => ({
                            color: focused ? '#d70018' : 'red',
                        }),
                    }} />
                <Tab.Screen name='Category'
                    component={CategoryScreen}
                    options={{
                        tabBarLabel: "Danh mục", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="grid" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="grid-outline" size={24} color="black" />
                        ),
                        tabBarLabelStyle: ({ focused }) => ({
                            color: focused ? '#d70018' : 'red',
                        }),
                    }} />
                <Tab.Screen name='Notification'
                    component={NotificationScreen}
                    options={{
                        tabBarLabel: "Thông báo", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="notifications" size={24} color="#d70018" />) : (
                            <Ionicons name="notifications-outline" size={24} color="black" />)
                    }} />
                <Tab.Screen name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Tài khoản", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    }} />
            </Tab.Navigator>
        );
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="AppTab" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
            {/* Profile */}
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShippingAddresses" component={ShippingAddressesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditAddress" component={EditAddressScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapView" component={MapViewScreen} options={{ headerShown: false }} />
            {/* Auth */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />

            {/* Admin Navigation */}
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdminProductsManagement" component={AdminProductsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdminEditProduct" component={AdminProductEdit} options={{ headerShown: false }} />
            <Stack.Screen name="AdminAddProduct" component={AdminProductAdd} options={{ headerShown: false }} />
            <Stack.Screen name="AdminProductDetails" component={AdminProductDetails} options={{ headerShown: false }} />

            <Stack.Screen name="AdminOrdersManagement" component={AdminOrdersManagement} options={{ headerShown: false }} />
            <Stack.Screen name="AdminCreateOrder" component={AdminOderCreate} options={{ headerShown: false }} />
            <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetail} options={{ headerShown: false }} />
            <Stack.Screen name="AdminCategoriesManagement" component={AdminCategoriesManagement} options={{ headerShown: false }} />
            <Stack.Screen name="AdminBrandsManagement" component={AdminBrandManagement} options={{ headerShown: false }} />

            <Stack.Screen name="AdminPromotionsManagement" component={AdminPromotionsManagement} options={{ headerShown: false }} />

            <Stack.Screen name="AdminExportData" component={AdminExportDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdminCustomersManagement" component={AdminCustomersManagement} options={{ headerShown: false }} />
            <Stack.Screen name="AdminCreateCustomer" component={AdminCreateCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="AdminSettings" component={AdminSettings} options={{ headerShown: false }} />
            <Stack.Screen name="AdminReviewsManagement" component={AdminReviewsManagement} options={{ headerShown: false }} />

            <Stack.Screen name="AdminChatManagement" component={AdminChatManagement} options={{ headerShown: false }} />
            <Stack.Screen name="AdminChatDetail" component={AdminChatDetail} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default AppNavigator;
