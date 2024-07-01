import { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import LoadingOverlay from "../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../components/Input/ReactHookFormTextInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { sendResetPasswordEmail } from "../../services/api/auth";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await sendResetPasswordEmail(data.email);

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Đã gửi mã cho bạn",
            });

            navigation.navigate("ResetPassword", {
                email: data.email,
            });
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response.data.message ?? "Có lỗi xảy ra",
            });
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isLoading} />

            <View style={styles.body}>
                <View style={styles.title}>
                    <Text style={{ color: "#FF9900", fontSize: 60 }}>
                        EXPLORA
                    </Text>
                    <Text style={{ color: "#FF9900", fontSize: 26 }}>
                        - IF NOT NOW, WHEN? -
                    </Text>
                </View>

                <View style={{ marginVertical: 40 }}>
                    <Text
                        style={{
                            color: "#808080",
                            fontSize: 14,
                            marginBottom: 10,
                        }}
                    >
                        Hãy nhập địa chỉ email mà bạn đã dùng để đăng ký. Chúng
                        tôi sẽ gửi mã đặt lại mật khẩu vào email cho bạn.
                    </Text>
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
                    />
                </View>

                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                        <View style={styles.btnWrapper}>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 18,
                                    fontWeight: "500",
                                }}
                            >
                                Gửi
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        marginTop: 100,
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    btnWrapper: {
        width: 220,
        height: 50,
        backgroundColor: "#FF9900",
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
});
