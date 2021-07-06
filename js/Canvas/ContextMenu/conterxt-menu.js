import {point_in_canvas} from "../edge-clicked-handler.js";
import {deleteElements} from "../../sidebar/buttons/Delete.js";
import {pair} from "../Pair.js";

// functions for the context menu for nodes
export function toggleMenu() {
    if (UI.MENU_STATUS !== 1) {
        UI.MENU_STATUS = 1;
        document.querySelector('#context-menu').classList.add("context-menu-active");
    } else {
        document.querySelector('#context-menu').classList.remove("context-menu-active");
        UI.MENU_STATUS = 0;
    }
}

export const position_menu = (e) => {
    let menuPositionX = e.clientX + "px";
    let menuPositionY = e.clientY + "px";
    const menu = document.querySelector('#context-menu');
    menu.style.left = menuPositionX;
    menu.style.top = menuPositionY;
}

export const startMoveMode = () => {
    toggleMenu();
    UI.MovingMode = true;
}

export const updateNodePosition = (e) => {
    if (UI.MovingMode) {
        UI.ContextMenuNode.position = point_in_canvas(UI.canvas, e);
        UI.fire();
    }
}

export const stopMovingMode = () => {
    UI.MovingMode = false;
}

export const DeleteContextMenuNode = () => {
    toggleMenu();
    deleteElements(UI.ContextMenuNode);
    pair.nodes = [];
    UI.fire();
}