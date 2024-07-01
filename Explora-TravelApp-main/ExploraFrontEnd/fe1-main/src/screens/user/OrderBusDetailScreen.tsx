import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useEffect, useState } from "react";

import { AppUserStackParamList } from "../../navigation/AppUserStack";
import { OrderBus } from "../../types";
import { getOrderBusById } from "../../services/api/orderBus";
import * as utils from "../../utils";

type Props = NativeStackScreenProps<AppUserStackParamList, "OrderBusDetail">;

export default function OrderBusDetailScreen({ navigation, route }: Props) {
    const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderBus | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoadingOrder(true);

            const result = await getOrderBusById(route.params.orderBusId);

            setOrder(result);
            setIsLoadingOrder(false);
        })();
    }, [route.params.orderBusId]);

    if (isLoadingOrder) {
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
            {order ? (
                <ScrollView style={styles.body}>
                    <View style={{
                        ...styles.block,
                        backgroundColor: "#ffb3ad",
                    }}>
                        <View>
                            <Text>Đi từ: {order.idBusNavigation.startPoint}</Text>
                        </View>
                        <View>
                            <Text>Đến: {order.idBusNavigation.endPoint}</Text>
                        </View>
                        <View>
                            <Text>Thời gian: {utils.toDateTimeString(order.idBusNavigation.startTime)}</Text>
                        </View>
                    </View>
                    <View style={styles.block}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <Text>
                                    Loaị xe:
                                </Text>
                                <Text style={{ fontWeight: "700" }}>
                                    Ghế ngồi {order.idBusNavigation.slot} chỗ
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    Số vé:
                                </Text>
                                <Text style={{ fontWeight: "700" }}>
                                    {order.amount}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    Trạng thái:
                                </Text>
                                <Text style={{ fontWeight: "700" }}>
                                    Còn hạn
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.block}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text>Tổng tiền</Text>
                            <Text style={{ fontWeight: "700" }}>{order.totalPrice}đ</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text>Thời gian giao dịch</Text>
                            <Text style={{ fontWeight: "700" }}>
                                {utils.toDateTimeString(order.buyTime)}
                            </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    body: {
        paddingHorizontal: 20,
    },
    block: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#FF9900",
        borderWidth: 2,
    },
});
