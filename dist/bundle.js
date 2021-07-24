/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Canvas/Graph.js":
/*!*****************************!*\
  !*** ./src/Canvas/Graph.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphPoint": () => (/* binding */ GraphPoint),
/* harmony export */   "GraphEdge": () => (/* binding */ GraphEdge),
/* harmony export */   "Graph": () => (/* binding */ Graph)
/* harmony export */ });
class GraphPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class GraphEdge {
    constructor(startNodeNumber, endNodeNumber) {
        this.start = startNodeNumber;
        this.end = endNodeNumber;
        //...do not allow duplicate values
        this.weights = new Set();
    }

    addWeight(weight) {
        return this.weights.add(weight);
    }

    removeWeight(weight) {
        this.weights.delete(weight);
        if (this.weights.size === 0) return -1;
    }

    equals(otherEdge) {
        return this.start === otherEdge.start && this.end === otherEdge.end;
    }

    toString() {
        const weights = [...this.weights].join(', ');
        return `from ${this.start} to  ${this.end} with weight {${weights}}`
    }
}


class GraphNode {
    constructor(position, nodeNumber) {
        this.position = position;
        this.number = nodeNumber;
        this.color = "#000";
        this.edges = new Set();
    }

    addEdge(endNodeNumber, weight = 1) {
        const edge = this.getEdge(endNodeNumber);
        if (!edge) {
            const newEdge = new GraphEdge(this.number, endNodeNumber);
            newEdge.addWeight(weight);

            this.edges.add(newEdge);
            return true;
        }

        edge.addWeight(weight);
        return true;
    }

    //...if called without a weight remove the entire edge
    //...with a weight remove the weight
    removeEdge(endNodeNumber, weight) {
        const edge = this.getEdge(endNodeNumber);
        if (edge) {
            if (weight) {
                let rem = edge.removeWeight(weight);
                if (rem === -1) this.edges.delete(edge);
            } else {
                this.edges.delete(edge);
            }

            return true;
        }

        return false

    }

    getEdge(endNumber) {
        let edge = null;
        for (let e of this.edges.keys()) {
            if (e.end === endNumber) {
                edge = e;
            }
        }
        return edge;
    }

    //...remove all the edges between two nodes
    removeConnection(endNode) {
        this.removeEdge(endNode);
        endNode.removeEdge(this);
    }

    equals(otherNode) {
        return this.number === otherNode.number;
    }

    toString() {
        return this.number;
    }
}


class Graph {
    constructor() {
        this.nodes = new Set();
        this.nodeCount = 1;
        this.availableNum = [];
    }

    addNode(position) {
        let nodeNumber = null;
        if (this.availableNum.length !== 0) {
            nodeNumber = this.availableNum[0];
            this.availableNum.splice(0, 1);
        } else {
            nodeNumber = this.nodeCount;
        }
        const newNode = new GraphNode(position, nodeNumber);
        this.nodes.add(newNode);
        this.nodeCount++;
        UI.fire();
    }

    getNode(number) {
        let node = null;

        for (let n of this.nodes.keys()) {
            if (n.number === number)
                node = n;
        }

        return node;
    }

    removeNode(number) {
        const node = this.getNode(number);
        const nodeNumber = node.number;
        for (let n of this.nodes.keys()) {
            for (let e of n.edges.keys()) {
                if (e.end === nodeNumber) {
                    this.removeEdge(e.start, e.end);
                }
            }
        }
        this.availableNum.push(nodeNumber)
        this.nodes.delete(node);
        this.nodeCount--;
        UI.fire();
    }

    addEdge(startNodeNumber, endNodeNumber, weight = 1) {
        const start = this.getNode(startNodeNumber);
        const end = this.getNode(endNodeNumber);

        if (start && end) {
            start.addEdge(end.number, weight);
            UI.fire();
            return true;
        }
        return false;
    }

    removeEdge(startNodeNumber, endNodeNumber, weight) {
        const start = this.getNode(startNodeNumber);
        const end = this.getNode(endNodeNumber);
        const removed = start.removeEdge(end.number, weight);
        if (removed)
            UI.fire();
        return removed;

    }

    getEdge(startNodeNumber, endNodeNumber) {
        const start = this.getNode(startNodeNumber);
        const end = this.getNode(endNodeNumber);

        return start.getEdge(end.number);
    }

}

/***/ }),

/***/ "./src/Canvas/Pair.js":
/*!****************************!*\
  !*** ./src/Canvas/Pair.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pair": () => (/* binding */ pair)
/* harmony export */ });
/* harmony import */ var _Pop_Up_weighted_edge_input_pop_up_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pop-Up/weighted-edge-input-pop-up.js */ "./src/Canvas/Pop-Up/weighted-edge-input-pop-up.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./src/index.js");
/* harmony import */ var _Graph_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Graph.js */ "./src/Canvas/Graph.js");




