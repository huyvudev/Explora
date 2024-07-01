import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Bus } from "../../../types";
import * as utils from "../../../utils";
import { searchBus } from "../../../services/api/bus";

type Props = NativeStackScreenProps<AppUserStackParamList, "BusList">;

function BusItem({ bus, onPressBook }: { bus: Bus; onPressBook: () => void }) {
    return (
        <View
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
        >
            <Text style={{ fontWeight: 700, textAlign: "center" }}>
                {bus.idNhaXeNavigation.nhaXeName}
            </Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 30 }}>Đi: {bus.startPoint}</Text>
                <Text>Đến: {bus.endPoint}</Text>
            </View>

            <Text>Thời gian: {utils.toDateTimeString(bus.startTime)}</Text>
            <Text>Số ghế còn lại: {bus.emptySlot}</Text>
            <Text>Giá: {bus.price}/người</Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    style={{ backgroundColor: "#FF9900" }}
                    onPress={onPressBook}
                >
                    Đặt ngay
                </Button>
            </View>
        </View>
    );
}

export default function BusListScreen({ navigation, route }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bus, setBus] = useState<Bus[]>([]);

    useEffect(() => {
        const searchBusFunc = async () => {
            setIsLoading(true);

            const result = await searchBus({ ...route.params });

            setBus(result);

            setIsLoading(false);
        };

        searchBusFunc();
    }, [
        route.params.startPoint,
        route.params.endPoint,
        route.params.startTime,
    ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: 700, fontSize: 20 }}>
                    {route.params.startPoint}
                </Text>
                <Text
                    style={{
                        paddingHorizontal: 10,
                        fontWeight: 700,
                        fontSize: 20,
                    }}
                >
                    -
                </Text>
                <Text style={{ fontWeight: 700, fontSize: 20 }}>
                    {route.params.endPoint}
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
                <ScrollView>
                    <View
                        style={{
                            flexDirection: "column",
                            gap: 20,
                            flex: 1,
                            marginVertical: 20,
                        }}
                    >
                        {bus.length === 0 && (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Oops!, không tìm thấy chuyến xe nào</Text>
                            </View>
                        )}
                        {bus.map((bus) => (
                            <BusItem
                                key={bus.idBus}
                                bus={bus}
                                onPressBook={() =>
                                    navigation.navigate("BookingBus", {
                                        busId: bus.idBus,
                                    })
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
