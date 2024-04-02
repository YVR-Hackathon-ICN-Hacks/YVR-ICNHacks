import SwitchComponent from '@/components/SwitchComponent';

import { StyleSheet } from 'react-native';

import { View, Text } from '@/components/Themed';
import React from 'react';

export default function Switch() {
    return (
        <View style={styles.container}>
            <SwitchComponent
                initialValue={true}
            />
            <SwitchComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      rowGap: 20,
    }
});
  