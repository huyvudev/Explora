import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import ImagePicker from "../../../components/ImagePicker";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { updateRoomType } from "../../../services/api/roomType";

type Props = NativeStackScreenProps<AppUserStackParamList, "UpdateRoomType">;

export default function UpdateRoomTypeScreen({ navigation, route }: Props) {
    const roomType = route.params.roomType;
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            roomTypeName: roomType.roomTypeName,
            price: `${roomType.price}`,
            area: `${roomType.area}`,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsUpdating(true);
        try {
            await updateRoomType(roomType.roomTypeId, {
                roomTypeName: data.roomTypeName,
                price: data.price,
                area: data.area,
                image: data.image,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập loại phòng`,
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingOverlay show={isUpdating} />

            <ImagePicker
                iconSize={80}
                initialImageUrl={roomType.imageUrl}
                onImageChange={(image) => {
                    setValue("image", image);
                }}
            />

            <View style={{ padding: 20 }}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="roomTypeName"
                        placeholder="Tên loại phòng"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Ô này không được để trống.",
                            },
                        }}
                        errors={errors}
                        iconName="bedroom-parent"
                    />

                    <ReactHookFormTextInput
                        id="price"
                        placeholder="Giá phòng"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Ô này không được để trống.",
                            },
                            validate: (value) =>
                                +value >= 0 || "Giá phòng không được nhỏ hơn 0",
                        }}
                        errors={errors}
                        iconName="attach-money"
                        keyboardType="numeric"
                    />

                    <ReactHookFormTextInput
                        id="area"
                        placeholder="Diện tích phòng (m2)"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Trường này không được để trống.",
                            },
                            validate: (value) =>
                                +value > 0 ||
                                "Diện tích phòng không được nhỏ hơn 1",
                        }}
                        errors={errors}
                        iconName="space-bar"
                        keyboardType="numeric"
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
    );
}
