import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { formatDateWeb } from "@/utils";
import { useAppTheme } from "@/hooks";

interface IDateWebField {
    value?: string;
    onChange?: (date: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    disabled?: boolean;
}

export const DateWebField = ({
    value = "",
    onChange,
    onBlur,
    placeholder,
    disabled,
}: IDateWebField) => {
    const theme = useAppTheme();

    const handleChange = (event: any) => {
        const text = event.target.value;
        const formattedDate = formatDateWeb(text);
        if (onChange) {
            onChange(formattedDate);
        }
    };

    const styles = StyleSheet.create({
        input: {
            padding: 15,
            // backgroundColor: theme.colors.backgroundColorInput,
            // color: theme.colors.textPrimary,
            borderWidth: 1,
            // borderColor: theme.colors.bordeColor,
        },
    });

    return (
        <>
            <TextInput
                style={[styles.input]}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                placeholder={placeholder || "DD/MM/YYYY"}
                maxLength={10}
                editable={!disabled}
            // placeholderTextColor={theme.colors.textPrimary}
            />
        </>
    );
};
