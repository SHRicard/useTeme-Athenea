import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { useAppTheme } from '@/hooks';


export const Divider = () => {
    const theme = useAppTheme();

    return (
        <View style={[styles.divider, { backgroundColor: theme.colors.textOnPrimary }]}></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 1,
    },
});
