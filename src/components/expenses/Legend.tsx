import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type Props = {
  bgColor: string;
  text: string;
};

const Legend = ({bgColor, text}: Props) => {
  return (
    <View style={styles.legendWrapper}>
      <View
        style={{
          backgroundColor: bgColor,
          width: 10,
          height: 10,
          marginTop: 5,
          marginRight: 5,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  legendWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Legend;
