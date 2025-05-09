import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { EmailController } from "../../../molecules";

interface IFormCredentials {
    onSubmit: (data: any) => void;
}

export const FormSignin = () => {
    const [openError, setOpenError] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <View style={styles.container}>
            <EmailController
                control={control}
                error={errors?.email?.message}
                placeholder="Email"
                label="Email"
                required={true}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        paddingVertical: 20,
    },
});
