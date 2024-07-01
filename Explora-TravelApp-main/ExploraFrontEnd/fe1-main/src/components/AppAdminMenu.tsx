import { Image, Text, TouchableOpacity, View } from "react-native";
import useAuthStore from "../stores/useAuthStore";

export default function AppAdminMenu({
    onPress
}: {
    onPress?: () => void
}) {
    const user = useAuthStore(state => state.user);

    return (
        <TouchableOpacity 
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5
            }}
            onPress={onPress}
        >
            <Text>Hello, Admin</Text>
            <Image
                style={{ 
                    width: 40, 
                    height: 40,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                }}
                source={{
                    uri: user?.urlAvatar,
                }}
            />
        </TouchableOpacity>
    )
}