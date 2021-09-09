import { NODE, EDGE } from "./VisualizerConstants";

// TODO: create the functions that handle every animation and add them here
const ChangesHandler = {
  [NODE.CHANGE]: {
    [NODE.ANIMATIONS.NODE_SWAP]: "",
    [NODE.ANIMATIONS.NODE_SIZE_CHANGE]: "",
    [NODE.ANIMATIONS.NODE_COLOR_CHANGE]: "",
    [NODE.ANIMATIONS.NODE_POSITION_CHANGE]: "",
  },
  [EDGE.CHANGE]: {
    [EDGE.ANIMATIONS.EDGE_COLOR_CHANGE]: "",
    [EDGE.ANIMATIONS.EDGE_WEIGHT_CHANGE]: "",
    [EDGE.ANIMATIONS.EDGE_WEIGHT_DISPLAY]: "",
  },
};

export default ChangesHandler;
