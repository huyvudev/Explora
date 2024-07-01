import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Dialog, Portal } from "react-native-paper";

import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import * as utils from "../../../utils";
import { Bus } from "../../../types";
import useBusStore from "../../../stores/useBusStore";

type Props = NativeStackScreenProps<AppAdminStackParamList, "Bus">;

function BusItem({
    bus,
    onPressEdit,
    onPressDelete,
}: {
    bus: Bus;
    onPressEdit: () => void;
    onPressDelete: () => void;
}) {
    return (
        <View
            style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#FF9900",
                borderWidth: 2,
            }}
        >
            <Text style={{ fontWeight: 700, textAlign: "center" }}>
                {bus.idNhaXeNavigation.nhaXeName}
            </Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 30 }}>Đi: {bus.startPoint}</Text>
                <Text>Đến: {bus.endPoint}</Text>
            </View>

            <Text>Thời gian: {utils.toDateTimeString(bus.startTime)}</Text>
            <Text>Số ghế: {bus.slot}</Text>
            <Text>Giá: {bus.price}/người</Text>

            <View
                style={{
                    paddingTop: 10,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity style={{ padding: 10 }} onPress={onPressEdit}>
                    <Text style={{ color: "blue" }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={onPressDelete}
                >
                    <Text style={{ color: "red" }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function BusListScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBusId, setSelectedBusId] = useState<number>();

    const { isLoading, bus, loadAllBus, deleteBus } =
        useBusStore((state) => ({
            isLoading: state.isLoading,
            bus: state.bus,
            loadAllBus: state.loadAllBus,
            deleteBus: state.deleteBus,
        }));

    const showDeleteDialog = (busId: number) => {
        setSelectedBusId(busId);
        setModalVisible(true);
    };

    const hideDialog = () => setModalVisible(false);

    useEffect(() => {
        loadAllBus();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Portal>
                <Dialog visible={modalVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text>Xóa chuyến bay này?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button
                            onPress={() => {
                                if (selectedBusId)
                                    deleteBus(selectedBusId);

                                hideDialog();
                            }}
                        >
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size={50} color="#FF9900" />
                </View>
            ) : (
                <ScrollView>
                    <View
                        style={{
                            flexDirection: "column",
                            gap: 20,
                            flex: 1,
                            padding: 20,
                        }}
                    >
                        {bus.map((bus) => (
                            <BusItem
                                key={bus.idBus}
                                bus={bus}
                                onPressEdit={() =>
                                    navigation.navigate("UpdateBus", {
                                        busId: bus.idBus,
                                    })
                                }
                                onPressDelete={() =>
                                    showDeleteDialog(bus.idBus)
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
