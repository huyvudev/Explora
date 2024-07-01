import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { SearchedHotel } from "../../../types";
import { searchHotels } from "../../../services/api/hotel";
import { Icon } from "react-native-paper";

type Props = NativeStackScreenProps<AppUserStackParamList, "SearchedHotelList">;

export default function SearchedHotelListScreen({ navigation, route }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hotels, setHotels] = useState<SearchedHotel[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const result = await searchHotels({ ...route.params });

            setHotels(result);

            setIsLoading(false);

            navigation.setOptions({
                title: `Các khách sạn ở ${route.params.addressHotel}`,
            });
        })();
    }, [
        route.params.addressHotel,
        route.params.startTime,
        route.params.endTime,
        route.params.roomNumber,
    ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: 700, fontSize: 20 }}>
                    Các khách sạn ở {route.params.addressHotel}
                </Text>
            </View>

            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size={50} color="#FF9900" />
                </View>
            ) : (
                <ScrollView
                    style={{
                        flexDirection: "column",
                        gap: 20,
                        flex: 1,
                        marginVertical: 20,
                    }}
                >
                    {!hotels[0] && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>
                                Oops!, không tìm thấy khách sạn nào. Hãy thay
                                đổi tìm kiếm
                            </Text>
                        </View>
                    )}
                    {hotels.map((hotel) => (
                        <HotelItem
                            key={hotel.hotel.idHotel}
                            hotel={hotel}
                            onPressBook={() => {
                                navigation.navigate("HotelDetailBooking", {
                                    hotelId: hotel.hotel.idHotel,
                                    startTime: route.params.startTime,
                                    endTime: route.params.endTime,
                                    roomNumber: route.params.roomNumber,
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

function HotelItem({
    hotel,
    onPressBook,
}: {
    hotel: SearchedHotel;
    onPressBook: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPressBook}
            style={{
                backgroundColor: "white",
                padding: 10,
            }}
        >
            <Image
                source={{
                    uri: hotel.hotel.imageUrl,
                }}
                style={{ width: "100%", height: 200 }}
            />

            <View style={{ paddingVertical: 12 }}>
                <Text
                    style={{ fontWeight: "700", fontSize: 18, color: "black" }}
                    numberOfLines={2}
                >
                    {hotel.hotel.hotelName}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Icon source="map-marker" size={15} />
                    <Text>{hotel.hotel.addressHotel}</Text>
                </View>
            </View>

            <Text>Còn trống {hotel.emptyRoomCount} phòng</Text>
        </TouchableOpacity>
    );
}
