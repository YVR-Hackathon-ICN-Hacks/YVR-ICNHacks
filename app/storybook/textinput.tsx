import CheckboxComponent from '@/components/CheckboxComponent';
import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';
import { SearchBar } from "@rneui/base";
import SearchbarComponent from '@/components/SearchbarComponent';
import TextinputComponent from '@/components/TextinputComponent';

export default function searchBar() {
    const [text, onChangeText] = React.useState('some sample text...');
    const [number, onChangeNumber] = React.useState('');

    return (
        <View style={styles.container}>
            <TextinputComponent placeholder='lorem...' value={text} onChangeText={onChangeText} >
            </TextinputComponent>
            <TextinputComponent placeholder='lorem...' value={number} onChangeText={onChangeNumber} >
            </TextinputComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    view: {
        margin: 10,
    },
});
