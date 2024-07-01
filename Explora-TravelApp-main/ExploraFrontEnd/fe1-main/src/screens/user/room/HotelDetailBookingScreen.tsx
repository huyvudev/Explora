import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Button, Icon } from "react-native-paper";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { EmptyRoomType, Hotel } from "../../../types";
import {
    getEmptyRoomsByHotel,
    getHotelById,
} from "../../../services/api/hotel";

type Props = NativeStackScreenProps<
    AppUserStackParamList,
    "HotelDetailBooking"
>;

export default function HotelDetailBookingScreen({ navigation, route }: Props) {
    const [isLoadingHotel, setIsLoadingHotel] = useState<boolean>(false);
    const [isLoadingRoomTypes, setIsLoadingRoomTypes] =
        useState<boolean>(false);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [roomTypes, setRoomTypes] = useState<EmptyRoomType[]>([]);

    const dimension = useWindowDimensions();

    useEffect(() => {
        (async () => {
            setIsLoadingHotel(true);

            const result = await getHotelById(route.params.hotelId);

            setHotel(result);
            setIsLoadingHotel(false);

            navigation.setOptions({
                title: `Khách sạn ${result?.hotelName}`,
            });
        })();

        (async () => {
            setIsLoadingRoomTypes(true);

            const result = await getEmptyRoomsByHotel(route.params.hotelId, {
                startTime: route.params.startTime,
                endTime: route.params.endTime,
            });

            setRoomTypes(result);
            setIsLoadingRoomTypes(false);
        })();
    }, [
        route.params.hotelId,
        route.params.startTime,
        route.params.endTime,
        route.params.roomNumber,
    ]);

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
            {hotel ? (
                <ScrollView>
                    <Image
                        width={dimension.width}
                        height={250}
                        resizeMode="cover"
                        source={{
                            uri: hotel.imageUrl,
                        }}
                    />

                    <View style={{ padding: 20 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "black",
                                fontWeight: "600",
                                marginBottom: 15,
                            }}
                        >
                            {hotel.hotelName}
                        </Text>

                        <View
                            style={{
                                backgroundColor: "white",
                                shadowColor: "black",
                                padding: 10,
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "black" }}>Vị trí</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <Icon source="map-marker" size={15} />
                                <Text>{hotel.addressHotel}</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                marginVertical: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "black",
                                    fontWeight: "600",
                                    marginBottom: 15,
                                }}
                            >
                                Các phòng còn trống
                            </Text>

                            {isLoadingRoomTypes ? (
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ActivityIndicator
                                        size={50}
                                        color="#FF9900"
                                    />
                                </View>
                            ) : (
                                <View
                                    style={{
                                        flexDirection: "column",
                                        gap: 20,
                                    }}
                                >
                                    {!roomTypes[0] && (
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text>
                                                Không còn phòng nào trống!
                                            </Text>
                                        </View>
                                    )}

                                    {roomTypes.map((room) => (
                                        <RoomTypeItem
                                            key={room.roomType.roomTypeId}
                                            room={room}
                                            onPress={() => {
                                                navigation.navigate("BookingRoom", {
                                                    hotel,
                                                    roomType: room.roomType,
                                                    startTime: route.params.startTime,
                                                    endTime: route.params.endTime,
                                                    roomNumber: route.params.roomNumber,
                                                });
                                            }}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
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

function RoomTypeItem({
    room,
    onPress,
}: {
    room: EmptyRoomType;
    onPress: () => void;
}) {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 10,
            }}
        >
            <Image
                source={{
                    uri: room.roomType.imageUrl,
                }}
                style={{ width: "100%", height: 160 }}
            />

            <View style={{ paddingVertical: 12 }}>
                <Text
                    style={{ fontWeight: "700", fontSize: 18, color: "black" }}
                    numberOfLines={2}
                >
                    {room.roomType.roomTypeName}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Icon source="ruler" size={15} />
                    <Text>{room.roomType.area} m²</Text>
                </View>
            </View>

            <Text
                style={{
                    textAlign: "right",
                    marginVertical: 10,
                }}
            >
                <Text
                    style={{
                        color: "#FF9900",
                        fontSize: 19,
                    }}
                >
                    {room.roomType.price}đ
                </Text>
                {" / đêm"}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                }}
            >
                <Text>Còn trống {room.emptyRoomCount} phòng</Text>
                <Button
                    style={{ backgroundColor: "#FF9900" }}
                    onPress={onPress}
                >
                    Chọn
                </Button>
            </View>
        </View>
    );
}
