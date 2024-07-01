import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Button, HelperText, Modal, Portal } from "react-native-paper";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import AppTextInput from "../../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AppUserStackParamList, "SearchRoom">;

export default function SearchRoomScreen({ navigation }: Props) {
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
            addressHotel: "",
            night: "",
            roomNumber: "",
        },
    });
    const startTime = watch("startTime");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const startDate = new Date(data.startTime);
        startDate.setDate(startDate.getDate() + +data.night);

        data.endTime = moment(startDate).format('YYYY-MM-DD');

        navigation.navigate("SearchedHotelList", {
            addressHotel: data.addressHotel,
            startTime: data.startTime,
            endTime: data.endTime,
            roomNumber: data.roomNumber,
        });
    };

    const showCalendarModal = () => setModalVisible(true);

    const hideCalendarModal = () => setModalVisible(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={hideCalendarModal}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20,
                    }}
                >
                    <Text>Chọn ngày nhận phòng</Text>
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
                    uri: "https://cocoskeelingislands.com.au/app/uploads/2023/11/Palms-at-Direction-Island_Credit-Karen-Willshaw-1500x690.jpg",
                }}
            />

            <View style={{ padding: 20 }}>
                <View style={{ marginVertical: 20 }}>
                    <ReactHookFormTextInput
                        id="addressHotel"
                        placeholder="Bạn muốn đặt phòng ở"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Hãy nhập nơi bạn muốn đặt phòng",
                            },
                        }}
                        errors={errors}
                        iconName="location-on"
                    />

                    <TouchableOpacity onPress={showCalendarModal}>
                        <View>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Bạn muốn nhận phòng vào ngày nào?",
                                    },
                                }}
                                render={() => (
                                    <AppTextInput
                                        placeholder="Ngày nhận phòng"
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

                    <ReactHookFormTextInput
                        id="night"
                        placeholder="Số đêm"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Bạn muốn ở mấy đêm",
                            },
                            validate: (value) =>
                                +value > 0 || "Ô này không được nhỏ hơn 1",
                        }}
                        keyboardType="numeric"
                        errors={errors}
                        iconName="nightlight"
                    />
                    <ReactHookFormTextInput
                        id="roomNumber"
                        placeholder="Số phòng"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Bạn muốn đặt mấy phòng?",
                            },
                            validate: (value) =>
                                +value > 0 || "Ô này không được nhỏ hơn 1",
                        }}
                        keyboardType="numeric"
                        errors={errors}
                        iconName="meeting-room"
                    />
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