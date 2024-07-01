import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";
import { KeyboardTypeOptions, View } from "react-native";
import { HelperText } from "react-native-paper";
import AppTextInput from "./AppTextInput";

export default function ReactHookFormTextInput({
    id,
    placeholder,
    control,
    rules,
    errors,
    onFocus,
    secureTextEntry,
    iconName,
    keyboardType,
    editable,
}: {
    id: string;
    placeholder?: string;
    control: Control;
    rules:
        | Omit<
              RegisterOptions<FieldValues, "email">,
              "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
          >
        | undefined;
    errors?: FieldErrors<FieldValues>;
    onFocus?: () => void;
    secureTextEntry?: boolean,
    iconName?: string,
    keyboardType?: KeyboardTypeOptions;
    editable?: boolean,
}) {
    return (
        <View>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                        placeholder={placeholder ?? "Text"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={onFocus}
                        secureTextEntry={secureTextEntry}
                        iconName={iconName}
                        keyboardType={keyboardType}
                        editable={editable}
                    />
                )}
                name={id}
            />
            <HelperText type="error" visible={errors && !!errors[id]?.message}>
                {errors && errors[id] && (errors[id]?.message as string)}
            </HelperText>
        </View>
    );
}
