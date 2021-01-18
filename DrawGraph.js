function drawNode(ctx, node, num, color = null) {
    const x = node.x, y = node.y;
    ctx.beginPath();

    /* Properties of the circle*/
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color ? color : "#000";
    /* Properties of the number inside the center*/
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "20px serif";


    ctx.arc(x, y, 18, 0, 2 * Math.PI);
    ctx.fillText(num, x, y);
    ctx.stroke();
    // if the node is clicked then change the background
    if (color) {
        ctx.fillStyle = 'rgba(0,255,0,.2)';
        ctx.fill();
        ctx.fillStyle = 'black'
    }
    ctx.closePath();

}

function getDist(x, y, x1, y1) {
    return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

function DrawWeight(ctx, xt, yt, x1t, y1t, x, y, w, h, txt) {
    ctx.beginPath();
    /**** weight****/
    ctx.font = "15px arial";
    ctx.fillStyle = "#d7d7d7";
    ctx.strokeStyle = "#fff";
    ctx.fill();
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, (xt + x1t) / 2, (yt + y1t) / 2);
    ctx.stroke();
    ctx.closePath();

}

function getCorrectPoints(x, y, x1, y1) {
    let d = getDist(x, y, x1, y1);
    let t = 18 / d, t1 = (d - 18) / d;
    let xt = (1 - t) * x + t * x1,
        x1t = (1 - t1) * x + t1 * x1,
        yt = (1 - t) * y + t * y1,
        y1t = (1 - t1) * y + t1 * y1;
    return [xt, yt, x1t, y1t];
}
function checkifoppEdgeExist(x,y,x1,y1){
    let c1=new CanvasNode(x,y);
    let c2=new CanvasNode(x1,y1);
    return edges.checkEqual(new CanvasEdge(c2,c1))

}
function drawEdge(ctx, node1, node2)
{
    const x = node1.x, y = node1.y,
        x1 = node2.x, y1 = node2.y;
    let points = getCorrectPoints(x, y, x1, y1);

    let xt = points[0], yt = points[1], x1t = points[2], y1t = points[3];

    drawLineWithArrows(ctx, xt, yt, x1t, y1t, 7, 7, UI.isDirected,checkifoppEdgeExist(x,y,x1,y1));
    let txt = "10";
    // DrawWeight(ctx, xt, yt, x1t, y1t, (xt + x1t) / 2 - ctx.measureText(txt).width / 2, (yt + y1t) / 2 - 10, ctx.measureText(txt).width + 1, 16 * 1.286, "10");

}

function drawLineWithArrows(ctx, x0, y0, x1, y1, aWidth, aLength, arrow,opp) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var angle = Math.atan2(dy, dx);
    var length = Math.sqrt(dx * dx + dy * dy);
    //
    ctx.translate(x0, y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(1, 1);
    if (arrow) {
        if(opp)
        ctx.quadraticCurveTo(length / 3, length / 3, length - 3, 0);
        else         ctx.lineTo(length,0);

        ctx.moveTo(length - aLength, -aWidth + 3);
        ctx.lineTo(length, 0);
        ctx.lineTo(length - aLength, aWidth + 3);
    }else{
        ctx.lineTo(length,0);
    }
    //
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

