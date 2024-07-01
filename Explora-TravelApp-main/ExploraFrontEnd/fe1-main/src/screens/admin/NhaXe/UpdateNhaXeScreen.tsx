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
import AppTextInput from "../../../components/Input/AppTextInput";
import useNhaXeStore from "../../../stores/useNhaXeStore";
import { NhaXe } from "../../../types";
import { getNhaXeById } from "../../../services/api/nhaxe";

type Props = NativeStackScreenProps<AppAdminStackParamList, "UpdateNhaXe">;

export default function UpdateNhaXeScreen({ navigation, route }: Props) {
    const [isLoadingNhaXe, setIsLoadingNhaXe] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [nhaXe, setNhaXe] = useState<NhaXe | null>(null);
    
    const dimension = useWindowDimensions();
    const updateNhaXe = useNhaXeStore((state) => state.updateNhaXe);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            addressNhaXe: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsUpdating(true);
        try {
            await updateNhaXe(route.params.nhaXeId, {
                email: data.email,
                addressNhaXe: data.addressNhaXe,
                phoneNumber: data.phoneNumber,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã cập nhập nhà xe ${nhaXe?.nhaXeName}`,
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
        const loadNhaXe = async () => {
            setIsLoadingNhaXe(true);

            const data = await getNhaXeById(route.params.nhaXeId);

            if (data) {
                setNhaXe(data);

                setValue("email", data.email);
                setValue("addressNhaXe", data.addressNhaXe);
                setValue("phoneNumber", data.phoneNumber);

                navigation.setOptions({ title: `Edit ${data.nhaXeName}` });
            }

            setIsLoadingNhaXe(false);
        }

        loadNhaXe();
    }, [route.params.nhaXeId]);

    if (isLoadingNhaXe) {
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
                    uri: "https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-resize.jpg",
                }}
            />

            {nhaXe ? (
                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <AppTextInput
                                iconName="directions-bus"
                                value={nhaXe.nhaXeName}
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
                            id="addressNhaXe"
                            placeholder="Địa chỉ nhà xe"
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
