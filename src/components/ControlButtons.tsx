/**
 * ControlButtons Component
 * Start/Stop control buttons for activity detection
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from './Button';

interface ControlButtonsProps {
  isDetecting: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isDetecting,
  onStart,
  onStop,
  disabled = false,
}) => {
  return (
    <View style={styles.container} testID="control-buttons">
      {!isDetecting ? (
        <Button
          title="감지 시작"
          variant="primary"
          onPress={onStart}
          disabled={disabled}
          testID="start-button"
        />
      ) : (
        <Button
          title="감지 중지"
          variant="danger"
          onPress={onStop}
          disabled={disabled}
          testID="stop-button"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
