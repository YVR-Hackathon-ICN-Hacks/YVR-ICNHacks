import CheckboxComponent from '@/components/CheckboxComponent';
import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';

export default function Checkbox() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>1. Checkbox with different sizes</Text>
            <View style={styles.row}>
                <CheckboxComponent
                    initialValue={true}
                />
                <CheckboxComponent
                    initialValue={false}
                    size={30}
                />
                <CheckboxComponent
                    initialValue={true}
                    size={40}
                />
            </View>
            <Text style={styles.text}>2. Checkbox with static & dynamic title</Text>
            <CheckboxComponent
                title="Keyboard"
            />
            <CheckboxComponent
                title={`Click Here to ${isChecked ? 'Remove' : 'Add'}`}
                initialValue={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)}
            />
            <CheckboxComponent
                title="Another"
                checkedTitle="Easy Way"
            />
            <Text style={styles.text}>3. Checkbox with disabled state</Text>
            <CheckboxComponent
                title="Disabled"
                disabled
            />
            <Text style={styles.text}>4. Checkbox with custom icons & colours</Text>
            <View style={styles.row}>
                <CheckboxComponent
                    checkedIcon="heart"
                    uncheckedIcon="heart-o"
                    checkedColor="red"
                    uncheckedColor="gray"
                />
                <CheckboxComponent
                    checkedIcon="star"
                    uncheckedIcon="star-o"
                    checkedColor="yellow"
                    uncheckedColor="gray"
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
