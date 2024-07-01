import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AuthStack from "./src/navigation/AuthStack";
import useAuthStore from "./src/stores/useAuthStore";
import AppUserStack from "./src/navigation/AppUserStack";
import SplashScreen from "./src/screens/SplashScreen";
import Toast from "react-native-toast-message";
import AppAdminStack from "./src/navigation/AppAdminStack";

function App(): React.JSX.Element {
    const { loadCurrentUser, authenticated, logout, isLoading, user } =
        useAuthStore((state) => ({
            loadCurrentUser: state.loadCurrentUser,
            authenticated: state.authenticated,
            logout: state.logout,
            isLoading: state.isLoading,
            user: state.user,
        }));

    useEffect(() => {
        const loadJwt = async () => {
            try {
                await loadCurrentUser();
            } catch (error) {
                await logout();
            }
        };

        loadJwt();
    }, []);

    function render(): React.ReactElement {
        if (isLoading) {
            return <SplashScreen />;
        }

        if (!authenticated) {
            return <AuthStack />;
        }
        
        switch (user?.role) {
			case 'User':
				return <AppUserStack />
			case 'Admin':
				return <AppAdminStack />
			case 'HotelOwner':
				return <AppUserStack />
			default:
				return <AuthStack />
		}
    }

    return (
        <NavigationContainer>
            {render()}
            <Toast />
        </NavigationContainer>
    );
}

export default App;
