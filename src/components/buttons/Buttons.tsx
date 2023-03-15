import React from 'react';
import {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {Styles} from '../styles/Styles';

interface IButtons {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export const Buttons = (props: IButtons) => {
  const {onPress, title, isBlue, isGray} = props;

  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={
        isBlue
          ? Styles.btnBlue
          : isGray
          ? Styles.btnGray
          : theme === 'light'
          ? Styles.btnDark
          : Styles.btnLight
      }
      onPress={onPress}>
      <Text
        style={
          isBlue || isGray
            ? Styles.smallTextDark
            : theme === 'dark'
            ? Styles.smallTextDark
            : Styles.smallTextLight
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