let pair = {
    nodes: [],
    add: function (point) {
        if (this.nodes.length === 1) {
            this.nodes.push(point);
            UI.popupEdge = _index_js__WEBPACK_IMPORTED_MODULE_1__.graph.getEdge(this.nodes[0].number, this.nodes[1].number);

            /***Create new Edge if first time***/
            if (!UI.popupEdge) UI.popupEdge = new _Graph_js__WEBPACK_IMPORTED_MODULE_2__.GraphEdge(this.nodes[0].number, this.nodes[1].number);

            /***check if weighted or un weighted ****/
            if (UI.isWighted) (0,_Pop_Up_weighted_edge_input_pop_up_js__WEBPACK_IMPORTED_MODULE_0__.openPopup)();
            else {
                _index_js__WEBPACK_IMPORTED_MODULE_1__.graph.addEdge(this.nodes[0].number, this.nodes[1].number);
                if(!UI.isDirected)_index_js__WEBPACK_IMPORTED_MODULE_1__.graph.addEdge(this.nodes[1].number, this.nodes[0].number);

            }

            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    },
};

/***/ }),

/***/ "./src/Canvas/Pop-Up/Modal.js":
/*!************************************!*\
  !*** ./src/Canvas/Pop-Up/Modal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Modal {
    constructor(content = '') {
        this.content = content
        this.insert_content(content)

        this.pop_up = document.getElementById("Modal");

        // when the close icon is clicked close the pop-up
        this.close_icon = document.querySelector(".hide-Modal");
        this.close_icon.onclick = () => this.pop_up.    style.display = "none";


        // add eventListener to close the pop-up when the background is clicked
        window.onclick = (event) => {
            if (event.target === this.pop_up)
                this.pop_up.style.display = "none";
        }
    }

    insert_content(content) {
        document.querySelector("#inserted-content").innerHTML = content;
    }

    open (size = 80) {
        // reset the size of the pop-up to 80%
        this.changeSize(size)
        // show the pop-up
        this.pop_up.style.display = 'block'

    }

    close () {
        this.changeSize(80)
        this.close_icon.click()
    }

    // default size is 80%, Min. = 30 and max. 100
    changeSize(width) {
        if (width >= 40 && width <= 100) {
            document.querySelector(".Modal-content").style.width = width + "%";
            return true
        }

        return false
    }
}

// make it a singleton
const modal = new Modal()
Object.freeze(modal)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/Canvas/Pop-Up/weighted-edge-input-pop-up.js":
/*!*********************************************************!*\
  !*** ./src/Canvas/Pop-Up/weighted-edge-input-pop-up.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openPopup": () => (/* binding */ openPopup)
/* harmony export */ });
/* harmony import */ var _Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.js */ "./src/Canvas/Pop-Up/Modal.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functions.js */ "./src/functions.js");



function openPopup() {
    _Modal_js__WEBPACK_IMPORTED_MODULE_0__.default.insert_content(`
        <div class="weight-container">
            <span id="weight-input-text">Want to Add a weight?</span>
            <input id="weight-input" class="" type="number" min="0" value="1">
            <button type="submit" class="btn cancel">Confirm</button>
        </div>
    `)

    //..listing for enter clicks in the popup input field
    document.querySelector('#weight-input').addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value;
            (0,_functions_js__WEBPACK_IMPORTED_MODULE_1__.handleWeightInput)(value);
            e.target.value = 1;
        }
    });

    document.querySelector(".cancel").addEventListener('click', (e) => {
        let value = document.querySelector('#weight-input').value;
        (0,_functions_js__WEBPACK_IMPORTED_MODULE_1__.handleWeightInput)(value);
        document.querySelector("#weight-input").value = 1;
    });


    _Modal_js__WEBPACK_IMPORTED_MODULE_0__.default.open()
    _Modal_js__WEBPACK_IMPORTED_MODULE_0__.default.changeSize(50)
}




/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
// the UI notifier
class UiNotifier {
    constructor() {
        this.ctx = null;
        this.canvas = null;
        this.delete = false;
        this.isDirected = false;
        this.isWighted = false;
        this.popupEdge = null;
        this.observers = [];
        // context menu
        this.MENU_STATUS = 0;
        this.ContextMenuNode = null;
        this.MovingMode = false;
        //default size
        this.nodeSize = 15;
        this.nodePicked = null;
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter(fn => {
            if (fn !== fnToRemove)
                return fn;
        });
    }

    fire() {
        this.observers.forEach(fn => {
            fn(this.canvas, this.ctx, this.nodeSize);
        });
    }

}

const UI = new UiNotifier();



/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleNode": () => (/* binding */ toggleNode),
/* harmony export */   "isPointInNode": () => (/* binding */ isPointInNode),
/* harmony export */   "drawNodes": () => (/* binding */ drawNodes),
/* harmony export */   "drawEdges": () => (/* binding */ drawEdges),
/* harmony export */   "drawUI": () => (/* binding */ drawUI),
/* harmony export */   "handleWeightInput": () => (/* binding */ handleWeightInput)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas/Pair.js */ "./src/Canvas/Pair.js");
/* harmony import */ var _Canvas_Pop_Up_Modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Canvas/Pop-Up/Modal.js */ "./src/Canvas/Pop-Up/Modal.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI */ "./src/UI.js");




/*
* return x,y in respect to the given canvas (could work with other elements)
* pass to every function in canvasGunction.js the UI.nodeSIze parameter
* */


