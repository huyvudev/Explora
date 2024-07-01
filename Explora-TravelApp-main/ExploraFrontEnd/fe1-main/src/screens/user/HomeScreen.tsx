import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppUserStackParamList } from "../../navigation/AppUserStack";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import useAuthStore from "../../stores/useAuthStore";

type Props = NativeStackScreenProps<AppUserStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    const user = useAuthStore(state => state.user);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Hãy chọn dịch vụ bạn muốn sử dụng
                    </Text>
                </View>

                <View style={{ 
                    paddingVertical: 30,
                    flexDirection: "column",
                    gap: 20,
                }}>
                    <Button 
                        icon="bus" 
                        mode="contained" 
                        onPress={() => navigation.navigate("SearchBus")}
                        style={styles.button}
                    >
                        Đặt vé xe khách
                    </Button>
                    <Button 
                        icon="airplane" 
                        mode="contained" 
                        onPress={() => navigation.navigate("SearchPlane")}
                        style={styles.button}
                    >
                        Đặt vé máy bay
                    </Button>
                    <Button 
                        icon="office-building"
                        mode="contained" 
                        onPress={() => navigation.navigate("SearchRoom")}
                        style={styles.button}
                    >
                        Đặt phòng khách sạn
                    </Button>
                </View>

                {user && user.role === "HotelOwner" && (
                    <View style={{ 
                        paddingVertical: 30,
                        flexDirection: "column",
                        gap: 20,
                    }}>
                        <Text style={styles.title}>
                            Các dịch vụ của chủ sở hữu khách sạn
                        </Text>

                        <View style={{
                            flexDirection: "column",
                            gap: 20,
                        }}>
                            <Button 
                                icon="office-building"
                                mode="contained" 
                                onPress={() => navigation.navigate("ManageHotel")}
                                style={styles.button}
                            >
                                Quản lý khách sạn
                            </Button>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        color: "#FF9900",
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase"
    },
    button: {
        backgroundColor: "#FF9900",

    }
});