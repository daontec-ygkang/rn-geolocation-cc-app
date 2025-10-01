/**
 * TabBar Component
 * Custom tab navigation for dashboard test modes
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {Text} from './Text';
import type {DetectionMode} from '../types/AppState';

export interface Tab {
  id: DetectionMode;
  label: string;
}

export interface TabBarProps {
  tabs: Tab[];
  activeTab: DetectionMode;
  onTabChange: (tabId: DetectionMode) => void;
  testID?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  testID,
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[styles.container, {borderBottomColor: theme.colors.border}]}
      testID={testID}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              isActive && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 3,
              },
            ]}
            onPress={() => onTabChange(tab.id)}
            testID={`${testID}-tab-${tab.id}`}
            accessibilityRole="tab"
            accessibilityState={{selected: isActive}}>
            <Text
              variant="body"
              weight="medium"
              style={[
                styles.tabLabel,
                {
                  color: isActive
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                },
              ]}
              testID={`${testID}-tab-${tab.id}-label`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: -2,
  },
  tabLabel: {
    textAlign: 'center',
  },
});
