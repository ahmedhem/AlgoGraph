function drawNode(ctx, node, num, color=null) {
    const x = node.x, y = node.y;
    ctx.beginPath();

    /* Properties of the circle*/
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color? color: "#000";

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

function drawEdge(ctx, node1, node2) {
    const x = node1.x, y = node1.y,
        x1 = node2.x, y1 = node2.y;

 /****Line***/
    /* change the points from be on the center to be on the border */
    let d = getDist(x, y, x1, y1);
    let t = 18 / d, t1 = (d - 18) / d;
    let xt = (1 - t) * x + t * x1,
        x1t = (1 - t1) * x + t1 * x1,
        yt = (1 - t) * y + t * y1,
        y1t = (1 - t1) * y + t1 * y1;
    drawLineWithArrows(ctx,xt,yt,x1t,y1t,7,7,false,true);

    ctx.beginPath();
    /**** weight****/
    let txt="10";
    ctx.font = "15px arial";
    ctx.fillStyle="#d7d7d7";
    ctx.strokeStyle = "#fff";

    ctx.fill();
    ctx.fillRect((xt+x1t)/2-ctx.measureText(txt).width/2,(yt+y1t)/2-10,ctx.measureText(txt).width+1,16*1.286);
    ctx.fillStyle="black";
    ctx.strokeStyle="black";

    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt,(xt+x1t)/2,(yt+y1t)/2);
    ctx.stroke();
    ctx.closePath();
/***/

}
function drawLineWithArrows(ctx,x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
    var dx=x1-x0;
    var dy=y1-y0;
    var angle=Math.atan2(dy,dx);
    var length=Math.sqrt(dx*dx+dy*dy);
    //
    ctx.translate(x0,y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(1,1);
    ctx.quadraticCurveTo(length/3   ,length/3         ,length-3,0);
    if(arrowStart){
        ctx.moveTo(aLength,-aWidth);
        ctx.lineTo(0,0);
        ctx.lineTo(aLength,aWidth);
    }
    if(arrowEnd){

        ctx.moveTo(length-aLength,-aWidth+3);
        ctx.lineTo(length,0);
        ctx.lineTo(length-aLength,aWidth+3);
    }
    //
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);
}

