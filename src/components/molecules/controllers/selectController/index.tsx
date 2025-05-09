import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Label, SelectField } from "@/components/atoms";
import { Controller } from "react-hook-form";
import { useAppTheme } from "@/hooks";

interface ISelectController {
    control: any;
    errors: any;
    name: string;
    label?: string;
    required?: boolean;
    items: { label: string; value: string, code: string }[];
    disabled?: boolean;
    placeholder?: string;
}

export const SelectController = ({
    control,
    errors,
    name,
    label,
    required,
    items,
    disabled = false,
    placeholder,
}: ISelectController) => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            <Label text={label || ""} disabled={disabled} />
            <Controller
                disabled={disabled}
                control={control}
                name={name}
                rules={{ required: required ? "Requerido" : false }}
                render={({ field: { onChange, value } }) => (
                    <SelectField
                        items={items}
                        placeholder={placeholder ?? ""}
                        onValueChange={onChange}
                        selectedValue={value}
                        disabled={disabled}
                    />
                )}
            />
            {errors && errors[name] && (
                <Text style={[{ color: theme.colors.error }, styles.error]}>
                    {`*${errors[name].message}`}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    error: {},
});
