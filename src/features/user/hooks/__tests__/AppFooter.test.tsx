/// <reference types="jest" />
import React from 'react';
import {render} from '@testing-library/react-native';
import {AppFooter} from '../../components/AppFooter';

test('AppFooter renders', () => {
  const tree = render(<AppFooter currentIndex={0} onTap={() => {}} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
