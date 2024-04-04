import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from "@rneui/base";

interface SearchbarComponentProps {
    platform?: "default" | "ios" | "android";
    // containerStyle?: string;
    // inputContainerStyle?: string;
    // inputStyle?: string;
    // leftIconContainerStyle?: string;
    // rightIconContainerStyle?: string;
    // loadingProps?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    round?: boolean;
    showLoading?: boolean;
}


const SearchbarComponent: React.FC<SearchbarComponentProps> = ({
    platform,
    placeholder,
    placeholderTextColor,
    round,
    showLoading
}) => {

    return (
        <SearchBar
            platform={platform}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            round={round}
            showLoading={showLoading}
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
});

export default SearchbarComponent;