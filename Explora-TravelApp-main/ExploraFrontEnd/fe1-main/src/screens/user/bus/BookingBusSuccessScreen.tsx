import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { AppUserStackParamList } from "../../../navigation/AppUserStack";

type Props = NativeStackScreenProps<AppUserStackParamList, "BookingBusSuccess">;

export default function BookingBusSuccessScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Cảm ơn bạn đã tin tưởng Explora</Text>
            <Text style={styles.text}>
                Chúng tôi sẽ gửi vé điện tử cho bạn qua gmail
            </Text>
            <Text style={styles.text}>
                Nếu sau 10 phút bạn vẫn chưa nhận được thì hãy liên lạc qua
                gmail: hieu0214566@huce.edu.vn
            </Text>

            <Button
                style={{ backgroundColor: "#FF9900" }}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "Home" }
                        ]
                    });
                }}
            >
                Quay về trang chủ
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    text: {
        textAlign: "center",
        color: "#FF9900",
        marginVertical: 30,
    },
});
