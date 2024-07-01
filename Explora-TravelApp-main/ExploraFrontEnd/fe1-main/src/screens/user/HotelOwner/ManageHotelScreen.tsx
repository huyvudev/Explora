import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon } from "react-native-paper";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Hotel } from "../../../types";
import useOwnerHotelStore from "../../../stores/useOwnerHotelStore";

type Props = NativeStackScreenProps<AppUserStackParamList, "ManageHotel">;

export default function ManageHotelScreen({ navigation }: Props) {
    const { isLoading, hotels, loadAllHotels } = useOwnerHotelStore(
        (state) => ({
            isLoading: state.isLoading,
            hotels: state.ownerHotels,
            loadAllHotels: state.loadAllHotels,
        })
    );

    useEffect(() => {
        loadAllHotels();
    }, []);

    if (isLoading) {
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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text
                    style={{
                        color: "#FF9900",
                        fontSize: 18,
                        fontWeight: "700",
                        marginBottom: 30,
                    }}
                >
                    Khách sạn của bạn
                </Text>

                <View
                    style={{
                        flexDirection: "column",
                        gap: 20,
                        flex: 1,
                    }}
                >
                    {hotels[0] ? (
                        hotels.map((hotel) => (
                            <HotelItem
                                key={hotel.idHotel}
                                hotel={hotel}
                                onTap={() => {
                                    navigation.navigate("HotelDetail", {
                                        hotelId: hotel.idHotel,
                                    });
                                }}
                            />
                        ))
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>
                                Bạn chưa có khách sạn nào, hãy ấn vào nút trên
                                góc phải trên cùng để thêm khách sạn bạn đang sở
                                hữu và bắt đầu nhé
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function HotelItem({ hotel, onTap }: { hotel: Hotel; onTap: () => void }) {
    return (
        <TouchableOpacity onPress={onTap} style={styles.hotel}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <Text
                        style={{
                            fontSize: 18,
                        }}
                        numberOfLines={1}
                    >
                        {hotel.hotelName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                        }}
                        numberOfLines={1}
                    >
                        {hotel.addressHotel}
                    </Text>
                </View>

                <Icon source="arrow-right" size={30} color="#FF9900" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    hotel: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
    },
});
