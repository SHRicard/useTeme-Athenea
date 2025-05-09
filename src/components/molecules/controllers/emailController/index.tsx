import React from "react";
import { StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";
import { Label, TextField } from "../../../atoms";
import { useAppTheme } from "@/hooks";


interface IEmailController {
    control: any;
    error: string | undefined;
    placeholder?: string;
    label?: string;
    required?: boolean;
}

export const EmailController = ({
    control,
    error,
    placeholder,
    label,
    required,
}: IEmailController) => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            {!!label && <Label text={label} required={required} />}

            <Controller
                control={control}
                rules={{
                    required: required ? "Requerido" : false,
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Ingrese un email válido",
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {error && (
                <Label
                    required={false}
                    text={error}
                    style={[{ color: theme.colors.error }]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
});
