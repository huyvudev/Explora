import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import {
    Button,
    HelperText,
    Modal,
    Portal,
    Text,
} from "react-native-paper";
import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import AppTextInput from "../../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AppUserStackParamList, "SearchBus">;

export default function SearchBusScreen({ navigation }: Props) {
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
        navigation.navigate("BusList", {
            startPoint: data.startPoint,
            endPoint: data.endPoint,
            startTime: data.startTime,
        });
    };

    const showCalendarModal = () => setModalVisible(true);

    const hideCalendarModal = () => setModalVisible(false);

    return (
        <SafeAreaView>
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
                    uri: "https://media.timeout.com/images/106045805/750/422/image.jpg",
                }}
            />

            <View style={styles.body}>
                <View style={{ marginVertical: 40 }}>
                    <ReactHookFormTextInput
                        id="startPoint"
                        placeholder="Bạn muốn đi từ"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Chúng tôi nên đón bạn ở đâu?",
                            },
                        }}
                        errors={errors}
                        iconName="directions-bus-filled"
                    />
                    <ReactHookFormTextInput
                        id="endPoint"
                        placeholder="Đến"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Bạn muốn đến đâu?",
                            },
                        }}
                        errors={errors}
                        iconName="directions-bus-filled"
                    />

                    <TouchableOpacity onPress={showCalendarModal}>
                        <View>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Bạn muốn đi vào ngày nào?",
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
