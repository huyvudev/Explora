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
import { Plane } from "../../../types";
import usePlaneStore from "../../../stores/usePlaneStore";
import * as utils from "../../../utils";

type Props = NativeStackScreenProps<AppAdminStackParamList, "Planes">;

function PlaneItem({
    plane,
    onPressEdit,
    onPressDelete,
}: {
    plane: Plane;
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
                {plane.idAirlineNavigation.airlineName}
            </Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 30 }}>Đi: {plane.startPoint}</Text>
                <Text>Đến: {plane.endPoint}</Text>
            </View>

            <Text>Thời gian: {utils.toDateTimeString(plane.startTime)}</Text>
            <Text>Số ghế: {plane.slot}</Text>
            <Text>Giá: {plane.price}/người</Text>

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

export default function PlanesScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedPlaneId, setSelectedPlaneId] = useState<number>();
    const { isLoading, planes, loadAllPlanes, deletePlane } =
        usePlaneStore((state) => ({
            isLoading: state.isLoading,
            planes: state.planes,
            loadAllPlanes: state.loadAllPlanes,
            deletePlane: state.deletePlane,
        }));

    const showDeleteDialog = (planeId: number) => {
        setSelectedPlaneId(planeId);
        setModalVisible(true);
    };

    const hideDialog = () => setModalVisible(false);

    useEffect(() => {
        loadAllPlanes();
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
                                if (selectedPlaneId)
                                    deletePlane(selectedPlaneId);

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
                        {planes.map((plane) => (
                            <PlaneItem
                                key={plane.idPlane}
                                plane={plane}
                                onPressEdit={() =>
                                    navigation.navigate("UpdatePlane", {
                                        planeId: plane.idPlane,
                                    })
                                }
                                onPressDelete={() =>
                                    showDeleteDialog(plane.idPlane)
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
