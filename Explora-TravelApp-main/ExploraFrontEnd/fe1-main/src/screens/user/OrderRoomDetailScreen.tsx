import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import moment from "moment";

import { AppUserStackParamList } from "../../navigation/AppUserStack";

type Props = NativeStackScreenProps<AppUserStackParamList, "OrderRoomDetail">;

export default function OrderRoomDetailScreen({ navigation, route }: Props) {
    const order = route.params.orderRoom;

    return (
        <SafeAreaView style={styles.container}>
                <ScrollView style={styles.body}>
                    <View style={{
                        ...styles.block,
                        backgroundColor: "#ffb3ad",
                    }}>
                        <View>
                            <Text>Ngày nhận phòng: {moment(order.startTime).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View>
                            <Text>Ngày trả phòng: {moment(order.endTime).format("DD/MM/YYYY")}</Text>
                        </View>
                    </View>
                    <View style={styles.block}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <Text>
                                    Loaị phòng:
                                </Text>
                                <Text style={{ fontWeight: "700" }}>
                                    {order.tRooms[0]?.roomType?.roomTypeName}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    Số phòng:
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
                                {moment(order.buyTime).format("HH:mm DD/MM/YYYY")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
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
