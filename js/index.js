//...Initializing the UI and the Canvas variables
const the_canvas = document.getElementById('main_canvas');
if (the_canvas && the_canvas.getContext) {
    the_canvas.width = the_canvas.offsetWidth;
    the_canvas.height = the_canvas.offsetHeight;

    const ctx = the_canvas.getContext('2d');
    if (ctx) {
        //...the graph
        graph = new Graph();

        drawUI(the_canvas, ctx);
        UI.canvas = the_canvas;
        UI.ctx = ctx;
        UI.subscribe(drawUI);
    }
}

//...handling the popup
function openPopup(edge) {
    document.getElementById("myForm").style.display = "block";
    switch_to_focus_mode();
}function closeForm() {
    document.getElementById("myForm").style.display = "none";
    switch_to_normal_mode();
}


function switch_to_focus_mode() {
    document.querySelector("#container").style.pointerEvents = "none";
    document.querySelector("#container").style.opacity = "50%";
}

function switch_to_normal_mode() {
    document.querySelector("#container").style.pointerEvents = "auto";
    document.querySelector("#container").style.opacity = "100%";
}

function edgePopup(edge) {
    switch_to_focus_mode();
    /***** The container *****/
    let theContainer = document.createElement("div");
    theContainer.classList.add("edges-container");
    document.querySelector(".edge-popup-container").appendChild(theContainer);

    /***** The Main three rows  *****/
    addElements("div", "div", "Start Node", "End Node", ["header"], ["header"]);
    addElements("div", "div", edge.start, edge.end, ["edge-info"], ["edge-info"]);
    addElements("div", null, "Weights", null, ["header"], null);

    /*****Weights******/
    let weight = edge.weights;
    for (let i of weight) {
        addElements("div", "button", i, "Delete Weight", ["edge-info"], ["edge-info", "removeEdgeBtn"],edge);
    }

    /********Close Button *********/
    let CloseButton = document.createElement("button");
    CloseButton.classList.add("confirm");
    CloseButton.innerText = "Close";
    CloseButton.addEventListener('click', () => {
        theContainer.remove();
        switch_to_normal_mode();

    });
    document.querySelector(".edges-container").appendChild(CloseButton);

}
function addElements(left, right, leftText, rightText, leftClass, rightClass,edge) {
    let container = document.createElement("div");
    container.classList.add("edge");
    let startNode1 = document.createElement(left);

    for (let i of leftClass)
        startNode1.classList.add(i);

    startNode1.innerText = leftText;
    container.appendChild(startNode1);

    if (right != null) {
        let EndNode = document.createElement(right);
        for (let i of rightClass)
            EndNode.classList.add(i);
        EndNode.innerText = rightText;
        if(right=="button"){
            EndNode.addEventListener("click",()=>{
                container.remove();
                graph.removeEdge(edge.start,edge.end,leftText);
            });
        }

        container.appendChild(EndNode);

    }
    document.querySelector(".edges-container").appendChild(container);

}
