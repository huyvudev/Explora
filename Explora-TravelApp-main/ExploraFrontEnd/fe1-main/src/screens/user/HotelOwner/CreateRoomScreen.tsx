import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { Button, HelperText } from "react-native-paper";
// @ts-ignore
import SearchableDropdown from "react-native-searchable-dropdown";

import { AppUserStackParamList } from "../../../navigation/AppUserStack";
import { createRoom } from "../../../services/api/room";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ReactHookFormTextInput from "../../../components/Input/ReactHookFormTextInput";
import { RoomType } from "../../../types";
import { getRoomTypesByHotelId } from "../../../services/api/roomType";

type Props = NativeStackScreenProps<AppUserStackParamList, "CreateRoom">;

export default function CreateRoomScreen({ navigation, route }: Props) {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [selectedRoomType, setSelectedRoomType] = useState<any>();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            roomNumber: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsCreating(true);
        try {
            await createRoom({
                hotelId: route.params.hotelId,
                roomTypeId: data.roomTypeId,
                roomNumber: data.roomNumber,
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Đã thêm 1 phòng`,
            });

            if (route.params.onCreated) route.params.onCreated();

            navigation.pop();
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: e.response?.data?.message ?? "Có lỗi xảy ra",
            });
        }
        setIsCreating(false);
    };

    useEffect(() => {
        (async () => {
            const result = await getRoomTypesByHotelId(route.params.hotelId);

            setRoomTypes(result);
        })();
    }, [route.params.hotelId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingOverlay show={isCreating} />

            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ padding: 20 }}>
                    <View style={{ marginVertical: 40 }}>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={{ width: "100%" }}>
                                <Controller
                                    name="roomTypeId"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Trường này không được để trống.",
                                        },
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <RoomTypeSelect
                                            roomTypes={roomTypes}
                                            selectedRoomType={selectedRoomType}
                                            onItemSelect={(item: any) => {
                                                setSelectedRoomType(item);
                                                onChange(item.id);
                                            }}
                                        />
                                    )}
                                />
                                <HelperText
                                    type="error"
                                    visible={
                                        errors &&
                                        !!errors["roomTypeId"]?.message
                                    }
                                >
                                    {errors &&
                                        errors["roomTypeId"] &&
                                        (errors["roomTypeId"]
                                            ?.message as string)}
                                </HelperText>
                            </View>
                        </ScrollView>

                        <ReactHookFormTextInput
                            id="roomNumber"
                            placeholder="Số phòng"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Ô này không được để trống.",
                                },
                            }}
                            errors={errors}
                            iconName="bedroom-parent"
                            keyboardType="numeric"
                        />
                    </View>

                    <Button
                        style={{ backgroundColor: "#FF9900" }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Lưu
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function RoomTypeSelect({
    roomTypes,
    selectedRoomType,
    onItemSelect,
}: {
    roomTypes: RoomType[];
    selectedRoomType: any;
    onItemSelect: (item: any) => void;
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
            items={roomTypes.map((a) => ({
                id: a.roomTypeId,
                name: a.roomTypeName,
            }))}
            resetValue={false}
            textInputProps={{
                placeholder: selectedRoomType
                    ? selectedRoomType.name
                    : "Chọn loại phòng",
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
    );
}
