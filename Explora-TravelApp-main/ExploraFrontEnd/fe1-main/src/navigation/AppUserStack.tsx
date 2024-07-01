import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Bus, Hotel, OrderRoom, Plane, RoomType } from "../types";
import { IconButton } from "react-native-paper";
import HomeScreen from "../screens/user/HomeScreen";
import AppUserMenu from "../components/AppUserMenu";
import ProfileScreen from "../screens/user/profile/ProfileScreen";
import SearchBusScreen from "../screens/user/bus/SearchBusScreen";
import BusListScreen from "../screens/user/bus/BusListScreen";
import BookingBusScreen from "../screens/user/bus/BookingBusScreen";
import ConfirmBookingBusScreen from "../screens/user/bus/ConfirmBookingBusScreen";
import BookingBusSuccessScreen from "../screens/user/bus/BookingBusSuccessScreen";
import OrderBusDetailScreen from "../screens/user/OrderBusDetailScreen";
import SearchPlaneScreen from "../screens/user/plane/SearchPlaneScreen";
import PlaneListScreen from "../screens/user/plane/PlaneListScreen";
import BookingPlaneScreen from "../screens/user/plane/BookingPlaneScreen";
import ConfirmBookingPlaneScreen from "../screens/user/plane/ConfirmBookingPlaneScreen";
import BookingPlaneSuccessScreen from "../screens/user/plane/BookingPlaneSuccessScreen";
import OrderPlaneDetailScreen from "../screens/user/OrderPlaneDetailScreen";
import ManageHotelScreen from "../screens/user/HotelOwner/ManageHotelScreen";
import CreateHotelScreen from "../screens/user/HotelOwner/CreateHotelScreen";
import HotelDetailScreen from "../screens/user/HotelOwner/HotelDetailScreen";
import UpdateHotelScreen from "../screens/user/HotelOwner/UpdateHotelScreen";
import CreateRoomScreen from "../screens/user/HotelOwner/CreateRoomScreen";
import SearchRoomScreen from "../screens/user/room/SearchRoomScreen";
import CreateRoomTypeScreen from "../screens/user/HotelOwner/CreateRoomTypeScreen";
import UpdateRoomTypeScreen from "../screens/user/HotelOwner/UpdateRoomTypeScreen";
import SearchedHotelListScreen from "../screens/user/room/SearchedHotelListScreen";
import HotelDetailBookingScreen from "../screens/user/room/HotelDetailBookingScreen";
import BookingRoomScreen from "../screens/user/room/BookingRoomScreen";
import BookingRoomSuccessScreen from "../screens/user/room/BookingRoomSuccessScreen";
import OrderRoomDetailScreen from "../screens/user/OrderRoomDetailScreen";

export type AppUserStackParamList = {
    Home: undefined;

    Profile: undefined;
    OrderBusDetail: {
        orderBusId: number;
    }
    OrderPlaneDetail: {
        orderPlaneId: number;
    }
    OrderRoomDetail: {
        orderRoom: OrderRoom;
    }

    SearchBus: undefined;
    BusList: {
        startPoint: string;
        endPoint: string;
        startTime: string;
    }
    BookingBus: {
        busId: number;
    }
    ConfirmBookingBus: {
        bus: Bus;
        tickets: {
            guessName: string;
            guessEmail: string;
            phoneNumber: string;
        }[];
    }
    BookingBusSuccess: undefined;

    SearchPlane: undefined;
    PlaneList: {
        startPoint: string;
        endPoint: string;
        startTime: string;
    }
    BookingPlane: {
        planeId: number;
    }
    ConfirmBookingPlane: {
        plane: Plane,
        tickets: {
            guessName: string;
            guessEmail: string;
            phoneNumber: string;
            dateOfBirth: Date;
            nationality: string;
            passpostNumber: string;
            expiredTime: Date;
        }[]
    }
    BookingPlaneSuccess: undefined;

    SearchRoom: undefined;
    SearchedHotelList: {
        addressHotel: string;
        startTime: string;
        endTime: string;
        roomNumber: number;
    }
    HotelDetailBooking: {
        hotelId: number;
        startTime: string;
        endTime: string;
        roomNumber: number;
    }
    BookingRoom: {
        hotel: Hotel;
        roomType: RoomType;
        startTime: string;
        endTime: string;
        roomNumber: number;
    }
    BookingRoomSuccess: undefined;

    // Hotel Owner 
    ManageHotel: undefined;
    CreateHotel: undefined;
    HotelDetail: {
        hotelId: number;
    },
    UpdateHotel: {
        hotelId: number;
        onUpdated?: () => void;
    },
    CreateRoom: {
        hotelId: number;
        onCreated?: () => void;
    };
    CreateRoomType: {
        hotelId: number;
        onCreated?: () => void;
    };
    UpdateRoomType: {
        roomType: RoomType;
        onUpdated?: () => void;
    };
};

const Stack = createNativeStackNavigator<AppUserStackParamList>();

