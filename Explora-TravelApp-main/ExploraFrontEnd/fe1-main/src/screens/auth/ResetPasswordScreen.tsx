import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

import { AuthStackParamList } from "../../navigation/AuthStack";
import LoadingOverlay from "../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../components/Input/ReactHookFormTextInput";
import { resetPassword } from "../../services/api/auth";
import AppTextInput from "../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "ResetPassword">;

export default function ResetPasswordScreen({ navigation, route }: Props) {
    const { email } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<FieldValues>({
        defaultValues: {
            token: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await resetPassword({
                email,
                password: data.password,
                token: data.token,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Đặt lại mật khẩu thành công",
            });

            navigation.popToTop();
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
                    <View style={{ marginBottom: 20 }}>
                        <AppTextInput 
                            editable={false}
                            value={email}
                        />
                    </View>

                    <View>
                        <Text style={{
                            color: "#808080",
                            fontSize: 12,
                            marginBottom: 10,
                        }}>
                            Hãy nhập mã đặt lại mật khẩu vừa được gửi về email của bạn
                            vào ô dưới đây.
                        </Text>
                        <ReactHookFormTextInput
                            id="token"
                            placeholder="Mã đặt lại mật khẩu"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Token không được để trống.",
                                },
                            }}
                            errors={errors}
                        />
                    </View>

                    <ReactHookFormTextInput
                        id="password"
                        placeholder="Password"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Password không được để trống.",
                            },
                        }}
                        errors={errors}
                        secureTextEntry
                    />
                    <ReactHookFormTextInput
                        id="passwordConfirm"
                        placeholder="Confirm Password"
                        control={control}
                        rules={{
                            validate: (value) =>
                                value === getValues("password") ||
                                "Password không khớp",
                        }}
                        errors={errors}
                        secureTextEntry
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
                                Reset Password
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
        marginTop: 50,
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
