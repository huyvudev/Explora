import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AppAdminStackParamList } from "../../navigation/AppAdminStack";
import { Button } from "react-native-paper";

type Props = NativeStackScreenProps<AppAdminStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Hãy chọn dịch vụ quản lý
                    </Text>
                </View>

                <View style={{ 
                    paddingVertical: 30,
                    flexDirection: "column",
                    gap: 20,
                }}>
                    <Button 
                        icon="airplane" 
                        mode="contained" 
                        onPress={() => navigation.navigate("Airlines")}
                        style={styles.button}
                    >
                        Quản lý hãng hàng không
                    </Button>
                    <Button 
                        icon="airplane-clock" 
                        mode="contained" 
                        onPress={() => navigation.navigate("Planes")}
                        style={styles.button}
                    >
                        Quản lý chuyến bay
                    </Button>
                </View>

                <View style={{ 
                    paddingVertical: 30,
                    flexDirection: "column",
                    gap: 20,
                }}>
                    <Button 
                        icon="bus" 
                        mode="contained" 
                        onPress={() => navigation.navigate("NhaXeList")}
                        style={styles.button}
                    >
                        Quản lý nhà xe
                    </Button>
                    <Button 
                        icon="bus-clock" 
                        mode="contained" 
                        onPress={() => navigation.navigate("Bus")}
                        style={styles.button}
                    >
                        Quản lý chuyến xe khách
                    </Button>
                </View>
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