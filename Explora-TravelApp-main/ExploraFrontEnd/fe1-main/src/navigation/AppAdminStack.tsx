import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import AppAdminMenu from "../components/AppAdminMenu";
import HomeScreen from "../screens/admin/HomeScreen";
import ProfileScreen from "../screens/admin/ProfileScreen";
import AirlinesScreen from "../screens/admin/Airline/AirlinesScreen";
import CreateAirlineScreen from "../screens/admin/Airline/CreateAirlineScreen";
import UpdateAirlineScreen from "../screens/admin/Airline/UpdateAirlineScreen";
import PlanesScreen from "../screens/admin/Plane/PlanesScreen";
import CreatePlaneScreen from "../screens/admin/Plane/CreatePlaneScreen";
import UpdatePlaneScreen from "../screens/admin/Plane/UpdatePlaneScreen";
import NhaXeListScreen from "../screens/admin/NhaXe/NhaXeListScreen";
import CreateNhaXeScreen from "../screens/admin/NhaXe/CreateNhaXeScreen";
import UpdateNhaXeScreen from "../screens/admin/NhaXe/UpdateNhaXeScreen";
import BusListScreen from "../screens/admin/Bus/BusListScreen";
import CreateBusScreen from "../screens/admin/Bus/CreateBusScreen";
import UpdateBusScreen from "../screens/admin/Bus/UpdateBusScreen";

export type AppAdminStackParamList = {
    Home: undefined;
    Profile: undefined;

    Airlines: undefined;
    CreateAirline: undefined;
    UpdateAirline: { airlineId: number };

    Planes: undefined;
    CreatePlane: undefined;
    UpdatePlane: { planeId: number };

    NhaXeList: undefined;
    CreateNhaXe: undefined;
    UpdateNhaXe: { nhaXeId: number };

    Bus: undefined;
    CreateBus: undefined;
    UpdateBus: { busId: number };
};

const Stack = createNativeStackNavigator<AppAdminStackParamList>();

export default function AppAdminStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Home Admin",
                    headerRight: (props) => (
                        <AppAdminMenu
                            onPress={() => {
                                navigation.navigate("Profile");
                            }}
                        />
                    ),
                })}
            />

            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen
                name="Airlines"
                component={AirlinesScreen}
                options={({ navigation }) => ({
                    headerRight: (props) => (
                        <IconButton
                            icon="plus-thick"
                            onPress={() => {
                                navigation.navigate("CreateAirline");
                            }}
                        />
                    ),
                })}
            />

            <Stack.Screen
                name="CreateAirline"
                component={CreateAirlineScreen}
                options={{
                    title: "Create Airline"
                }}
            />

            <Stack.Screen
                name="UpdateAirline"
                component={UpdateAirlineScreen}
                options={{
                    title: "Update Airline"
                }}
            />

            <Stack.Screen
                name="Planes"
                component={PlanesScreen}
                options={({ navigation }) => ({
                    headerRight: (props) => (
                        <IconButton
                            icon="plus-thick"
                            onPress={() => {
                                navigation.navigate("CreatePlane");
                            }}
                        />
                    ),
                })}
            />

            <Stack.Screen
                name="CreatePlane"
                component={CreatePlaneScreen}
                options={{
                    title: "Create Plane"
                }}
            />

            <Stack.Screen
                name="UpdatePlane"
                component={UpdatePlaneScreen}
                options={{
                    title: "Update Plane"
                }}
            />

            <Stack.Screen
                name="NhaXeList"
                component={NhaXeListScreen}
                options={({ navigation }) => ({
                    title: "Quản lý nhà xe",
                    headerRight: (props) => (
                        <IconButton
                            icon="plus-thick"
                            onPress={() => {
                                navigation.navigate("CreateNhaXe");
                            }}
                        />
                    ),
                })}
            />

            <Stack.Screen
                name="CreateNhaXe"
                component={CreateNhaXeScreen}
                options={{
                    title: "Thêm nhà xe"
                }}
            />

            <Stack.Screen
                name="UpdateNhaXe"
                component={UpdateNhaXeScreen}
                options={{
                    title: "Update Nhà Xe"
                }}
            />

            <Stack.Screen
                name="Bus"
                component={BusListScreen}
                options={({ navigation }) => ({
                    title: "Quản lý chuyến xe",
                    headerRight: (props) => (
                        <IconButton
                            icon="plus-thick"
                            onPress={() => {
                                navigation.navigate("CreateBus");
                            }}
                        />
                    ),
                })}
            />

            <Stack.Screen
                name="CreateBus"
                component={CreateBusScreen}
                options={{
                    title: "Thêm chuyến xe"
                }}
            />

            <Stack.Screen
                name="UpdateBus"
                component={UpdateBusScreen}
                options={{
                    title: "Update Chuyến Xe"
                }}
            />
        </Stack.Navigator>
    );
}
