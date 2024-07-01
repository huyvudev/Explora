import { KeyboardTypeOptions, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AppTextInput({
    value,
    placeholder,
    onFocus,
    onBlur,
    onChangeText,
    editable,
    secureTextEntry,
    iconName,
    keyboardType,
}: {
    value?: string;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onChangeText?: () => void;
    editable?: boolean;
    secureTextEntry?: boolean;
    iconName?: string;
    keyboardType?: KeyboardTypeOptions;
}) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {iconName && <Icon
                name={iconName}
                size={20}
                color="#FF9900"
                style={{ 
                    padding: 10,
                    position: "absolute",
                    left: 10
                }}
            />}

            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                editable={editable}
                onBlur={onBlur}
                onChangeText={onChangeText}
                onFocus={onFocus}
                style={{
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: "#FF9900",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flex: 1,
                    paddingLeft: iconName ? 60 : undefined,
                }}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
