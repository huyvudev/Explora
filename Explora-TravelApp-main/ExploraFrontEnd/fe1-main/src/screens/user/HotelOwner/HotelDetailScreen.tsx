import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { IconButton, Text } from "react-native-paper";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { Image } from "react-native";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Hotel, OrderRoom, RoomType } from "../../../types";
import { getHotelById } from "../../../services/api/hotel";
import { getOrderRoomsByHotelId } from "../../../services/api/orderRoom";
import * as utils from "../../../utils";

type Props = NativeStackScreenProps<AppUserStackParamList, "HotelDetail">;

export default function HotelDetailScreen({ navigation, route }: Props) {
    const [isLoadingHotel, setIsLoadingHotel] = useState<boolean>(false);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [orderRooms, setOrderRooms] = useState<OrderRoom[]>([]);
    const dimension = useWindowDimensions();

    const loadHotel = useCallback(async () => {
        setIsLoadingHotel(true);

        const result = await getHotelById(route.params.hotelId);

        setHotel(result);
        setIsLoadingHotel(false);

        return result;
    }, [route.params.hotelId]);

    useEffect(() => {
        (async () => {
            const result = await loadHotel();

            navigation.setOptions({
                title: result?.hotelName,
                headerRight: () => (
                    <Menu>
                        <MenuTrigger>
                            <IconButton icon="dots-vertical" />
                        </MenuTrigger>
                        <MenuOptions
                            customStyles={{
                                optionsContainer: {
                                    marginTop: 40,
                                },
                            }}
                        >
                            <MenuOption
                                customStyles={{
                                    optionWrapper: {
                                        padding: 15,
                                    },
                                }}
                                onSelect={() => {
                                    navigation.navigate("UpdateHotel", {
                                        hotelId: route.params.hotelId,
                                        onUpdated: () => {
                                            loadHotel();
                                        },
                                    });
                                }}
                                text="Chỉnh sửa khách sạn"
                            />
                            <MenuOption
                                customStyles={{
                                    optionWrapper: {
                                        padding: 15,
                                    },
                                }}
                                onSelect={() => {
                                    navigation.navigate("CreateRoomType", {
                                        hotelId: route.params.hotelId,
                                        onCreated: () => {
                                            loadHotel();
                                        }
                                    });
                                }}
                                text="Thêm loại phòng"
                            />
                            <MenuOption
                                customStyles={{
                                    optionWrapper: {
                                        padding: 15,
                                    },
                                }}
                                onSelect={() => {
                                    navigation.navigate("CreateRoom", {
                                        hotelId: route.params.hotelId,
                                        onCreated: () => {
                                            loadHotel();
                                        }
                                    });
                                }}
                                text="Thêm phòng"
                            />
                        </MenuOptions>
                    </Menu>
                ),
            });
        })();

        (async () => {
            const result = await getOrderRoomsByHotelId(route.params.hotelId);
            setOrderRooms(result.slice(0, 5));
        })();
    }, [route.params.hotelId]);

    if (isLoadingHotel) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={50} color="#FF9900" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                width={dimension.width}
                height={170}
                resizeMode="cover"
                source={{
                    uri: hotel?.imageUrl || "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
                }}
            />
            {hotel ? (
                <ScrollView style={{ padding: 20 }}>
                    <View style={{
                        marginBottom: 20
                    }}>
                        <Text
                            style={{
                                color: "#FF9900",
                                fontSize: 18,
                                fontWeight: "700",
                            }}
                        >
                            Khách sạn {hotel.hotelName}
                        </Text>
                        <Text>Tổng số phòng: {hotel.roomCount || 0}</Text>
                    </View>

                    <View
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: "#FF9900",
                                fontSize: 18,
                                fontWeight: "500",
                                marginBottom: 10,
                            }}
                        >
                            Các loại phòng của khách sạn
                        </Text>

                        <ScrollView horizontal>
                            {!hotel.roomTypes[0] && (
                                <Text style={{ marginLeft: 15 }}>
                                    Hiện chưa có loại phòng nào.
                                </Text>
                            )}
                            {hotel.roomTypes?.map((roomType) => (
                                <RoomTypeItem
                                    key={roomType.roomTypeId}
                                    roomType={roomType}
                                    onTap={() => {
                                        navigation.navigate("UpdateRoomType", {
                                            roomType,
                                            onUpdated: () => loadHotel()
                                        });
                                    }}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: "#FF9900",
                                fontSize: 18,
                                fontWeight: "500",
                                marginBottom: 10,
                            }}
                        >
                            Các yêu cầu đặt phòng mới nhất
                        </Text>

                        {!orderRooms[0] && (
                            <Text style={{ marginLeft: 15 }}>
                                Hiện chưa có yêu cầu nào.
                            </Text>
                        )}
                        {orderRooms.map((order) => (
                            <OrderRoomItem
                                key={order.billId}
                                order={order}
                                onTap={() => {
                                    //
                                }}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>Oops!, không có dữ liệu gì cả</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

function RoomTypeItem({ roomType, onTap }: { roomType: RoomType; onTap: () => void }) {
    return (
        <TouchableOpacity
            style={{
                margin: 10,
                width: 120,
            }}
            onPress={onTap}
        >
            <Image
                width={120}
                height={120}
                resizeMode="cover"
                source={{
                    uri:
                        roomType.imageUrl ||
                        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
            />

            <Text
                style={{
                    paddingVertical: 10,
                }}
                numberOfLines={2}
            >
                {roomType.roomTypeName}
            </Text>
        </TouchableOpacity>
    );
}

function OrderRoomItem({
    order,
    onTap,
}: {
    order: OrderRoom;
    onTap: () => void;
}) {
    return (
        <TouchableOpacity
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
            onPress={onTap}
        >
            <Text
                style={{
                    textAlign: "center",
                    fontWeight: "700",
                }}
            >
                {utils.toDateTimeString(order.buyTime)}
            </Text>
            <Text>Số phòng: {order.amount}</Text>
            <Text>Tên khách hàng: {order.guessName}</Text>
            <Text>
                {utils.toDateTimeString(order.startTime)}
                {" - "}
                {utils.toDateTimeString(order.endTime)}
            </Text>
        </TouchableOpacity>
    );
}
