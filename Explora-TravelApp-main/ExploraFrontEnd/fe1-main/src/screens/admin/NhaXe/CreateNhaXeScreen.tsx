import { Image, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import useNhaXeStore from "../../../stores/useNhaXeStore";

type Props = NativeStackScreenProps<AppAdminStackParamList, "CreateNhaXe">;

export default function CreateNhaXeScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const createNhaXe = useNhaXeStore(state => state.createNhaXe);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            nhaXeName: "",
            email: "",
            addressNhaXe: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await createNhaXe({
                nhaXeName: data.nhaXeName,
                email: data.email,
                addressNhaXe: data.addressNhaXe,
                phoneNumber: data.phoneNumber,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm nhà xe ${data.nhaXeName}`,
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
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isLoading} />

            <Image
                width={dimension.width}
                height={170}
                resizeMode="cover"
                source={{
                    uri: "https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-resize.jpg",
                }}
            />

            <View style={styles.body}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="nhaXeName"
                        placeholder="Tên nhà xe"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Tên nhà xe không được để trống.",
                            },
                        }}
                        errors={errors}
                        iconName="directions-bus"
                    />

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
                                value: /^[0-9]{8,}$/,
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
                    Create
                </Button>
            </View>
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
