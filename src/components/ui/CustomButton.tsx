import React, { FC } from 'react';
import {Text, StyleSheet, ButtonProps, TouchableOpacity} from 'react-native';

export enum ButtonTypes {
  PRIMARY   = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY  = 'TERTIARY',
}

type Props = {
  type: ButtonTypes,
  bgColor?: string,
  fgColor?: string,
}


const CustomButton: FC<Props & ButtonProps> = ({onPress, title, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;