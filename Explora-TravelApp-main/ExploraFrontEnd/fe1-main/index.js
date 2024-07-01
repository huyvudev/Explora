import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import App from './App';
import { name as appName } from './app.json';

function Main() {
    return (
        <PaperProvider>
            <MenuProvider>
                <App />
            </MenuProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);