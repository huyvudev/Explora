import { Button, Image, StyleSheet, Text, View } from "react-native";
import useAuthStore from "../../stores/useAuthStore";

export default function ProfileScreen() {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    return (
        <View>
            <View
                style={{
                    padding: 50,
                }}
            >
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={{
                            uri: user?.urlAvatar,
                        }}
                    />
                </View>

                <Text style={styles.infoText}>Role: Admin</Text>
                <Text style={styles.infoText}>Họ và tên: {user?.userName}</Text>
                <Text style={styles.infoText}>Email: {user?.email}</Text>
                <Text style={styles.infoText}>
                    Số điện thoại: {user?.phoneNumber}
                </Text>
            </View>

            <Button
                onPress={() => {
                    logout();
                }}
                title="Logout"
                color="#FF9900"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    infoText: {
        fontWeight: "600",
    },
});
