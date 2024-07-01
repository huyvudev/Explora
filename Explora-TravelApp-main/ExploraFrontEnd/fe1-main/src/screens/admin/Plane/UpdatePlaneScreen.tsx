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
import DatePicker from "react-native-date-picker";
import moment from "moment";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import { Plane } from "../../../types";
import AppTextInput from "../../../components/Input/AppTextInput";
import { getPlaneById } from "../../../services/api/plane";
import usePlaneStore from "../../../stores/usePlaneStore";

type Props = NativeStackScreenProps<AppAdminStackParamList, "UpdatePlane">;

export default function UpdatePlaneScreen({ navigation, route }: Props) {
    const [isLoadingPlane, setIsLoadingPlane] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] =
        useState<boolean>(false);
    const [plane, setPlane] = useState<Plane | null>(null);
    
    const dimension = useWindowDimensions();
    const updatePlane = usePlaneStore((state) => state.updatePlane);

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
            await updatePlane(route.params.planeId, {
                price: data.price,
                startTime: data.startTime,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập chuyến bay`,
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
        const loadPlane = async () => {
            setIsLoadingPlane(true);

            const data = await getPlaneById(route.params.planeId);

            if (data) {
                setPlane(data);

                setValue("price", data.price.toString());
                setValue("startTime", data.startTime);
            }

            setIsLoadingPlane(false);
        }

        loadPlane();
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
                    uri: "https://www.discover-airlines.com/imgproxy/default-md/www.discover-airlines.com/en/assets/fleet/A320-200_Motiv_02_2400x1600px_cut.jpg",
                }}
            />

            {plane ? (
                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="airplanemode-active"
                                value={plane.planeName}
                                editable={false}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="airplanemode-active"
                                value={plane.startPoint}
                                editable={false}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="airplanemode-active"
                                value={plane.endPoint}
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
