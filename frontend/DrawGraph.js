var canvas = document.getElementById("Container");

function DrawNode(node, num) {
    var x = node.x, y = node.y;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();

    /* Properties of the circle*/
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#000";

    /* Properties of the number inside the center*/
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "20px serif";


    ctx.arc(x, y, 18, 0, 2 * Math.PI);
    ctx.fillText(num, x, y);
    ctx.stroke();

    ctx.closePath();

}

function getDist(x, y, x1, y1) {
    return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

function DrawEdge(node1, node2) {
    var x = node1.x, y = node1.y,
        x1 = node2.x, y1 = node2.y;

    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    /* change the points from be on the center to be on the border */
    var d = getDist(x, y, x1, y1);
    var t = 18 / d, t1 = (d - 18) / d;
    var xt = (1 - t) * x + t * x1,
        x1t = (1 - t1) * x + t1 * x1,
        yt = (1 - t) * y + t * y1,
        y1t = (1 - t1) * y + t1 * y1;

    ctx.moveTo(xt, yt);
    ctx.lineTo(x1t, y1t);
    ctx.stroke();
    ctx.closePath();
}

