import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Button, HelperText, Modal, Portal } from "react-native-paper";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import AppTextInput from "../../../components/Input/AppTextInput";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";

type Props = NativeStackScreenProps<AppUserStackParamList, "SearchPlane">;

export default function SearchPlaneScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            startPoint: "",
            endPoint: "",
            startTime: "",
        },
    });
    const startTime = watch("startTime");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        navigation.navigate("PlaneList", {
            startPoint: data.startPoint,
            endPoint: data.endPoint,
            startTime: data.startTime,
        });
    };

    const showCalendarModal = () => setModalVisible(true);

    const hideCalendarModal = () => setModalVisible(false);
    
    return (
        <SafeAreaView style={styles.container}>
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={hideCalendarModal}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20,
                    }}
                >
                    <Text>Chọn ngày khởi hành</Text>
                    <CalendarPicker
                        startFromMonday={true}
                        restrictMonthNavigation
                        minDate={new Date()}
                        selectedDayColor="#FF9900"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={(date) => {
                            setValue("startTime", moment(date).format('YYYY-MM-DD'));
                        }}
                    />
                </Modal>
            </Portal>

            <Image
                width={dimension.width}
                height={170}
                resizeMode="cover"
                source={{
                    uri: "https://statics.vinpearl.com/airlines-in-vietnam-1_1674055028.jpg",
                }}
            />

            <View style={styles.body}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="startPoint"
                        placeholder="Bạn muốn bay từ"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Bạn muốn khởi hành từ đâu?",
                            },
                        }}
                        errors={errors}
                        iconName="airplanemode-active"
                    />
                    <ReactHookFormTextInput
                        id="endPoint"
                        placeholder="Đến"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Bạn muốn bay đến đâu?",
                            },
                        }}
                        errors={errors}
                        iconName="airplanemode-active"
                    />

                    <TouchableOpacity onPress={showCalendarModal}>
                        <View>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Bạn muốn bay vào ngày nào?",
                                    },
                                }}
                                render={() => (
                                    <AppTextInput
                                        placeholder="Ngày khởi hành"
                                        iconName="calendar-month"
                                        editable={false}
                                        value={startTime && new Date(startTime).toLocaleDateString()}
                                    />
                                )}
                            />
                            <HelperText
                                type="error"
                                visible={
                                    errors && !!errors["startTime"]?.message
                                }
                            >
                                {errors &&
                                    errors["startTime"] &&
                                    (errors["startTime"]?.message as string)}
                            </HelperText>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        icon="magnify"
                        style={{ backgroundColor: "#FF9900" }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Tìm kiếm
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
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
