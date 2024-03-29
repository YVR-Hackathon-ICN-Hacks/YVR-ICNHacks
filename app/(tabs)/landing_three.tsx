import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LandingThree() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Landing page design 3</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        height: 100
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    textContainer: {
        alignItems: 'flex-start',
        // borderWidth: 1, // Border width
        // borderColor: '#ccc',
        paddingLeft: 30
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, // Adjust as needed for horizontal padding
        marginTop: 20, // Adjust as needed for top margin
    },
    viewStyle: {
        backgroundColor: "#ffffff",
        flex: 1,
        width: 200,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Adjust the value as needed for rounded border
        elevation: 5, // Shadow elevation (Android specific)
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        margin: 10
    },
    textStyle: {
        fontSize: 20,
        padding: 15,
        color: 'black',
        textAlign: 'center'
    }
});
