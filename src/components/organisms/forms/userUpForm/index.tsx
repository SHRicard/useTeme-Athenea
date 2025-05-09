import React, { useEffect, } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { TextController } from "@/components/molecules";
import { BtnPrimary } from "@/components/atoms/btn/btnPrimary";
import { Avatar } from "../../../atoms";

export const UserUpForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
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

    useEffect(() => {
        const userData = getUserData();
        reset(userData);
    }, [])
    const avatarValue = watch('avatar');
    const submit = () => {

    }

    const getUserData = () => {
        return {
            name: "Luis Pablo",
            lastName: "Gomez",
            nationality: 'Peruana',
            gender: 'Masculino',
            email: 'correo@atenea.com',
            phone: '1199732244',
            avatar: 'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-174669.jpg?semt=ais_hybrid&w=740'
        }
    }
    return (
        <View style={styles.container}>
            <Avatar size={200} source={avatarValue} />
            <TextController
                control={control}
                error={errors['name']?.message}
                label="Nombre"
                name="name"
            />
            <TextController
                control={control}
                error={errors['lastName']?.message}
                label="Apellidos"
                name="lastName"
            />
            <TextController
                control={control}
                error={errors['nationality']?.message}
                label="Nacionalidad"
                name="nationality"
            />
            <TextController
                control={control}
                error={errors['gender']?.message}
                label="Género"
                name="gender"
            />
            <TextController
                control={control}
                error={errors['email']?.message}
                label="Correo"
                name="email"
            />
            <TextController
                control={control}
                error={errors['phone']?.message}
                label="Telefono"
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
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
});
