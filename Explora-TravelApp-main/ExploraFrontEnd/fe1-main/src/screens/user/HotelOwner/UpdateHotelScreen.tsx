import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import Toast from "react-native-toast-message";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import useOwnerHotelStore from "../../../stores/useOwnerHotelStore";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import AppTextInput from "../../../components/Input/AppTextInput";
import { Hotel } from "../../../types";
import { getHotelById } from "../../../services/api/hotel";
import ImagePicker from "../../../components/ImagePicker";

type Props = NativeStackScreenProps<AppUserStackParamList, "UpdateHotel">;

export default function UpdateHotelScreen({ navigation, route }: Props) {
    const [isLoadingHotel, setIsLoadingHotel] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const updateHotel = useOwnerHotelStore((state) => state.updateHotel);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            addressHotel: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsUpdating(true);
        try {
            await updateHotel(route.params.hotelId, {
                email: data.email,
                addressHotel: data.addressHotel,
                phoneNumber: data.phoneNumber,
                image: data.image,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập khách sạn ${hotel?.hotelName}`,
            });

            if (route.params.onUpdated) route.params.onUpdated();

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
        (async () => {
            setIsLoadingHotel(true);

            const result = await getHotelById(route.params.hotelId);

            setHotel(result);
            setIsLoadingHotel(false);
            navigation.setOptions({
                title: `Cập nhập khách sạn ${result?.hotelName}`,
            });

            setValue("email", result?.email);
            setValue("addressHotel", result?.addressHotel);
            setValue("phoneNumber", result?.phoneNumber);
        })();
    }, [route.params.hotelId]);

    if (isLoadingHotel) {
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
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingOverlay show={isUpdating} />

            {hotel ? (
                <>
                    <ImagePicker
                        iconSize={80}
                        initialImageUrl={hotel.imageUrl}
                        onImageChange={(image) => {
                            setValue("image", image);
                        }}
                    />

                    <View style={{ padding: 20 }}>
                        <View style={{ marginVertical: 40 }}>
                            <View style={{ marginBottom: 20 }}>
                                <AppTextInput
                                    iconName="apartment"
                                    value={hotel.hotelName}
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
                                id="addressHotel"
                                placeholder="Địa chỉ"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Ô này không được để trống.",
                                    },
                                }}
                                errors={errors}
                                iconName="add-location"
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

                        <Button
                            style={{ backgroundColor: "#FF9900" }}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Lưu
                        </Button>
                    </View>
                </>
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
