import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import moment from "moment";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Button } from "react-native-paper";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import { createOrderRoom } from "../../../services/api/orderRoom";

type Props = NativeStackScreenProps<AppUserStackParamList, "BookingRoom">;

export default function BookingRoomScreen({ navigation, route }: Props) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const { hotel, roomType, startTime, endTime, roomNumber } = route.params;

    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            guessName: "",
            guessEmail: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsProcessing(true);
        try {
            await createOrderRoom({
                guessName: data.guessName,
                guessEmail: data.guessEmail,
                phoneNumber: data.phoneNumber,
                startTime,
                endTime,
                amount: roomNumber,
                idHotel: hotel.idHotel,
                roomTypeId: roomType.roomTypeId,
            });

            navigation.reset({
                index: 0,
                routes: [
                    { name: "BookingRoomSuccess" }
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
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingOverlay show={isProcessing} />

            <ScrollView>
                <Image
                    width={dimension.width}
                    height={170}
                    resizeMode="cover"
                    source={{
                        uri: route.params.roomType.imageUrl,
                    }}
                />

                <View style={{ padding: 20, marginBottom: 100 }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            shadowColor: "black",
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "700",
                                marginBottom: 10,
                            }}
                        >
                            Khách sạn {hotel.hotelName}
                        </Text>
                        <View>
                            <Text>
                                Nhận phòng:{" "}
                                {moment(startTime).format("DD/MM/YYYY")}
                            </Text>
                            <Text>
                                Trả phòng:{" "}
                                {moment(endTime).format("DD/MM/YYYY")}
                            </Text>
                        </View>

                        <View
                            style={{
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                ({roomNumber}x) {roomType.roomTypeName}
                            </Text>
                        </View>

                        <View
                            style={{
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <Text style={{ fontSize: 12 }}>
                            {" "}
                            - Đặt phòng này không được hoàn tiền
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {" "}
                            - Không áp dụng đổi lịch
                        </Text>
                    </View>

                    <View style={{ marginVertical: 30 }}>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                fontWeight: "700",
                                marginBottom: 15,
                            }}
                        >
                            Thông tin liên hệ
                        </Text>

                        <View
                            style={{
                                padding: 10,
                                backgroundColor: "white",
                                borderRadius: 10,
                                borderColor: "#FF9900",
                                borderWidth: 2,
                            }}
                        >
                            <ReactHookFormTextInput
                                id="guessName"
                                placeholder="Tên"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Ô này không được để trống.",
                                    },
                                }}
                                errors={errors}
                                iconName="person"
                            />

                            <ReactHookFormTextInput
                                id="guessEmail"
                                placeholder="Email"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Ô này không được để trống.",
                                    },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email không phù hợp.",
                                    },
                                }}
                                errors={errors}
                                iconName="email"
                            />

                            <ReactHookFormTextInput
                                id="phoneNumber"
                                placeholder="Số điện thoại"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Ô này không được để trống.",
                                    },
                                    pattern: {
                                        value: /^\d{8,}$/,
                                        message: "Số điện thoại không phù hợp.",
                                    },
                                }}
                                errors={errors}
                                iconName="local-phone"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Button
                style={{
                    backgroundColor: "#FF9900",
                    position: "absolute",
                    bottom: 20,
                    width: "100%",
                }}
                onPress={handleSubmit(onSubmit)}
            >
                Đặt ngay
            </Button>
        </SafeAreaView>
    );
}
