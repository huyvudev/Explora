import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import useOwnerHotelStore from "../../../stores/useOwnerHotelStore";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import ImagePicker from "../../../components/ImagePicker";

type Props = NativeStackScreenProps<AppUserStackParamList, "CreateHotel">;

export default function CreateHotelScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const createHotel = useOwnerHotelStore(state => state.createHotel);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            hotelName: "",
            email: "",
            addressHotel: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await createHotel({
                hotelName: data.hotelName,
                email: data.email,
                addressHotel: data.addressHotel,
                phoneNumber: data.phoneNumber,
                image: data.image,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm khách sạn ${data.hotelName}`,
            });

            navigation.pop();
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response?.data?.message ?? "Có lỗi xảy ra",
            });
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingOverlay show={isLoading} />

            <ImagePicker 
                iconSize={80}
                onImageChange={(image) => {
                    setValue("image", image);
                }}
            />
            
            <View style={{ padding: 20 }}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="hotelName"
                        placeholder="Tên khách sạn"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Ô này không được để trống.",
                            },
                        }}
                        errors={errors}
                        iconName="apartment"
                    />

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
        </SafeAreaView>
    )
}
