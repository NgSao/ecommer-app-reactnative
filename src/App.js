import { AuthProvider } from '@contexts/AuthContext';
import { CartProvider } from '@contexts/CartContext';
import { WishlistProvider } from '@contexts/WishlistContext';
import { NotificationProvider } from '@contexts/NotificationContext';

import AppNavigator from '@navigation/AppNavigator';
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
const App = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <AuthProvider>
                    <NotificationProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <ActionSheetProvider>
                                    <AppNavigator />
                                </ActionSheetProvider>
                                <Toast />


                            </WishlistProvider>
                        </CartProvider>
                    </NotificationProvider>

                </AuthProvider>
            </NavigationContainer>
        </PaperProvider>


    );
};

export default App;
