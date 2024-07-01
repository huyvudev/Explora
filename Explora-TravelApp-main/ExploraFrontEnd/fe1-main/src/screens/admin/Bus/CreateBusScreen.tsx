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
import useNhaXeStore from "../../../stores/useNhaXeStore";
import useBusStore from "../../../stores/useBusStore";
import { NhaXe } from "../../../types";
import AppTextInput from "../../../components/Input/AppTextInput";

type Props = NativeStackScreenProps<AppAdminStackParamList, "CreateBus">;

export default function CreateBusScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNhaXe, setSelectedNhaXe] = useState<any>();
    const [isDatePickerVisible, setDatePickerVisibility] =
        useState<boolean>(false);

    const { nhaXes, loadAllNhaXes } = useNhaXeStore(state => ({
        nhaXes: state.nhaXes,
        loadAllNhaXes: state.loadAllNhaXes,
    }));

    const createBus = useBusStore((state) => state.createBus);
    const dimension = useWindowDimensions();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            busName: "",
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
            await createBus({
                idNhaXe: data.idNhaXe,
                busName: data.busName,
                startPoint: data.startPoint,
                endPoint: data.endPoint,
                startTime: data.startTime,
                price: data.price,
                slot: data.slot,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm chuyến xe`,
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
        loadAllNhaXes();
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
                        uri: "https://vtv1.mediacdn.vn/zoom/640_400/2022/3/13/anh-chup-man-hinh-2022-03-13-luc-165256-16471651872591300529708.png",
                    }}
                />

                <View style={styles.body}>
                    <View style={{ marginVertical: 40 }}>
                        <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
                            <View style={{width: "100%"}}>
                                <Controller
                                    name="idNhaXe"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Trường này không được để trống.",
                                        },
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <NhaXeSelect 
                                            nhaXes={nhaXes}
                                            selectedNhaXe={selectedNhaXe}
                                            onItemSelect={(item: any) => {
                                                setSelectedNhaXe(item);
                                                onChange(item.id);
                                            }}
                                        />
                                    )}
                                />
                                <HelperText type="error" visible={errors && !!errors["idNhaXe"]?.message}>
                                    {errors && errors["idNhaXe"] && (errors["idNhaXe"]?.message as string)}
                                </HelperText>
                            </View>
                        </ScrollView>

                        <ReactHookFormTextInput
                            id="busName"
                            placeholder="Tên chuyến xe"
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
                            placeholder="Đi từ"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường này không được để trống.",
                                },
                            }}
                            errors={errors}
                            iconName="directions-bus"
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
                            iconName="directions-bus"
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

function NhaXeSelect({
    nhaXes,
    selectedNhaXe,
    onItemSelect
}: {
    nhaXes: NhaXe[],
    selectedNhaXe: any,
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
            items={nhaXes.map(a => ({
                id: a.idNhaXe,
                name: a.nhaXeName
            }))}
            resetValue={false}
            textInputProps={{
                placeholder: selectedNhaXe ? selectedNhaXe.name : "Chọn nhà xe",
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
