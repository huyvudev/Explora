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
import { useEffect, useState } from "react";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { OrderBus, OrderPlane, OrderRoom } from "../../../types";
import { getOrderBusOfCurrentUser } from "../../../services/api/orderBus";
import * as utils from "../../../utils";
import { getOrderPlanesOfCurrentUser } from "../../../services/api/orderPlane";
import { getOrderRoomsOfCurrentUser } from "../../../services/api/orderRoom";
import moment from "moment";

type Props = NativeStackScreenProps<AppUserStackParamList, "Profile">;

export default function OrderHistoryTab({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<"bus" | "plane" | "room">("bus");
    const [orderBus, setOrderBus] = useState<OrderBus[]>();
    const [orderPlanes, setOrderPlanes] = useState<OrderPlane[]>();
    const [orderRooms, setOrderRooms] = useState<OrderRoom[]>();

    useEffect(() => {
        if (orderType === "bus") {
            (async () => {
                setIsLoading(true);

                const result = await getOrderBusOfCurrentUser();

                setOrderBus(result);
                setOrderPlanes(undefined);
                setOrderRooms(undefined);

                setIsLoading(false);
            })();
        } else if (orderType === "plane") {
            (async () => {
                setIsLoading(true);

                const result = await getOrderPlanesOfCurrentUser();

                setOrderPlanes(result);
                setOrderBus(undefined);
                setOrderRooms(undefined);

                setIsLoading(false);
            })();
        } else if (orderType === "room") {
            (async () => {
                setIsLoading(true);

                const result = await getOrderRoomsOfCurrentUser();

                setOrderRooms(result);
                setOrderBus(undefined);
                setOrderPlanes(undefined);

                setIsLoading(false);
            })();
        }
    }, [orderType]);

    const render = () => {
        if (orderType === "bus" && orderBus) {
            return (
                <View
                    style={{
                        flexDirection: "column",
                        gap: 15,
                    }}
                >
                    {!orderBus[0] && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>Bạn chưa đặt chuyến xe nào</Text>
                        </View>
                    )}
                    {orderBus.map((order) => (
                        <OrderBusItem
                            key={order.orderId}
                            orderBus={order}
                            onTap={() => {
                                navigation.navigate("OrderBusDetail", {
                                    orderBusId: order.orderId,
                                });
                            }}
                        />
                    ))}
                </View>
            );
        }

        if (orderType === "plane" && orderPlanes) {
            return (
                <View
                    style={{
                        flexDirection: "column",
                        gap: 15,
                    }}
                >
                    {!orderPlanes[0] && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>Bạn chưa đặt chuyến bay nào</Text>
                        </View>
                    )}
                    {orderPlanes.map((order) => (
                        <OrderPlaneItem
                            key={order.orderId}
                            orderPlane={order}
                            onTap={() => {
                                navigation.navigate("OrderPlaneDetail", {
                                    orderPlaneId: order.orderId,
                                });
                            }}
                        />
                    ))}
                </View>
            );
        }

        if (orderType === "room" && orderRooms) {
            return (
                <View
                    style={{
                        flexDirection: "column",
                        gap: 15,
                    }}
                >
                    {!orderRooms[0] && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>Bạn chưa đặt phòng nào</Text>
                        </View>
                    )}
                    {orderRooms.map((order) => (
                        <OrderRoomItem
                            key={order.billId}
                            orderRoom={order}
                            onTap={() => {
                                navigation.navigate("OrderRoomDetail", {
                                    orderRoom: order
                                });
                            }}
                        />
                    ))}
                </View>
            );
        }

        return <View></View>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabsHolder}>
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor:
                            orderType === "bus" ? "#FF9900" : "#DDDDDD",
                    }}
                    onPress={() => {
                        if (!isLoading) setOrderType("bus");
                    }}
                >
                    <Text>Vé xe khách</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor:
                            orderType === "plane" ? "#FF9900" : "#DDDDDD",
                    }}
                    onPress={() => {
                        if (!isLoading) setOrderType("plane");
                    }}
                >
                    <Text>Vé máy bay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor:
                            orderType === "room" ? "#FF9900" : "#DDDDDD",
                    }}
                    onPress={() => {
                        if (!isLoading) setOrderType("room");
                    }}
                >
                    <Text>Vé phòng khách sạn</Text>
                </TouchableOpacity>
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
                <ScrollView style={{ marginVertical: 30 }}>
                    {render()}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

function OrderPlaneItem({
    orderPlane,
    onTap,
}: {
    orderPlane: OrderPlane;
    onTap: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onTap}
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
        >
            <Text
                style={{
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >
                {orderPlane.idPlaneNavigation?.idAirlineNavigation?.airlineName}
            </Text>

            <Text style={{ fontWeight: 400 }}>
                {orderPlane.idPlaneNavigation.startPoint}
                {" - "}
                {orderPlane.idPlaneNavigation.endPoint}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Thời gian:{" "}
                {utils.toDateTimeString(orderPlane.idPlaneNavigation.startTime)}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Tổng cộng: {orderPlane.totalPrice}đ
            </Text>
        </TouchableOpacity>
    );
}

function OrderBusItem({
    orderBus,
    onTap,
}: {
    orderBus: OrderBus;
    onTap: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onTap}
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
        >
            <Text
                style={{
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >
                {orderBus.idBusNavigation.idNhaXeNavigation.nhaXeName}
            </Text>

            <Text style={{ fontWeight: 400 }}>
                {orderBus.idBusNavigation.startPoint}
                {" - "}
                {orderBus.idBusNavigation.endPoint}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Thời gian:{" "}
                {utils.toDateTimeString(orderBus.idBusNavigation.startTime)}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Tổng cộng: {orderBus.totalPrice}đ
            </Text>
        </TouchableOpacity>
    );
}

function OrderRoomItem({
    orderRoom,
    onTap,
}: {
    orderRoom: OrderRoom;
    onTap: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onTap}
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
        >
            <Text
                style={{
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >
                {orderRoom.hotel.hotelName}
            </Text>

            <Text style={{ fontWeight: 400 }}>
                Ngày nhận phòng:{" "}
                {moment(orderRoom.startTime).format("DD/MM/YYYY")}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Ngày trả phòng:{" "}
                {moment(orderRoom.endTime).format("DD/MM/YYYY")}
            </Text>
            <Text style={{ fontWeight: 400 }}>
                Tổng cộng: {orderRoom.totalPrice}đ
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    tabsHolder: {
        flexDirection: "row",
        gap: 5,
    },
    button: {
        alignItems: "center",
        padding: 10,
    },
});
