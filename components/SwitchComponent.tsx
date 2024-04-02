import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const SwitchComponent = (
        { initialValue = false, onValueChange, style }: 
        { initialValue?: boolean, onValueChange?: (value: boolean) => void, style?: any }
    ) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);
  
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (onValueChange) {
            onValueChange(!isEnabled);
        }
    };
  
    return (
      <View style={[styles.container, style]}>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#246ae0" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});

export default SwitchComponent;