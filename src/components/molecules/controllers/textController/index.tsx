import React from "react";
import { StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";
import { useAppTheme } from "@/hooks";
import { Label, TextField } from "../../../atoms";
// import { useAppTheme } from "@hooks";
interface ITextController {
    control: any;
    error: string | undefined;
    placeholder?: string;
    label?: string;
    required?: boolean;
    name: string;
    disabled?: boolean;
}

export const TextController = ({
    control,
    error,
    placeholder,
    label,
    required,
    name,
    disabled,
}: ITextController) => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            {!!label && <Label text={label} />}

            <Controller
                control={control}
                rules={{
                    required: required ? "Requerido" : false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        disabled={disabled}
                    />
                )}
                name={name}
            />
            {error && (
                <Label
                    text={error}
                    style={[{ color: theme.colors.error }]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        gap: 10,
    },
});
