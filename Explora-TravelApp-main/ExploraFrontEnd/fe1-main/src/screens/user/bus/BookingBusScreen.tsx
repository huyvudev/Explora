import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { Button, HelperText, Icon, TextInput } from "react-native-paper";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Bus } from "../../../types";
import { getBusById } from "../../../services/api/bus";
import * as utils from "../../../utils";

type Props = NativeStackScreenProps<AppUserStackParamList, "BookingBus">;

export default function BookingBusScreen({ navigation, route }: Props) {
    const [isLoadingBus, setIsLoadingBus] = useState<boolean>(false);
    const [bus, setBus] = useState<Bus | null>(null);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "guess",
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        navigation.navigate("ConfirmBookingBus", {
            bus: bus!,
            tickets: data.guess
        });
    };

    const appendTicket = () => {
        append({
            guessName: "",
            guessEmail: "",
            phoneNumber: "",
        });
    };

    const removeTicket = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            Alert.alert("", "Không thể xóa vé vì số lượng vé tối thiếu là 1");
        }
    };

    useEffect(() => {
        const loadBus = async () => {
            setIsLoadingBus(true);

            const result = await getBusById(route.params.busId);
            setBus(result);

            setIsLoadingBus(false);
        };
        loadBus();

        if (fields.length === 0) appendTicket();
    }, [route.params.busId]);

    if (isLoadingBus) {
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
                <Image
                    width={dimension.width}
                    height={170}
                    resizeMode="cover"
                    source={{
                        uri: "https://media.timeout.com/images/106045805/750/422/image.jpg",
                    }}
                />

                {bus ? (
                    <View style={styles.body}>
                        <Text style={styles.nhaXeTitle}>
                            {bus.idNhaXeNavigation.nhaXeName}
                        </Text>
                        <View style={styles.busInfo}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 30 }}>
                                    Đi: {bus.startPoint}
                                </Text>
                                <Text>Đến: {bus.endPoint}</Text>
                            </View>

                            <Text>
                                Thời gian:{" "}
                                {utils.toDateTimeString(bus.startTime)}
                            </Text>
                            <Text>Số ghế còn lại: {bus.emptySlot}</Text>
                            <Text>Giá: {bus.price}/người</Text>
                        </View>

                        {fields.map((item, index) => (
                            <View key={item.id} style={styles.guestInfo}>
                                <Text
                                    style={{
                                        color: "#FF9900",
                                        fontSize: 16,
                                        marginBottom: 15,
                                    }}
                                >
                                    Thông tin hành khách thứ {index + 1}
                                </Text>

                                {/* Guest Name Input */}
                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Ô này không được để trống",
                                            },
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <TextInput
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder="Tên hành khách"
                                            />
                                        )}
                                        name={`guess.${index}.guessName`}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={
                                            errors?.guess &&
                                            !!(errors.guess as any)[index]
                                                ?.guessName?.message
                                        }
                                    >
                                        {errors &&
                                            errors.guess &&
                                            ((errors.guess as any)[index]
                                                ?.guessName?.message as string)}
                                    </HelperText>
                                </View>

                                {/* Guest Email Input */}
                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Ô này không được để trống",
                                            },
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "Email không phù hợp.",
                                            },
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <TextInput
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder="Email"
                                            />
                                        )}
                                        name={`guess.${index}.guessEmail`}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={
                                            errors?.guess &&
                                            !!(errors.guess as any)[index]
                                                ?.guessEmail?.message
                                        }
                                    >
                                        {errors &&
                                            errors.guess &&
                                            ((errors.guess as any)[index]
                                                ?.guessEmail?.message as string)}
                                    </HelperText>
                                </View>

                                {/* Guest Phone Number Input */}
                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Ô này không được để trống",
                                            },
                                            pattern: {
                                                value: /^\d{8,}$/,
                                                message:
                                                    "Phone Number không phù hợp.",
                                            },
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <TextInput
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder="Số điện thoại"
                                            />
                                        )}
                                        name={`guess.${index}.phoneNumber`}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={
                                            errors?.guess &&
                                            !!(errors.guess as any)[index]
                                                ?.phoneNumber?.message
                                        }
                                    >
                                        {errors &&
                                            errors.guess &&
                                            ((errors.guess as any)[index]
                                                ?.phoneNumber
                                                ?.message as string)}
                                    </HelperText>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "#ed3c2f",
                                        }}
                                        textColor="white"
                                        onPress={() => removeTicket(index)}
                                    >
                                        Xóa
                                    </Button>
                                </View>
                            </View>
                        ))}

                        <TouchableOpacity
                            onPress={appendTicket}
                            style={{
                                marginVertical: 20,
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <Icon source="plus-thick" size={30} />
                            <Text>Thêm vé</Text>
                        </TouchableOpacity>
                    </View>
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
            </ScrollView>
            {!isLoadingBus && bus && (
                <Button style={styles.bookBtn} onPress={handleSubmit(onSubmit)}>
                    Đặt ngay
                </Button>
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
        padding: 20,
        marginBottom: 150,
    },
    nhaXeTitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
    },
    busInfo: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#FF9900",
        borderWidth: 2,
        marginVertical: 20,
    },
    infoText: {},
    bookBtn: {
        backgroundColor: "#FF9900",
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
    guestInfo: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#FF9900",
        borderWidth: 2,
        marginVertical: 20,
    },
});
