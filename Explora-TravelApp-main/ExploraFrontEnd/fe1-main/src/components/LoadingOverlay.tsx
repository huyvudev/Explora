import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingOverlay({ show }: { show: boolean }) {
    if (!show) return null;

    return (
        <View style={styles.loading}>
            <ActivityIndicator size={50} color="#FF9900" />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.5,
        zIndex: 1000,
    },
});
