import { Image, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import useAirlineStore from "../../../stores/useAirlineStore";

type Props = NativeStackScreenProps<AppAdminStackParamList, "CreateAirline">;

export default function CreateAirlineScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const createAirline = useAirlineStore(state => state.createAirline);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            airlineName: "",
            email: "",
            addressAirline: "",
            phoneNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await createAirline({
                airlineName: data.airlineName,
                email: data.email,
                addressAirline: data.addressAirline,
                phoneNumber: data.phoneNumber,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm hãng hàng không ${data.airlineName}`,
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
                    uri: "https://www.discover-airlines.com/imgproxy/default-md/www.discover-airlines.com/en/assets/fleet/A320-200_Motiv_02_2400x1600px_cut.jpg",
                }}
            />

            <View style={styles.body}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="airlineName"
                        placeholder="Airline Name"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Name không được để trống.",
                            },
                        }}
                        errors={errors}
                        iconName="airplanemode-active"
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
