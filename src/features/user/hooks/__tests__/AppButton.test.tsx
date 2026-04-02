/// <reference types="jest" />
import React from 'react';
import { render } from '@testing-library/react-native';
import { AppButton, AppButtonType } from '../../components/AppButton';
test('AppButton renders primary', () => {
  const tree = render(<AppButton label="Save" onPress={() => {}} type={AppButtonType.primary} />);
  expect(tree.toJSON()).toMatchSnapshot();
});

test('AppButton renders white', () => {
  const tree = render(<AppButton label="Cancel" onPress={() => {}} type={AppButtonType.white} />);
  expect(tree.toJSON()).toMatchSnapshot();
});

