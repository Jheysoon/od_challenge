import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const GRAPH_DISPLAY_MODES = ['1D', '1W ', '1M', '3M', '1Y', 'All'];
export const ESTIMATED_BUTTON_WIDTH =
  (SCREEN_WIDTH - 50) / GRAPH_DISPLAY_MODES.length;

export const Y_DISPLAYS = ['14K', '12K', '10K', '8K', '6K', '4K', '2K'];
export const ESTIMATED_Y_HEIGHT = 250 / Y_DISPLAYS.length;
