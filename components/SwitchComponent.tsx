import React, { useState } from 'react';
import { Switch, SwitchProps } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

interface CustomSwitchProps extends SwitchProps {
    initialValue?: boolean; 
    onToggle?: (value: boolean) => void; 
}

const SwitchComponent: React.FC<CustomSwitchProps> = ({
    initialValue = false,
    onToggle,
    ...switchProps
  }) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);
  
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      if (onToggle) {
        onToggle(!isEnabled);
      }
    };
  
    return (
      <View style={styles.container}>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          {...switchProps}
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