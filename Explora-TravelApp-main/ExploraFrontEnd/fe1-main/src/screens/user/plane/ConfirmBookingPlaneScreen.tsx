import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useMemo, useState } from "react";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import moment from "moment";

import * as utils from "../../../utils";
import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { createOrderPlane } from "../../../services/api/orderPlane";

type Props = NativeStackScreenProps<AppUserStackParamList, "ConfirmBookingPlane">;

export default function ConfirmBookingPlaneScreen({ navigation, route }: Props) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const amount = useMemo(() => route.params.tickets.length, []);
    const total = useMemo(() => route.params.plane.price * amount, []);

    const dimension = useWindowDimensions();

    const handleBooking = async () => {
        setIsProcessing(true);

        try {
            await createOrderPlane({
                idPlane: route.params.plane.idPlane,
                amount,
                createPlaneTicketDtos: route.params.tickets
            });
            
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Đặt vé thành công"
            });

            navigation.reset({
                index: 0,
                routes: [
                    { name: "BookingPlaneSuccess" }
                ]
            });
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response?.data?.message ?? "Có lỗi xảy ra",
            });
        }

        setIsProcessing(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isProcessing} />

            <ScrollView>
                <Image
                    width={dimension.width}
                    height={170}
                    resizeMode="cover"
                    source={{
                        uri: "https://www.discover-airlines.com/imgproxy/default-md/www.discover-airlines.com/en/assets/fleet/A320-200_Motiv_02_2400x1600px_cut.jpg",
                    }}
                />

                <View style={styles.body}>
                    <Text
                        style={{
                            color: "#FF9900",
                            fontSize: 22,
                            marginBottom: 30,
                        }}
                    >
                        Xác thực thông tin đặt vé
                    </Text>

                    <Text style={{}}>
                        Hãng máy bay: {route.params.plane.idAirlineNavigation.airlineName}
                    </Text>
                    <Text style={{}}>Đi từ: {route.params.plane.startPoint}</Text>
                    <Text style={{}}>Đến: {route.params.plane.endPoint}</Text>
                    <Text style={{}}>
                        Giờ khởi hành:{" "}
                        {utils.toDateTimeString(route.params.plane.startTime)}
                    </Text>
                    <Text style={{}}>Số lượng vé: {amount}</Text>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        Tổng cộng: {total}đ
                    </Text>

                    <View
                        style={{
                            marginVertical: 30,
                        }}
                    >
                        <Text
                            style={{
                                color: "#FF9900",
                                fontSize: 18,
                                marginBottom: 20,
                            }}
                        >
                            Thông tin hành khách:
                        </Text>

                        {route.params.tickets.map((ticket, index) => (
                            <View
                                key={index}
                                style={{
                                    marginBottom: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "600",
                                    }}
                                >
                                    *** Hành khách thứ {index + 1}
                                </Text>
                                <View style={{ marginLeft: 20 }}>
                                    <Text> - Tên: {ticket.guessName}</Text>
                                    <Text> - Email: {ticket.guessEmail}</Text>
                                    <Text>
                                        {" "}
                                        - Số điện thoại: {ticket.phoneNumber}
                                    </Text>
                                    <Text> - Ngày sinh: {moment(ticket.dateOfBirth).format("DD-MM-YYYY")}</Text>
                                    <Text> - Quốc tịch: {ticket.nationality}</Text>
                                    <Text> - Số hộ chiếu: {ticket.passpostNumber}</Text>
                                    <Text> - Ngày hết hạn: {moment(ticket.expiredTime).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <Button style={styles.bookBtn} onPress={handleBooking}>
                Đặt ngay
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    body: {
        padding: 20,
        marginBottom: 150,
    },
    bookBtn: {
        backgroundColor: "#FF9900",
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
});
