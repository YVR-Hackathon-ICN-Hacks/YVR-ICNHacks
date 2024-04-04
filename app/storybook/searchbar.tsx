import CheckboxComponent from '@/components/CheckboxComponent';
import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';
import { SearchBar } from "@rneui/base";
import SearchbarComponent from '@/components/SearchbarComponent';

export default function searchBar() {
    return (
        <View style={styles.container}>
            <SearchbarComponent
                platform='default'
                placeholder='type your query here...'
                placeholderTextColor='#888'>
            </SearchbarComponent>
            <SearchbarComponent
                platform='default'
                placeholder='type your query here...'
                placeholderTextColor='#888'
                round={true}
            >
            </SearchbarComponent>
            <SearchbarComponent
                platform='default'
                placeholder='type your query here...'
                placeholderTextColor='#888'
                round={true}
                showLoading={true}
            >
            </SearchbarComponent>
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