export default function AppUserStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
                headerRight: (props) => <AppUserMenu onPress={() => {
                    navigation.navigate("Profile");
                }} />,
            })}
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    headerRight: undefined
                }}
            />
            <Stack.Screen 
                name="OrderBusDetail" 
                component={OrderBusDetailScreen}
                options={{
                    headerRight: undefined,
                    title: "Thông tin chuyến xe"
                }}
            />
            <Stack.Screen 
                name="OrderPlaneDetail" 
                component={OrderPlaneDetailScreen}
                options={{
                    headerRight: undefined,
                    title: "Thông tin chuyến bay"
                }}
            />
            <Stack.Screen 
                name="OrderRoomDetail" 
                component={OrderRoomDetailScreen}
                options={{
                    headerRight: undefined,
                    title: "Thông tin đặt phòng"
                }}
            />

            <Stack.Screen 
                name="SearchBus" 
                component={SearchBusScreen}
                options={{
                    title: "Tìm kiếm chuyến xe"
                }}
            />

            <Stack.Screen 
                name="BusList" 
                component={BusListScreen}
                options={{
                    title: "Tìm kiếm chuyến xe"
                }}
            />

            <Stack.Screen 
                name="BookingBus"
                component={BookingBusScreen}
                options={{
                    title: "Đặt chỗ"
                }}
            />

            <Stack.Screen 
                name="ConfirmBookingBus"
                component={ConfirmBookingBusScreen}
                options={{
                    title: "Xác nhận"
                }}
            />

            <Stack.Screen
                name="BookingBusSuccess"
                component={BookingBusSuccessScreen}
                options={{
                    title: "Đặt vé thành công"
                }}
            />

            <Stack.Screen
                name="SearchPlane" 
                component={SearchPlaneScreen}
                options={{
                    title: "Tìm kiếm chuyến bay"
                }}
            />

            <Stack.Screen 
                name="PlaneList" 
                component={PlaneListScreen}
                options={{
                    title: "Tìm kiếm chuyến bay"
                }}
            />

            <Stack.Screen 
                name="BookingPlane"
                component={BookingPlaneScreen}
                options={{
                    title: "Đặt vé"
                }}
            />

            <Stack.Screen 
                name="ConfirmBookingPlane"
                component={ConfirmBookingPlaneScreen}
                options={{
                    title: "Xác nhận"
                }}
            />

            <Stack.Screen
                name="BookingPlaneSuccess"
                component={BookingPlaneSuccessScreen}
                options={{
                    title: "Đặt vé thành công"
                }}
            />


            <Stack.Screen
                name="ManageHotel"
                component={ManageHotelScreen}
                options={({ navigation }) => ({
                    title: "Quản lý khách sạn",
                    headerRight: (props) => (
                        <IconButton
                            icon="plus-thick"
                            onPress={() => {
                                navigation.navigate("CreateHotel");
                            }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="CreateHotel"
                component={CreateHotelScreen}
                options={{
                    title: "Thêm khách sạn",
                    headerRight: undefined,
                }}
            />
            <Stack.Screen
                name="HotelDetail"
                component={HotelDetailScreen}
                options={{
                    headerRight: undefined,
                }}
            />
            <Stack.Screen
                name="UpdateHotel"
                component={UpdateHotelScreen}
                options={{
                    headerRight: undefined,
                }}
            />
            <Stack.Screen
                name="CreateRoom"
                component={CreateRoomScreen}
                options={{
                    title: "Thêm phòng khách sạn",
                    headerRight: undefined,
                }}
            />
            <Stack.Screen
                name="CreateRoomType"
                component={CreateRoomTypeScreen}
                options={{
                    title: "Thêm loại phòng",
                    headerRight: undefined,
                }}
            />
            <Stack.Screen
                name="UpdateRoomType"
                component={UpdateRoomTypeScreen}
                options={{
                    title: "Chỉnh sửa loại phòng",
                    headerRight: undefined,
                }}
            />

            <Stack.Screen
                name="SearchRoom"
                component={SearchRoomScreen}
                options={{
                    title: "Tìm kiếm phòng khách sạn"
                }}
            />
            <Stack.Screen
                name="SearchedHotelList"
                component={SearchedHotelListScreen}
                options={{
                    title: "Tìm kiếm khách sạn"
                }}
            />
            <Stack.Screen
                name="HotelDetailBooking"
                component={HotelDetailBookingScreen}
                options={{
                    headerRight: undefined
                }}
            />
            <Stack.Screen
                name="BookingRoom"
                component={BookingRoomScreen}
                options={{
                    title: "Đặt phòng",
                    headerRight: undefined
                }}
            />
            <Stack.Screen
                name="BookingRoomSuccess"
                component={BookingRoomSuccessScreen}
                options={{
                    title: "Đặt phòng thành công",
                    headerRight: undefined
                }}
            />
        </Stack.Navigator>
    );
}
