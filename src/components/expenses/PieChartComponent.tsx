import React from 'react';

import {StyleSheet, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import Legend from './Legend';

const data = [
  {x: 'Rent \n25%', y: 25},
  {x: 'Restaurants \n19%', y: 19},
  {x: 'Drinks \n30%', y: 30},
  {x: 'Uber \n8%', y: 8},
  {x: 'Groceries \n18%', y: 18},
];

const PieChartComponent = () => {
  return (
    <View style={styles.container}>
      <VictoryPie
        style={{
          labels: {
            fill: 'white',
            stroke: 'none',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
        data={data}
        innerRadius={70}
        labelRadius={80}
        colorScale={['#ff8e9b', '#209ef6', '#9fd664', '#fed38d', '#fe8710']}
      />
      <View style={styles.legendWrapper}>
        <Legend bgColor="#ff8e9b" text="Rent" />
        <Legend bgColor="#209ef6" text="Restaurants" />
        <Legend bgColor="#9fd664" text="Drinks" />
        <Legend bgColor="#fed38d" text="Uber" />
        <Legend bgColor="#fe8710" text="Groceries" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -20,
    marginRight: -20,
  },
  chart: {
    flex: 1,
    backgroundColor: '#fff',
  },
  legendWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default PieChartComponent;
