import {graph} from "../../index.js";
import {the_canvas} from "../../index.js";
//READ that First
/*
 -every node has a distance equal to 15 between any adjancent node
 - every depth has distance equal to 15 between any adjancent depth
 - every depth has a blocks define the positions which the node can be placed in
 - setXRootPosition(u) function define the position which the root will be placed in and i make it the center
 - setPosition() function : find the best positon from the parent node to this node in the block to make the bfs looks better





 */
let mxNodes = 0;

function setXRootPosition(u) {
    let width = the_canvas.width;
    // strart position
    let x = UI.nodeSize + 15;
    // counter which counts the max number of node to be placed in one depth
    let i = 1;
    for (; i <= 1000000; i++) {
        x += (UI.nodeSize * 2 + 15);
        if (x > width) break;
    }
    // i/2 which means the center of the row
    u.position.x = UI.nodeSize + 15 + i / 2 * (UI.nodeSize * 2 + 15);
    //i is the max number of nodes can be placed in one row
    mxNodes = i - 1;
}

function setPosition(u, v, dep, blocks) {
    let width = the_canvas.width;
    //start posiiton in the row
    let x = UI.nodeSize + 15;
    // the heght of the node
    let y = dep * (UI.nodeSize + 5) * 2 + 15 * (dep - 1);
    // 0 means the first blace then it increament in the loop
    // the Condition here means if the first has occuped or not
    let bestPosition = 0, bestDitance = blocks[0] === 0 ? getDist(x, y, u.position.x, u.position.y) : 10000000;
    for (let i = 1; i <= mxNodes; i++) {
        x += (UI.nodeSize * 2 + 15);
        if (blocks[i] !== 0) continue;
        if (x > width) break;
        if (getDist(x, y, u.position.x, u.position.y) < bestDitance) {
            bestDitance = getDist(x, y, u.position.x, u.position.y);
            bestPosition = i;
        }
    }
    blocks[bestPosition] = 1;
    x = bestPosition ? UI.nodeSize + 15 + bestPosition * (UI.nodeSize * 2 + 15) : UI.nodeSize + 15;
    v.position.x = x;
    v.position.y = y;

}

export function DrawAsTree() {
    // vis is the visited array which define if the node visited or not
    let queue = [],
        vis = new Array(graph.nodeCount + 1);
    vis.fill(0);

    let root = graph.getNode(1);
    queue.push(root);
    vis[1] = 1;
    // depth counter and number of node in each depth , intially in first depth there is only one node which is root
    let dep = 1, sizeOfDepth = 1;
    setXRootPosition(root);
    root.position.y = dep * (UI.nodeSize + 5) * 2;
    while (queue.length != 0) {
        // imagine that we have matrix of size n*m which we will place the grapth in that matrix as every cell has one node
        // blocks array  define the row with  size of maxNode possible and say if the cell has ocupped or not
        let blocks = new Array(mxNodes + 1).fill(0);
        for (let i = 1; i <= sizeOfDepth; i++) {
            let u = queue.shift();
            for (let i of u.edges.keys()) {
                if (vis[i.end] === 0) {
                    vis[i.end] = 1;
                    let v = graph.getNode(i.end);
                    queue.push(v);
                    setPosition(u, v, dep + 1, blocks);
                }
            }
        }
        dep++;
        sizeOfDepth = queue.length;
    }
    UI.fire();
}