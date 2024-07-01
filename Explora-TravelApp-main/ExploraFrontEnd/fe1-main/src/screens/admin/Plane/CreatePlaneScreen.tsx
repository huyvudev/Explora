import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DatePicker from "react-native-date-picker";
import moment from "moment";
// @ts-ignore
import SearchableDropdown from "react-native-searchable-dropdown";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import usePlaneStore from "../../../stores/usePlaneStore";
import useAirlineStore from "../../../stores/useAirlineStore";
import { Airline } from "../../../types";
import AppTextInput from "../../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AppAdminStackParamList, "CreatePlane">;

export default function CreatePlaneScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedAirline, setSelectedAirline] = useState<any>();
    const [isDatePickerVisible, setDatePickerVisibility] =
        useState<boolean>(false);
    const { airlines, loadAllAirlines } = useAirlineStore(state => ({
        airlines: state.airlines,
        loadAllAirlines: state.loadAllAirlines,
    }));

    const createPlane = usePlaneStore((state) => state.createPlane);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            planeName: "",
            startPoint: "",
            endPoint: "",
            startTime: "",
            price: "",
            slot: "",
        },
    });

    const time = watch("startTime");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await createPlane({
                idAirline: data.idAirline,
                planeName: data.planeName,
                startPoint: data.startPoint,
                endPoint: data.endPoint,
                startTime: data.startTime,
                price: data.price,
                slot: data.slot,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm chuyến bay`,
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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        loadAllAirlines();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LoadingOverlay show={isLoading} />

            <ScrollView keyboardShouldPersistTaps="handled">
                <Image
                    width={dimension.width}
                    height={170}
                    resizeMode="cover"
                    source={{
                        uri: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/AP7S7SPQ2NJTJLBWW7ROT6W3VQ.jpg",
                    }}
                />

                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
                            <View style={{width: "100%"}}>
                                <Controller
                                    name="idAirline"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Trường này không được để trống.",
                                        },
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <AirlineSelect 
                                            airlines={airlines}
                                            selectedAirline={selectedAirline}
                                            onItemSelect={(item: any) => {
                                                setSelectedAirline(item);
                                                onChange(item.id);
                                            }}
                                        />
                                    )}
                                />
                                <HelperText type="error" visible={errors && !!errors["idAirline"]?.message}>
                                    {errors && errors["idAirline"] && (errors["idAirline"]?.message as string)}
                                </HelperText>
                            </View>
                        </ScrollView>

                        <ReactHookFormTextInput
                            id="planeName"
                            placeholder="Tên chuyến bay"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                            }}
                            errors={errors}
                        />

                        <ReactHookFormTextInput
                            id="startPoint"
                            placeholder="Bay từ"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                            }}
                            errors={errors}
                            iconName="local-airport"
                        />

                        <ReactHookFormTextInput
                            id="endPoint"
                            placeholder="Đến"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                            }}
                            errors={errors}
                            iconName="local-airport"
                        />

                        <TouchableOpacity onPress={showDatePicker}>
                            <View>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Trường này không được để trống.",
                                        },
                                    }}
                                    render={( value ) => (
                                        <AppTextInput 
                                            placeholder="Thời gian khởi hành"
                                            iconName="access-time"
                                            editable={false}
                                            value={time && new Date(time).toLocaleString()}
                                        />
                                    )}
                                />
                                <HelperText type="error" visible={errors && !!errors["startTime"]?.message}>
                                    {errors && errors["startTime"] && (errors["startTime"]?.message as string)}
                                </HelperText>
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={isDatePickerVisible}
                            title="Chọn thời gian khởi hành"
                            minimumDate={new Date()}
                            date={time ? new Date(time) : new Date()}
                            onConfirm={(date) => {
                                setValue("startTime", moment(date).format('YYYY-MM-DDTHH:mm:ss'));
                                hideDatePicker();
                            }}
                            onCancel={hideDatePicker}
                        />

                        <ReactHookFormTextInput
                            id="slot"
                            placeholder="Số ghế"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                                validate: (value) =>
                                    +value >= 0 ||
                                    "Số ghế không được nhỏ hơn 0",
                            }}
                            errors={errors}
                            iconName="airline-seat-recline-normal"
                            keyboardType="numeric"
                        />

                        <ReactHookFormTextInput
                            id="price"
                            placeholder="Giá tiền"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                                validate: (value) =>
                                    +value >= 0 ||
                                    "Giá tiền không được nhỏ hơn 0",
                            }}
                            errors={errors}
                            iconName="attach-money"
                            keyboardType="numeric"
                        />
                    </View>

                    <Button
                        style={{ backgroundColor: "#FF9900" }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Create
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function AirlineSelect({
    airlines,
    selectedAirline,
    onItemSelect
}: {
    airlines: Airline[],
    selectedAirline: any,
    onItemSelect: (item: any) => void
}) {
    return (
        <SearchableDropdown
            onItemSelect={onItemSelect}
            containerStyle={{ padding: 5 }}
            itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#dddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5,
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={airlines.map(a => ({
                id: a.idAirline,
                name: a.airlineName
            }))}
            resetValue={false}
            textInputProps={{
                placeholder: selectedAirline ? selectedAirline.name : "Chọn hãng hàng không",
                underlineColorAndroid: "transparent",
                style: {
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: "#FF9900",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flex: 1,
                },
            }}
            listProps={{
                nestedScrollEnabled: true,
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    body: {
        paddingHorizontal: 20,
        marginBottom: 100,
    },
});
