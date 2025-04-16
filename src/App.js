import { AuthProvider } from '@contexts/AuthContext';
import { CartProvider } from '@contexts/CartContext';
import { WishlistProvider } from '@contexts/WishlistContext';
import AppNavigator from '@navigation/AppNavigator';
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ActionSheetProvider>
                        <AppNavigator />
                    </ActionSheetProvider>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>

    );
};

export default App;
