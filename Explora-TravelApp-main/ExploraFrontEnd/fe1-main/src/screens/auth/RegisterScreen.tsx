import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import ReactHookFormTextInput from "../../components/Input/ReactHookFormTextInput";
import AppTextInput from "../../components/Input/AppTextInput";
import LoadingOverlay from "../../components/LoadingOverlay";
import { signUp } from "../../services/api/auth";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] =
        useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            passwordConfirm: "",
            dateOfBirth: new Date()
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await signUp({
                name: data.name,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
                dateOfBirth: data.dateOfBirth,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Đăng ký thành công",
            });

            navigation.replace("Login");
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response.data.message ?? "Có lỗi xảy ra",
            });
        }
        setIsLoading(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const toDateString = (date: Date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isLoading} />
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Text style={{ color: "#FF9900", fontSize: 60 }}>
                            EXPLORA
                        </Text>
                        <Text style={{ color: "#FF9900", fontSize: 26 }}>
                            IF NOT NOW, WHEN?
                        </Text>
                    </View>

                    <View style={{ marginVertical: 40 }}>
                        {/* Name Input */}
                        <ReactHookFormTextInput
                            id="name"
                            placeholder="Name"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Name không được để trống.",
                                },
                            }}
                            errors={errors}
                        />

                        {/* Email Input */}
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

                        {/* Phone Number Input */}
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

                        <TouchableOpacity onPress={showDatePicker}>
                            <AppTextInput
                                value={toDateString(getValues("dateOfBirth"))}
                                placeholder="Date of Birth"
                                editable={false}
                            />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={isDatePickerVisible}
                            date={getValues("dateOfBirth")}
                            onConfirm={(date) => {
                                setValue("dateOfBirth", date);
                                hideDatePicker();
                            }}
                            onCancel={hideDatePicker}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <View style={styles.btnWrapperSignup}>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 18,
                                        fontWeight: "500",
                                    }}
                                >
                                    SIGN-UP
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ fontSize: 13, fontWeight: "500" }}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.replace("Login")}
                            >
                                <Text
                                    style={{
                                        color: "#FF9900",
                                        fontSize: 13,
                                        fontWeight: "500",
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    body: {
        marginTop: 10,
        marginBottom: 50,
        paddingHorizontal: 20
    },
    title: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    btnWrapperSignup: {
        marginTop: 20,
        width: 220,
        height: 50,
        backgroundColor: "#FF9900",
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
});
