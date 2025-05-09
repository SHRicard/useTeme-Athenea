import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "@/utils";
import { useAppTheme } from "@/hooks";

interface IDateField {
    value?: string;
    onChange?: (date: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
}

export const DateField = ({
    value,
    onChange,
    onBlur,
    disabled,
}: IDateField) => {
    const theme = useAppTheme();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date>();

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        if (onChange) {
            const formattedDate = formatDate(currentDate);
            onChange(formattedDate);
        }
    };

    const styles = StyleSheet.create({
        input: {
            padding: 10,
            // backgroundColor: theme.colors.backgroundColorInput,
            borderWidth: 1,
            // borderColor: theme.colors.bordeColor,


        },
    });

    return (
        <>
            <TouchableOpacity style={[styles.input]} onPress={() => setShow(true)}>
                <TextInput
                    value={value || formatDate(date)}
                    style={{
                        // color: theme.colors.textPrimary,
                    }}
                    editable={false}
                    pointerEvents="none"
                    onBlur={onBlur}
                />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    locale="es"
                    onChange={onChangeDate}
                    // textColor={theme.colors.textPrimary}
                    disabled={disabled}
                />
            )}
        </>
    );
};
