import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { TextController } from "@/components/molecules";
import { BtnPrimary } from "@/components/atoms/btn/btnPrimary";
import { Avatar } from "@/components/atoms";
import { useUserStore } from "@/store";

export const FromProfile = () => {
    const { user } = useUserStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            email: "",
            name: "",
            lastName: "",
            nationality: "",
            gender: "",
            phone: "",
            avatar: "",
        },
    });

    // Actualiza cada campo con setValue al montar el componente
    useEffect(() => {
        if (user) {
            setValue("name", user.name || "");
            setValue("lastName", user.lastName || "");
            setValue("nationality", user.nationality || "");
            setValue("gender", user.gender || "");
            setValue("email", user.email || "");
            setValue("phone", user.phone || "");
            setValue("avatar", user.avatar || "");
        }
    }, [user]);

    const avatarValue = watch("avatar");

    const submit = (data: any) => {
        console.log("Datos del formulario:", data);
        // Aquí podrías hacer un update al store o API
    };

    return (
        <View style={styles.container}>
            <Avatar size={200} source={avatarValue} />
            <TextController
                control={control}
                error={errors["name"]?.message}
                label="Nombre"
                name="name"
            />
            <TextController
                control={control}
                error={errors["lastName"]?.message}
                label="Apellidos"
                name="lastName"
            />
            <TextController
                control={control}
                error={errors["nationality"]?.message}
                label="Nacionalidad"
                name="nationality"
            />
            <TextController
                control={control}
                error={errors["gender"]?.message}
                label="Género"
                name="gender"
            />
            <TextController
                control={control}
                error={errors["email"]?.message}
                label="Correo"
                name="email"
            />
            <TextController
                control={control}
                error={errors["phone"]?.message}
                label="Teléfono"
                name="phone"
            />
            <BtnPrimary
                color="tertiary"
                label="Guardar cambios"
                onPress={handleSubmit(submit)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 18,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
