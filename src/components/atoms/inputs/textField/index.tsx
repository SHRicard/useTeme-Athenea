import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";
import { useAppTheme } from "@/hooks";

interface ITextField {
    placeholder?: string;
    onBlur?: any;
    onChangeText: (text: string) => void;
    value: string;
    disabled?: boolean;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    multiline?: boolean;
}

export const TextField = ({
    placeholder,
    onBlur,
    onChangeText,
    value,
    disabled,
    style,
    numberOfLines = 1,
    multiline = false,
}: ITextField) => {
    const theme = useAppTheme();

    return (
        <TextInput
            style={[
                {
                    borderWidth: 1, 
                    borderColor: '#D1D1D1',
                    borderRadius: 6,
                    // backgroundColor: disabled
                    //     ? theme.colors.inputDisabled
                    //     : theme.colors.backgroundColorInput,
                    height: 46,
                },
                style,
            ]}
            // placeholderTextColor={theme.colors.textLowContrast}
            placeholder={placeholder || ""}
            onBlur={onBlur ? onBlur : () => { }}
            onChangeText={onChangeText}
            value={value || ""}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            contentStyle={[styles.contentStyle]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            disabled={disabled}
            numberOfLines={numberOfLines}
            multiline={multiline}
        />
    );
};

const styles = StyleSheet.create({
    contentStyle: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
});
