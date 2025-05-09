import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import { useAppTheme } from "@/hooks";
import { Label } from "../../labels";
import Flag from 'react-world-flags';
import { usePlatform } from "@/hooks";
import { Divider } from "react-native-paper";

interface ISelectField {
    items: { label: string; value: string, code: string }[];
    placeholder: string;
    onValueChange: (value: string) => void;
    selectedValue: string | null;
    disabled: boolean;
}

export const SelectField = ({
    items,
    placeholder,
    onValueChange,
    selectedValue,
    disabled = false,
}: ISelectField) => {
    const theme = useAppTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const platform = usePlatform();

    const handleItemSelect = (item: string) => {
        onValueChange(item);
        setModalVisible(false);
    };
    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.selector]}
                disabled={disabled}
            >
                <Label text={selectedValue || placeholder} disabled={disabled} />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <FlatList
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.flatListContent}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleItemSelect(item.value)}
                                        style={styles.itemOption}
                                    >
                                        {
                                            platform === true ? (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Flag code={item.code.toUpperCase()} style={{ ...styles.flag, width: 30, height: 20 }} />
                                                    <Label text={"- "} style={{ marginHorizontal: 1 }} />
                                                    <Label text={item.value} />
                                                </View>

                                            ) : (
                                                <Label text={item.label} />
                                            )
                                        }
                                    </TouchableOpacity>
                                )}
                            />
                            <Divider />
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Label text={"Cerrar"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    selector: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: width * 0.9,
        maxHeight: height * 0.9,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    flatListContent: {
        paddingVertical: 10,
    },
    itemOption: {
        padding: 15,
    },
    closeButton: {
        padding: 15,
        alignItems: "center",
    },
    flag: {
        width: 30,  // Tamaño ajustado para mejor visibilidad
        height: 20, // Ajuste de altura proporcional
        marginRight: 10,
    },
});
