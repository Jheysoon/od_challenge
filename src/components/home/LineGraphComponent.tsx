import React, {useState} from 'react';

import numeral from 'numeral';
import {StyleSheet, Text, View} from 'react-native';
import {LineGraph} from 'react-native-graph';
import {Card} from 'react-native-paper';
import {PressableScale} from 'react-native-pressable-scale';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  ESTIMATED_BUTTON_WIDTH,
  ESTIMATED_Y_HEIGHT,
  GRAPH_DISPLAY_MODES,
  Y_DISPLAYS,
} from '../../constants/LineGraph';
import {generateRandomGraphData} from '../../utils/generateRandomGraphData';
import {CustomSelectionDot} from './CustomSelectionDot';

const SPACING = 5;
const MULTIPLIER = 5;
const POINT_COUNT = GRAPH_DISPLAY_MODES.length * MULTIPLIER;
const POINTS = generateRandomGraphData(POINT_COUNT);
const GRADIENT_FILL_COLORS = ['rgba(232,151,61,.45)'];
const buttonWidth =
  ESTIMATED_BUTTON_WIDTH / GRAPH_DISPLAY_MODES.length - 2 * SPACING;

const LineGraphComponent = () => {
  const [graphDisplayMode, setGraphDisplayMode] = useState('All');
  const [points, setPoints] = useState(POINTS);

  const selectedModeIndex = GRAPH_DISPLAY_MODES.indexOf(graphDisplayMode);
  const selectionBackgroundStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidth,
      opacity: withTiming(selectedModeIndex === -1 ? 0 : 1, {
        easing: Easing.linear,
        duration: 150,
      }),
      transform: [
        {
          translateX: withSpring(
            buttonWidth * selectedModeIndex + 2 * SPACING * selectedModeIndex,
            {
              mass: 1,
              stiffness: 900,
              damping: 300,
            },
          ),
        },
      ],
    };
  }, [buttonWidth, selectedModeIndex]);

  return (
    <View style={{margin: 10}}>
      <Card>
        <Card.Content>
          <Text style={styles.lastValue}>
            {numeral(points[points.length - 1].value).format('$0,0')}
          </Text>
          <View style={styles.graphColumnContainer}>
            <View style={styles.graphContainer}>
              <LineGraph
                style={styles.graph}
                animated={true}
                color={'#e99d47'}
                points={points}
                lineThickness={4}
                indicatorPulsating={true}
                enablePanGesture={true}
                enableFadeInMask={true}
                SelectionDot={CustomSelectionDot}
                gradientFillColors={GRADIENT_FILL_COLORS}
              />
            </View>
            <View style={{width: 25, marginTop: 3}}>
              {Y_DISPLAYS.map((yDisplay, index) => (
                <Text key={index} style={{height: ESTIMATED_Y_HEIGHT}}>
                  {yDisplay}
                </Text>
              ))}
            </View>
          </View>

          <View style={[styles.container]}>
            <Reanimated.View
              style={[styles.selectionBackground, selectionBackgroundStyle]}
            />
            {GRAPH_DISPLAY_MODES.map((displayMode, index) => (
              <View key={index} style={styles.buttonContainer}>
                <PressableScale
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    marginHorizontal: SPACING,
                    paddingVertical: 2.5,
                    borderRadius: 4,
                    backgroundColor:
                      displayMode === graphDisplayMode
                        ? '#617081'
                        : 'transparent',
                  }}
                  onPress={() => {
                    setPoints(
                      generateRandomGraphData((index + 1) * MULTIPLIER),
                    );
                    setGraphDisplayMode(displayMode);
                  }}>
                  <Text
                    style={{
                      color: displayMode === graphDisplayMode ? '#fff' : '#333',
                    }}>
                    {displayMode}
                  </Text>
                </PressableScale>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LineGraphComponent;

const styles = StyleSheet.create({
  lastValue: {
    textAlign: 'center',
    fontSize: 20,
  },
  graphColumnContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  graphContainer: {
    flexGrow: 1,
    marginRight: 15,
  },
  spacer: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 15,
  },
  graph: {
    width: '100%',
    height: 250,
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionBackground: {
    position: 'absolute',
    height: '100%',
    marginLeft: SPACING,
    borderRadius: 7,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SPACING,
    paddingVertical: 2.5,
  },
});
