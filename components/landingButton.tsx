
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

type IconName =
    | "info"
    | "analytics"
    | "assignment"
    | "event";

interface buttonComponentProps {
    value?: string,
    iconName?: IconName,
    information?: string
}


const ButtonComponent: React.FC<buttonComponentProps> = ({
    value,
    iconName,
    information
}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
                navigation.navigate("pages", { context: information })
            }
        >
            <MaterialIcons
                name={iconName}
                style={styles.iconStyle}
            ></MaterialIcons>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    text: {
        fontSize: 16
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "48%", // 버튼의 너비 조절
        height: 50, // 버튼의 높이 조절
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },
    iconStyle: {
        fontSize: 25,
        marginLeft: 10,
    },
    buttonText: {
        color: "#5d8bb0",
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 30,
    },
});

export default ButtonComponent;