/*
* if the node in the pair remove it if not add it
* */
function toggleNode(node) {
    for (let i = 0; i < 2; i++) {
        if (_Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.nodes[i] && node.equals(_Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.nodes[i])) {
            _Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.nodes = [];
            _UI__WEBPACK_IMPORTED_MODULE_3__.UI.fire();
            return;
        }
    }

    _Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.add(node);
    _UI__WEBPACK_IMPORTED_MODULE_3__.UI.fire();
}


// (check after refactoring >>> done)
function isPointInNode(x, y) {
    for (let node of _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.nodes.keys()) {
        const d = getDist(x, y, node.position.x, node.position.y);
        if (d <= _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize)
            return node;
    }
    return false;
}

// (check after refactoring >>> done)
let drawNodes = function (ctx) {
    for (let node of _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.nodes.keys()) {
        drawNode(ctx, node, node.number, node.color, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize);
    }
}

// (check after refactoring >>> done)
let drawEdges = function (ctx) {
    for (let node of _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.nodes.keys()) {
        for (let edge of node.edges) {
            drawEdge(ctx, _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.getNode(edge.start), _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.getNode(edge.end), null, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize)
        }
    }

}


let drawUI = function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNodes(ctx, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize);
    drawEdges(ctx, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize);
    if (_Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.nodes[0]) {
        drawNode(ctx, _Canvas_Pair_js__WEBPACK_IMPORTED_MODULE_1__.pair.nodes[0], "", 'green', _UI__WEBPACK_IMPORTED_MODULE_3__.UI.nodeSize, 1);
    }
}

function handleWeightInput(value) {
    _UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge.addWeight(Number(value));
    _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.addEdge(_UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge.start, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge.end, Number(value));
    if (!_UI__WEBPACK_IMPORTED_MODULE_3__.UI.isDirected)
        _index_js__WEBPACK_IMPORTED_MODULE_0__.graph.addEdge(_UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge.end, _UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge.start, Number(value));
    _UI__WEBPACK_IMPORTED_MODULE_3__.UI.popupEdge = 0;

    _Canvas_Pop_Up_Modal_js__WEBPACK_IMPORTED_MODULE_2__.default.close()
}


//**********************************


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "the_canvas": () => (/* binding */ the_canvas),
/* harmony export */   "graph": () => (/* binding */ graph)
/* harmony export */ });
/* harmony import */ var _Canvas_Graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas/Graph */ "./src/Canvas/Graph.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


// the new imports just to build a dependence graph

// import * as listeners from "./listeners"
// import dragElement from "./utils/DragElement"
// import {DrawAsTree} from "./Algorithms/Draw-as-tree";
// import {save_graph_as_txt} from "./sidebar/buttons/Save";
// import {updateCanvas} from "./sidebar/buttons/Clear";
// import {deleteElements} from "./sidebar/buttons/Delete";
// import {draw_graph_from_text} from "./sidebar/buttons/textInput";
// import {toggleColorPicker} from "./sidebar/buttons/color-picker";
// import {edge_direction} from "./sidebar/buttons/GraphSetting";
// import {create_matrix} from "./sidebar/buttons/matrix-input";
// import {resize_site} from "./sidebar/toolbox";
// import modal from "./Canvas/Pop-Up/Modal";
// import {edgePopup} from "./Canvas/Pop-Up/edge-weights-pop-up";
// import {openPopup} from "./Canvas/Pop-Up/weighted-edge-input-pop-up";
// import {pair} from "./Canvas/Pair";
// import {GraphEdge} from "./Canvas/Graph";
// import {position_menu} from "./Canvas/ContextMenu/conterxt-menu";
// import {drawLineWithArrows} from "./Canvas/canvasFunctions";
// import {point_in_canvas} from "./Canvas/edge-clicked-handler";
//
// // the css files
// import "../css/index.css";
// import "../css/toolbox.css";
// import "../css/tooltip.css";
//
// // the static files
// import image from "../assets/images/graph.png";
// import image1 from "../assets/images/logo.png";
// import image2 from "../assets/images/logo1.png";
// import image3 from "../assets/images/logo2.png";
// import svg1 from "../assets/icons/administration.svg"
// // other svg files


//...Initializing the UI and the Canvas variables


const the_canvas = document.getElementById('main_canvas');

const graph = new _Canvas_Graph__WEBPACK_IMPORTED_MODULE_0__.Graph();

if (the_canvas && the_canvas.getContext) {
    the_canvas.width = window.innerWidth;
    the_canvas.height =  0.87 *  window.innerHeight;

    const ctx = the_canvas.getContext('2d');
    if (ctx) {
        (0,_functions__WEBPACK_IMPORTED_MODULE_1__.drawUI)(the_canvas, ctx);
        _UI__WEBPACK_IMPORTED_MODULE_2__.UI.canvas = the_canvas;
        _UI__WEBPACK_IMPORTED_MODULE_2__.UI.ctx = ctx;
        _UI__WEBPACK_IMPORTED_MODULE_2__.UI.subscribe(_functions__WEBPACK_IMPORTED_MODULE_1__.drawUI);

    }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map