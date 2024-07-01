import { useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import ProfileInfoTab from "./ProfileInfoTab";
import OrderHistoryTab from "./OrderHistoryTab";
import { AppUserStackParamList } from "../../../navigation/AppUserStack";

const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#FF9900' }}
        style={{ backgroundColor: 'white' }}
        labelStyle={{ color: "#FF9900" }}
    />
);

type Props = NativeStackScreenProps<AppUserStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "info", title: "Thông tin cá nhân", route },
        { key: "history", title: "Lịch sử mua hàng", route },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={({ route }) => {
                switch (route.key) {
                  case 'info':
                    return <ProfileInfoTab />;
                  case 'history':
                    return <OrderHistoryTab navigation={navigation} route={route.route} />;
                  default:
                    return null;
                }
            }}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
