import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import { Bus } from "../../../types";
import AppTextInput from "../../../components/Input/AppTextInput";
import DatePicker from "react-native-date-picker";
import useBusStore from "../../../stores/useBusStore";
import { getBusById } from "../../../services/api/bus";

type Props = NativeStackScreenProps<AppAdminStackParamList, "UpdateBus">;

export default function UpdateBusScreen({ navigation, route }: Props) {
    const [isLoadingBus, setIsLoadingBus] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] =
        useState<boolean>(false);
    const [bus, setBus] = useState<Bus | null>(null);
    
    const dimension = useWindowDimensions();
    const updateBus = useBusStore((state) => state.updateBus);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            price: "",
            startTime: "",
        },
    });
    const time = watch("startTime");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsUpdating(true);
        try {
            await updateBus(route.params.busId, {
                price: data.price,
                startTime: data.startTime,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập chuyến xe`,
            });

            navigation.pop();
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response?.data?.message ?? "Có lỗi xảy ra",
            });
        }
        setIsUpdating(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        const loadBus = async () => {
            setIsLoadingBus(true);

            const data = await getBusById(route.params.busId);

            if (data) {
                setBus(data);

                setValue("price", data.price.toString());
                setValue("startTime", data.startTime);
            }

            setIsLoadingBus(false);
        }

        loadBus();
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
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isUpdating} />

            <Image
                width={dimension.width}
                height={170}
                resizeMode="cover"
                source={{
                    uri: "https://vtv1.mediacdn.vn/zoom/640_400/2022/3/13/anh-chup-man-hinh-2022-03-13-luc-165256-16471651872591300529708.png",
                }}
            />

            {bus ? (
                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="directions-bus"
                                value={bus.busName}
                                editable={false}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="directions-bus"
                                value={bus.startPoint}
                                editable={false}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="directions-bus"
                                value={bus.endPoint}
                                editable={false}
                            />
                        </View>
                        <ReactHookFormTextInput
                            id="price"
                            placeholder="Giá tiền"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                                validate: (value) =>
                                    +value >= 0 ||
                                    "Giá tiền không được nhỏ hơn 0",
                            }}
                            errors={errors}
                            iconName="attach-money"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity onPress={showDatePicker}>
                            <View>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Trường này không được để trống.",
                                        },
                                    }}
                                    render={( value ) => (
                                        <AppTextInput 
                                            placeholder="Thời gian khởi hành"
                                            iconName="access-time"
                                            editable={false}
                                            value={time && new Date(time).toLocaleString()}
                                        />
                                    )}
                                />
                                <HelperText type="error" visible={errors && !!errors["startTime"]?.message}>
                                    {errors && errors["startTime"] && (errors["startTime"]?.message as string)}
                                </HelperText>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={isDatePickerVisible}
                            title="Chọn thời gian khởi hành"
                            minimumDate={new Date()}
                            date={time ? new Date(time) : new Date()}
                            onConfirm={(date) => {
                                setValue("startTime", moment(date).format('YYYY-MM-DDTHH:mm:ss'));
                                hideDatePicker();
                            }}
                            onCancel={hideDatePicker}
                        />
                    </View>

                    <Button
                        style={{ backgroundColor: "#FF9900" }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Update
                    </Button>
                </View>
            ): (
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
});
