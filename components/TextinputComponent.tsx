import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput } from 'react-native';
import { SearchBar } from "@rneui/base";

interface TextinputComponentProps {
    onChangeText?: (newValue: string) => void;
    value?: string;
    placeholder?: string;
}


const TextinputComponent: React.FC<TextinputComponentProps> = ({
    onChangeText,
    value,
    placeholder,
}) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
        />
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default TextinputComponent;