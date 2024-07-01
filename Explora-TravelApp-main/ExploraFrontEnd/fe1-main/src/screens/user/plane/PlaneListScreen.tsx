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
import { Plane } from "../../../types";
import * as utils from "../../../utils";
import { searchPlanes } from "../../../services/api/plane";

type Props = NativeStackScreenProps<AppUserStackParamList, "PlaneList">;

function PlaneItem({ plane, onPressBook }: { plane: Plane; onPressBook: () => void }) {
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
                {plane.idAirlineNavigation.airlineName}
            </Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 30 }}>Đi: {plane.startPoint}</Text>
                <Text>Đến: {plane.endPoint}</Text>
            </View>

            <Text>Thời gian: {utils.toDateTimeString(plane.startTime)}</Text>
            <Text>Số ghế còn lại: {plane.emptySlot}</Text>
            <Text>Giá: {plane.price}/người</Text>

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

export default function PlaneListScreen({ navigation, route }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [planes, setPlanes] = useState<Plane[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const result = await searchPlanes({ ...route.params });

            setPlanes(result);

            setIsLoading(false);
        })();
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
                        {planes.length === 0 && (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Oops!, không tìm thấy chuyến bay nào</Text>
                            </View>
                        )}
                        {planes.map((plane) => (
                            <PlaneItem
                                key={plane.idPlane}
                                plane={plane}
                                onPressBook={() =>
                                    navigation.navigate("BookingPlane", {
                                        planeId: plane.idPlane,
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
