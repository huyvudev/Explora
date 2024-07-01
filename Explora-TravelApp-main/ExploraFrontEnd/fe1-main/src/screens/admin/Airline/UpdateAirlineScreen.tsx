import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import useAirlineStore from "../../../stores/useAirlineStore";
import { Airline } from "../../../types";
import { getAirlineById } from "../../../services/api/airline";
import AppTextInput from "../../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AppAdminStackParamList, "UpdateAirline">;

export default function UpdateAirlineScreen({ navigation, route }: Props) {
    const [isLoadingAirline, setIsLoadingAirline] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [airline, setAirline] = useState<Airline | null>(null);

    const dimension = useWindowDimensions();
    
    const updateAirline = useAirlineStore((state) => state.updateAirline);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            addressAirline: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsUpdating(true);
        try {
            await updateAirline(route.params.airlineId, {
                email: data.email,
                addressAirline: data.addressAirline,
                phoneNumber: data.phoneNumber,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập hãng hàng không ${airline?.airlineName}`,
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

    useEffect(() => {
        const loadAirline = async () => {
            setIsLoadingAirline(true);

            const data = await getAirlineById(route.params.airlineId);

            if (data) {
                setAirline(data);

                setValue("email", data.email);
                setValue("addressAirline", data.addressAirline);
                setValue("phoneNumber", data.phoneNumber);

                navigation.setOptions({ title: `Edit ${data.airlineName}` });
            }

            setIsLoadingAirline(false);
        }

        loadAirline();
    }, [route.params.airlineId]);

    if (isLoadingAirline) {
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

            {airline ? (
                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="airplanemode-active"
                                value={airline.airlineName}
                                editable={false}
                            />
                        </View>

                        <ReactHookFormTextInput
                            id="email"
                            placeholder="Email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email không được để trống.",
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
                            id="addressAirline"
                            placeholder="Airline Address"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Address không được để trống.",
                                },
                            }}
                            errors={errors}
                            iconName="add-location"
                        />

                        <ReactHookFormTextInput
                            id="phoneNumber"
                            placeholder="Phone Number"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Phone Number không được để trống.",
                                },
                                pattern: {
                                    value: /^\d{8,}$/,
                                    message: "Phone Number không phù hợp.",
                                },
                            }}
                            errors={errors}
                            iconName="local-phone"
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
