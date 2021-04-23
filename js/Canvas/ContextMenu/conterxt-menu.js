// functions for the context menu for nodes
function toggleMenu() {
    if (UI.MENU_STATUS !== 1) {
        UI.MENU_STATUS = 1;
        document.querySelector('#context-menu').classList.add("context-menu-active");
    } else {
        document.querySelector('#context-menu').classList.remove("context-menu-active");
        UI.MENU_STATUS = 0;
    }
}

const position_menu = (e) => {
    let menuPositionX = e.clientX + "px";
    let menuPositionY = e.clientY + "px";
    const menu = document.querySelector('#context-menu');
    menu.style.left = menuPositionX;
    menu.style.top = menuPositionY;
}

const startMoveMode = () => {
    toggleMenu();
    UI.MovingMode = true;
}

const updateNodePosition = (e) => {
    if (UI.MovingMode) {
        UI.ContextMenuNode.position = point_in_canvas(UI.canvas, e);
        UI.fire();
    }
}

const stopMovingMode = () => {
    UI.MovingMode = false;
}

const DeleteContextMenuNode = () => {
    toggleMenu();
    deleteElements(UI.ContextMenuNode);
    pair.nodes = [];
    UI.fire();
}