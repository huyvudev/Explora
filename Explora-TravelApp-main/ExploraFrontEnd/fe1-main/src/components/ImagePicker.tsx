import { useCallback, useState } from "react";
import {
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from "react-native-image-picker";

interface File {
    name?: string;
    type?: string;
    uri: string;
}

export default function ImagePicker({
    iconSize = 50,
    labelFontSize,
    label,
    height = 200,
    onImageChange,
    initialImageUrl,
}: {
    iconSize?: number;
    labelFontSize?: number;
    label?: string;
    height?: number;
    onImageChange: (image: File) => void;
    initialImageUrl?: string;
}) {
    const [imageUri, setImageUri] = useState<string | undefined>(initialImageUrl);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onChooseImage = useCallback(async (source: "gallery" | "camera") => {
        hideModal();

        let result: ImagePickerResponse;

        switch (source) {
            case "gallery":
                result = await launchImageLibrary({
                    mediaType: "photo",
                });
                break;
            case "camera":
                result = await launchCamera({
                    mediaType: "photo",
                });
                break;
        }

        if (!result.didCancel && result.assets && result.assets[0]) {
            const asset = result.assets[0];
            if (asset.uri) {
                setImageUri(asset.uri);

                onImageChange({
                    name: asset.fileName,
                    type: asset.type,
                    uri:
                        Platform.OS === "android"
                            ? asset.uri
                            : asset.uri.replace("file://", ""),
                });
            }
        }
    }, []);

    const showModal = useCallback(() => setModalVisible(true), []);
    const hideModal = useCallback(() => setModalVisible(false), []);

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => onChooseImage("gallery")}>
                        <Text
                            style={{
                                padding: 12,
                            }}
                        >
                            Chọn ảnh từ thiết bị
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChooseImage("camera")}>
                        <Text
                            style={{
                                padding: 12,
                            }}
                        >
                            Chụp ảnh
                        </Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

            {imageUri ? (
                <TouchableOpacity onPress={showModal} style={{ width: "100%" }}>
                    <Image
                        resizeMode="cover"
                        source={{
                            uri: imageUri,
                        }}
                        style={{ width: "100%", height: height }}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={showModal}
                    style={{
                        justifyContent: "center",
                        height: height,
                    }}
                >
                    <View
                        style={{
                            height: iconSize,
                            width: iconSize,
                            marginBottom: 10,
                        }}
                    >
                        <Icon name="add" size={iconSize} color="#FF9900" />
                    </View>

                    <Text
                        style={{
                            fontSize: labelFontSize ?? 18,
                            fontWeight: "700",
                        }}
                    >
                        {label ?? "Thêm ảnh"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}