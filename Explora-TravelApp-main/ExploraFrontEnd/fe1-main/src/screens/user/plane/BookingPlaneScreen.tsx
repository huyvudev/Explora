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
import Toast from "react-native-toast-message";
import DatePicker from "react-native-date-picker";
import moment from "moment";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { Plane } from "../../../types";
import * as utils from "../../../utils";
import { getPlaneById } from "../../../services/api/plane";

type Props = NativeStackScreenProps<AppUserStackParamList, "BookingPlane">;

export default function BookingPlaneScreen({ navigation, route }: Props) {
    const [isLoadingPlane, setIsLoadingPlane] = useState<boolean>(false);
    const [plane, setPlane] = useState<Plane | null>(null);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "guess",
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        navigation.navigate("ConfirmBookingPlane", {
            plane: plane!,
            tickets: data.guess,
        });
    };

    const appendTicket = () => {
        append({
            guessName: "",
            guessEmail: "",
            phoneNumber: "",
            dateOfBirth: "",
            nationality: "",
            passpostNumber: "",
            expiredTime: "",
        });
    };

    const removeTicket = (index: number) => {
        if (fields.length > 1) {
            remove(index);

            Toast.show({
                type: "success",
                text2: "Đã xóa 1 vé",
            });
        } else {
            Alert.alert("", "Không thể xóa vé vì số lượng vé tối thiếu là 1");
        }
    };

    useEffect(() => {
        (async () => {
            setIsLoadingPlane(true);

            const result = await getPlaneById(route.params.planeId);
            setPlane(result);

            setIsLoadingPlane(false);
        })();

        if (fields.length === 0) appendTicket();
    }, [route.params.planeId]);

    if (isLoadingPlane) {
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
                        uri: "https://www.discover-airlines.com/imgproxy/default-md/www.discover-airlines.com/en/assets/fleet/A320-200_Motiv_02_2400x1600px_cut.jpg",
                    }}
                />

                {plane ? (
                    <View style={styles.body}>
                        <Text style={styles.nhaXeTitle}>
                            {plane.idAirlineNavigation.airlineName}
                        </Text>
                        <View style={styles.busInfo}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 30 }}>
                                    Đi: {plane.startPoint}
                                </Text>
                                <Text>Đến: {plane.endPoint}</Text>
                            </View>

                            <Text>
                                Thời gian:{" "}
                                {utils.toDateTimeString(plane.startTime)}
                            </Text>
                            <Text>Số ghế còn lại: {plane.emptySlot}</Text>
                            <Text>Giá: {plane.price}/người</Text>
                        </View>

                        {fields.map((item, index) => (
                            <GuestInfoForm
                                key={item.id}
                                index={index}
                                control={control}
                                errors={errors}
                                onRemove={() => removeTicket(index)}
                                setValue={setValue}
                            />
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
            {!isLoadingPlane && plane && (
                <Button style={styles.bookBtn} onPress={handleSubmit(onSubmit)}>
                    Đặt ngay
                </Button>
            )}
        </SafeAreaView>
    );
}

function GuestInfoForm({
    index,
    control,
    errors,
    onRemove,
    setValue,
}: {
    index: number;
    control: any;
    errors: any;
    onRemove: () => void;
    setValue: any;
}) {
    const [birthDatePickerVisible, setBirthDatePickerVisible] =
        useState<boolean>(false);
    const [expiredTimePickerVisible, setExpiredTimePickerVisible] =
        useState<boolean>(false);

    const [birthDate, setBirthDate] = useState<string>();
    const [expiredTime, setExpiredTime] = useState<string>();

    return (
        <View style={styles.guestInfo}>
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
                            message: "Ô này không được để trống",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
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
                        !!(errors.guess as any)[index]?.guessName?.message
                    }
                >
                    {errors &&
                        errors.guess &&
                        ((errors.guess as any)[index]?.guessName
                            ?.message as string)}
                </HelperText>
            </View>

            {/* Guest Email Input */}
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Ô này không được để trống",
                        },
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email không phù hợp.",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
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
                        !!(errors.guess as any)[index]?.guessEmail?.message
                    }
                >
                    {errors &&
                        errors.guess &&
                        ((errors.guess as any)[index]?.guessEmail
                            ?.message as string)}
                </HelperText>
            </View>

            {/* Guest Phone Number Input */}
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Ô này không được để trống",
                        },
                        pattern: {
                            value: /^\d{8,}$/,
                            message: "Phone Number không phù hợp.",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
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
                        !!(errors.guess as any)[index]?.phoneNumber?.message
                    }
                >
                    {errors &&
                        errors.guess &&
                        ((errors.guess as any)[index]?.phoneNumber
                            ?.message as string)}
                </HelperText>
            </View>

            {/* Guess Brithdate input */}
            <TouchableOpacity onPress={() => setBirthDatePickerVisible(true)}>
                <View>
                    <Controller
                        name={`guess.${index}.dateOfBirth`}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Trường này không được để trống.",
                            },
                        }}
                        render={(value) => (
                            <TextInput
                                value={
                                    birthDate &&
                                    new Date(birthDate).toLocaleDateString()
                                }
                                placeholder="Ngày sinh"
                                editable={false} 
                            />
                        )}
                    />
                    <HelperText
                        type="error"
                        visible={
                            errors?.guess &&
                            !!(errors.guess as any)[index]?.dateOfBirth?.message
                        }
                    >
                        {errors &&
                            errors.guess &&
                            ((errors.guess as any)[index]?.dateOfBirth
                                ?.message as string)}
                    </HelperText>
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                mode="date"
                open={birthDatePickerVisible}
                title="Chọn ngày sinh"
                date={birthDate ? new Date(birthDate) : new Date()}
                onConfirm={(date) => {
                    setValue(
                        `guess.${index}.dateOfBirth`,
                        moment(date).format("YYYY-MM-DD")
                    );
                    setBirthDate(moment(date).format("YYYY-MM-DD"));
                    setBirthDatePickerVisible(false);
                }}
                onCancel={() => setBirthDatePickerVisible(false)}
            />

            {/* Guest Nationality Input */}
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Ô này không được để trống",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Quốc tịch"
                        />
                    )}
                    name={`guess.${index}.nationality`}
                />
                <HelperText
                    type="error"
                    visible={
                        errors?.guess &&
                        !!(errors.guess as any)[index]?.nationality?.message
                    }
                >
                    {errors &&
                        errors.guess &&
                        ((errors.guess as any)[index]?.nationality
                            ?.message as string)}
                </HelperText>
            </View>

            {/* Guest passpostNumber Input */}
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Ô này không được để trống",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Số hộ chiếu"
                        />
                    )}
                    name={`guess.${index}.passpostNumber`}
                />
                <HelperText
                    type="error"
                    visible={
                        errors?.guess &&
                        !!(errors.guess as any)[index]?.passpostNumber?.message
                    }
                >
                    {errors &&
                        errors.guess &&
                        ((errors.guess as any)[index]?.passpostNumber
                            ?.message as string)}
                </HelperText>
            </View>

            {/* Guess expiredTime input */}
            <TouchableOpacity onPress={() => setExpiredTimePickerVisible(true)}>
                <View>
                    <Controller
                        name={`guess.${index}.expiredTime`}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Trường này không được để trống.",
                            },
                        }}
                        render={(value) => (
                            <TextInput
                                value={
                                    expiredTime &&
                                    new Date(expiredTime).toLocaleDateString()
                                }
                                placeholder="Ngày hết hạn"
                                editable={false} 
                            />
                        )}
                    />
                    <HelperText
                        type="error"
                        visible={
                            errors?.guess &&
                            !!(errors.guess as any)[index]?.expiredTime?.message
                        }
                    >
                        {errors &&
                            errors.guess &&
                            ((errors.guess as any)[index]?.expiredTime
                                ?.message as string)}
                    </HelperText>
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                mode="date"
                open={expiredTimePickerVisible}
                title="Chọn ngày hết hạn"
                date={expiredTime ? new Date(expiredTime) : new Date()}
                onConfirm={(date) => {
                    setValue(
                        `guess.${index}.expiredTime`,
                        moment(date).format("YYYY-MM-DD")
                    );
                    setExpiredTime(moment(date).format("YYYY-MM-DD"));
                    setExpiredTimePickerVisible(false);
                }}
                onCancel={() => setExpiredTimePickerVisible(false)}
            />

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
                    onPress={onRemove}
                >
                    Xóa
                </Button>
            </View>
        </View>
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
