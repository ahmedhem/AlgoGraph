function drawNode(ctx, node, num, color = null, size , isReady =null) {
    const x = node.position.x, y = node.position.y;
    ctx.beginPath();

    /* Properties of the circle*/
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color ? color : "#000";
    /* Properties of the number inside the center*/
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${size}px serif`;

    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillText(num, x, y);
    ctx.stroke();
    // if the node is clicked then change the background
    if (isReady) {
        ctx.fillStyle = 'rgba(0,255,0,.2)';
        ctx.fill();
        ctx.fillStyle = 'black'
    }
    ctx.closePath();

}

function getDist(x, y, x1, y1) {
    return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}


function getCorrectPoints(x, y, x1, y1, size) {
    let d = getDist(x, y, x1, y1);
    let t = size / d, t1 = (d - size) / d;
    let xt = (1 - t) * x + t * x1,
        x1t = (1 - t1) * x + t1 * x1,
        yt = (1 - t) * y + t * y1,
        y1t = (1 - t1) * y + t1 * y1;
    return [xt, yt, x1t, y1t];
}

function checkIfOppEdgeExist(node1, node2) {
    return node2.getEdge(node1.number);
}

function drawEdge(ctx, node1, node2, width = null, size) {
    ctx.strokeStyle =  "#000";

    const x = node1.position.x, y = node1.position.y,
        x1 = node2.position.x, y1 = node2.position.y;
    let points = getCorrectPoints(x, y, x1, y1, UI.nodeSize);

    let xt = points[0], yt = points[1], x1t = points[2], y1t = points[3];
    drawLineWithArrows(ctx, xt, yt, x1t, y1t, size, UI.isDirected, checkIfOppEdgeExist(node1, node2), size);
}

function drawLineWithArrows(ctx, x0, y0, x1, y1, aLength, arrow, opp, size) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let angle = Math.atan2(dy, dx);
    let length = Math.sqrt(dx * dx + dy * dy);
    let w = 8;
    ctx.lineWidth=1;
    if (size < 9) w = 6;
    console.info(w);
    ctx.translate(x0, y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(1, 1);
    if (arrow) {
        if (opp)
            ctx.quadraticCurveTo(length / 4, length / 4, length, 0);
        else
            ctx.lineTo(length, 0);

        ctx.moveTo(length - aLength, -w);
        ctx.lineTo(length, 0);
        if (opp) ctx.lineTo(length - aLength, w );
        else ctx.lineTo(length - aLength, w);
    } else {
        ctx.lineTo(length, 0);
    }
    //
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}


// function DrawWeight(ctx, xt, yt, x1t, y1t, x, y, w, h, txt) {
//     ctx.beginPath();
//     /**** weight****/
//     ctx.font = "15px arial";
//     ctx.fillStyle = "#d7d7d7";
//     ctx.strokeStyle = "#fff";
//     ctx.fill();
//     ctx.fillRect(x, y, w, h);
//     ctx.fillStyle = "black";
//     ctx.strokeStyle = "black";
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(txt, (xt + x1t) / 2, (yt + y1t) / 2);
//     ctx.stroke();
//     ctx.closePath();
//
// }