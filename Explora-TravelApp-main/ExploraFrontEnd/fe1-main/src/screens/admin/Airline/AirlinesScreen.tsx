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
import { AppAdminStackParamList } from "../../../navigation/AppAdminStack";
import useAirlineStore from "../../../stores/useAirlineStore";
import { Airline } from "../../../types";
import { Button, Dialog, Portal } from "react-native-paper";

type Props = NativeStackScreenProps<AppAdminStackParamList, "Airlines">;

function AirlineItem({
    airline,
    onPressEdit,
    onPressDelete,
}: {
    airline: Airline;
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
                {airline.airlineName}
            </Text>

            <Text style={{ fontWeight: 400 }}>
                Address: {airline.addressAirline}
            </Text>

            <Text style={{ fontWeight: 400 }}>Email: {airline.email}</Text>

            <Text style={{ fontWeight: 400 }}>
                Phone: {airline.phoneNumber}
            </Text>

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

export default function AirlinesScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAirlineId, setSelectedAirlineId] = useState<number>();
    const { isLoading, airlines, loadAllAirlines, deleteAirline } =
        useAirlineStore((state) => ({
            isLoading: state.isLoading,
            airlines: state.airlines,
            loadAllAirlines: state.loadAllAirlines,
            deleteAirline: state.deleteAirline,
        }));

    const showDeleteDialog = (airlineId: number) => {
        setSelectedAirlineId(airlineId);
        setModalVisible(true);
    };

    const hideDialog = () => setModalVisible(false);

    useEffect(() => {
        loadAllAirlines();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Portal>
                <Dialog visible={modalVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text>Xóa hãng hàng không này?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button
                            onPress={() => {
                                if (selectedAirlineId)
                                    deleteAirline(selectedAirlineId);

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
                        {airlines.map((airline) => (
                            <AirlineItem
                                key={`${airline.idAirline}`}
                                airline={airline}
                                onPressEdit={() =>
                                    navigation.navigate("UpdateAirline", {
                                        airlineId: airline.idAirline,
                                    })
                                }
                                onPressDelete={() =>
                                    showDeleteDialog(airline.idAirline)
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
