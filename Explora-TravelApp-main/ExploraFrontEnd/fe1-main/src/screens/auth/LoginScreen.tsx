import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import {FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthStackParamList } from "../../navigation/AuthStack";
import useAuthStore from "../../stores/useAuthStore";
import LoadingOverlay from "../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../components/Input/ReactHookFormTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = useAuthStore(state => state.login);

    const { control, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response.data.message ?? "Có lỗi xảy ra"
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
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("ForgotPassword");
                }}>
                    <View style={{display: "flex", alignItems: "flex-end", marginBottom: 10}}>
                        <Text style={{ fontSize: 13, fontWeight: "300", color: "#000000" }}>
                            Forgot your password?
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width: "100%",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                        <View style={styles.btnWrapperLogin}>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 18,
                                    fontWeight: "500",
                                }}
                            >
                                LOGIN
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 13, fontWeight: "500" }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.replace("Register")}
                        >
                            <Text
                                style={{
                                    color: "#FF9900",
                                    fontSize: 13,
                                    fontWeight: "500",
                                }}
                            >
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 20
    },
    title: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    btnWrapperLogin: {
        width: 220,
        height: 50,
        backgroundColor: "#FF9900",
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
});
