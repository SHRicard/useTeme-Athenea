import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { DateField, DateWebField, Label } from "../../../atoms";
import { Controller } from "react-hook-form";
import { useAppTheme } from "@/hooks";

interface IDateControllers {
    control: any;
    error?: string | undefined;
    name: string;
    placeholder?: string;
    label?: string;
    required: boolean;
    disabled?: boolean;
}

export const DateController = ({
    control,
    error,
    name,
    label,
    required = false,
    disabled,
}: IDateControllers) => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            {!!label && <Label text={label} />}
            <Controller
                control={control}
                rules={{
                    required: required ? "*Campo obligatorio" : false,
                    validate: (value) => {
                        if (!value) {
                            return required ? "*Campo obligatorio" : true;
                        }

                        if (typeof value !== "string") {
                            return "Formato de fecha incorrecto";
                        }

                        const parts = value.split("/");
                        if (parts.length !== 3) {
                            return "Formato de fecha incorrecto";
                        }

                        const day = parseInt(parts[0], 10);
                        const month = parseInt(parts[1], 10);
                        const year = parseInt(parts[2], 10);
                        const today = new Date();
                        const currentYear = today.getFullYear();

                        if (isNaN(day) || isNaN(month) || isNaN(year)) {
                            return "Formato de fecha incorrecto";
                        }

                        if (year < 1934) {
                            return "El año debe ser mayor o igual a 1934";
                        }
                        if (year > currentYear) {
                            return `El año no puede ser mayor al año actual (${currentYear})`;
                        }
                        if (month < 1 || month > 12) {
                            return "El mes debe estar entre 01 y 12";
                        }
                        const daysInMonth = new Date(year, month, 0).getDate();
                        if (day < 1 || day > daysInMonth) {
                            return `El día debe estar entre 01 y ${daysInMonth} para el mes ${month}`;
                        }

                        return true;
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) =>
                    Platform.OS === "web" ? (
                        <DateWebField value={value || ""} onChange={onChange} disabled={disabled} />
                    ) : (
                        <DateField value={value || ""} onChange={onChange} onBlur={onBlur} disabled={disabled} />
                    )
                }
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
        gap: 10,
    },
});
