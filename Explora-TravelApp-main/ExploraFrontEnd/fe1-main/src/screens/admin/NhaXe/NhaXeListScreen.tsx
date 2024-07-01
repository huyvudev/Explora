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
import { NhaXe } from "../../../types";
import { Button, Dialog, Portal } from "react-native-paper";
import useNhaXeStore from "../../../stores/useNhaXeStore";

type Props = NativeStackScreenProps<AppAdminStackParamList, "NhaXeList">;

function NhaXeItem({
    nhaXe,
    onPressEdit,
    onPressDelete,
}: {
    nhaXe: NhaXe;
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
                {nhaXe.nhaXeName}
            </Text>

            <Text style={{ fontWeight: 400 }}>
                Address: {nhaXe.addressNhaXe}
            </Text>

            <Text style={{ fontWeight: 400 }}>Email: {nhaXe.email}</Text>

            <Text style={{ fontWeight: 400 }}>
                Phone: {nhaXe.phoneNumber}
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

export default function NhaXeListScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedNhaXeId, setSelectedNhaXeId] = useState<number>();
    const { isLoading, nhaXes, loadAllNhaXes, deleteNhaXe } =
        useNhaXeStore((state) => ({
            isLoading: state.isLoading,
            nhaXes: state.nhaXes,
            loadAllNhaXes: state.loadAllNhaXes,
            deleteNhaXe: state.deleteNhaXe,
        }));

    const showDeleteDialog = (nhaXeId: number) => {
        setSelectedNhaXeId(nhaXeId);
        setModalVisible(true);
    };

    const hideDialog = () => setModalVisible(false);

    useEffect(() => {
        loadAllNhaXes();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Portal>
                <Dialog visible={modalVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text>Xóa nhà xe này?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button
                            onPress={() => {
                                if (selectedNhaXeId)
                                    deleteNhaXe(selectedNhaXeId);

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
                        {nhaXes.map((nhaXe) => (
                            <NhaXeItem
                                key={`${nhaXe.idNhaXe}`}
                                nhaXe={nhaXe}
                                onPressEdit={() =>
                                    navigation.navigate("UpdateNhaXe", {
                                        nhaXeId: nhaXe.idNhaXe,
                                    })
                                }
                                onPressDelete={() =>
                                    showDeleteDialog(nhaXe.idNhaXe)
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
