import ButtonComponent from '@/components/ButtonComponent';
import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Button Types</Text>
            <View style={styles.row}>
                <ButtonComponent
                    title="Solid"
                    onPress={() => console.log("Clicked")}
                />
                <ButtonComponent
                    title="Outline"
                    type="outline"
                />
                <ButtonComponent
                    title="Clear"
                    type="clear"
                />
            </View>
            <Text style={styles.text}>Button Sizes</Text>
            <View style={styles.row}>
                <ButtonComponent
                    title="Small"
                    size="sm"
                />
                <ButtonComponent
                    title="Medium"
                    size="md"
                />
                <ButtonComponent
                    title="Large"
                    size="lg"
                />
            </View>
            <Text style={styles.text}>Button Colours</Text>
            <View style={styles.row}>
                <ButtonComponent
                    title="Primary"
                />
                <ButtonComponent
                    title="Warning"
                    color="warning"
                />
                <ButtonComponent
                    title="Error"
                    color="error"
                />
                <ButtonComponent
                    title="Success"
                    color="success"
                />
                <ButtonComponent
                    title="Custom"
                    color="#4FDB8D"
                />
            </View>
            <Text style={styles.text}>Button Status</Text>
            <View style={styles.row}>
                <ButtonComponent
                    title="Disabled"
                    disabled
                />
            </View>
            <Text style={styles.text}>Button with Icon</Text>
            <View style={styles.row}>
                <ButtonComponent>
                    Save
                    <Icon name="save" color="white" />
                </ButtonComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
    },
    row: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    }
});