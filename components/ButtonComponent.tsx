import React from 'react';
import { Button, ButtonProps } from '@rneui/themed';
import { StyleSheet } from 'react-native';

interface ButtonComponentProps extends ButtonProps {
    customStyle?: ButtonProps['buttonStyle'];
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ customStyle, ...props }) => {
    return (
        <Button
            {...props}
            buttonStyle={[styles.button, customStyle]}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
});

export default ButtonComponent;