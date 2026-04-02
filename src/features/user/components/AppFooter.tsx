// src/common/components/AppFooter.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from 'src/common/theme/appColors';

type Props = {
  currentIndex: number;
  onTap: (index: number) => void;
  items?: { icon?: React.ReactNode; label: string }[];
};

export const AppFooter: React.FC<Props> = ({ currentIndex, onTap, items }) => {
  const navItems = items ?? [
    { label: 'Home' },
    { label: 'Search' },
    { label: 'Create' },
    { label: 'Alerts' },
    { label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((it, idx) => {
        const selected = idx === currentIndex;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => onTap(idx)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            {it.icon ?? null}
            <Text style={[styles.label, selected ? styles.selected : null]}>{it.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  selected: {
    color: AppColors.vybrazePurple,
    fontWeight: '700',
  },
});
