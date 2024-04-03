import React, { useState } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import { View, StyleSheet, Text } from 'react-native';

interface CheckboxComponentProps {
    title?: string;
    checkedTitle?: string;
    initialValue?: boolean;
    onValueChange?: (newValue: boolean) => void;
    size?: number;
    checkedIcon?: string;
    uncheckedIcon?: string;
    checkedColor?: string;
    uncheckedColor?: string;
    disabled?: boolean;
}


const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
    title,
    checkedTitle,
    initialValue = false,
    onValueChange,
    size = 24,
    checkedIcon = "check-square",
    uncheckedIcon = "square",
    checkedColor = "#246ae0",
    uncheckedColor = "#DADADA",
    disabled
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(initialValue);

    const toggleCheckbox = (newValue: boolean) => {
        setIsChecked(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <CheckBox
            title={title}
            checked={isChecked}
            checkedTitle={checkedTitle}
            onPress={() => toggleCheckbox(!isChecked)}
            size={size}
            containerStyle={styles.container}
            textStyle={styles.text}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checkedColor={checkedColor}
            uncheckedColor={uncheckedColor}
            disabled={disabled}
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

export default CheckboxComponent;