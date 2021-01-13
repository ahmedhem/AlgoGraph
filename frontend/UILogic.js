/* The dimension of the canvas is found using the getBoundingClientRect() function.
*     - This method returns the size of an element and its position relative to the viewport.
*  the x,y of the event :
*       - e.clientX, e.clientY
*  the x, y of the canvas : (x : left, y: top) lef and top are properties of  getBoundingClientRect()
*
 */
function handleClick(a_canvas, e) {
    const clickedPoint = point_in_canvas(a_canvas, e);
    console.log(UI.delete);
    const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y)
    //seprate the delete from drawing
    if(UI.delete){
            if(clickedNode){
               deleteElements(clickedNode);
        }
    }
    else {
        if (clickedNode) {
            toggleNode(clickedNode)
        } else {
            // will fire all the subscribed functions (ex. update UI >>> which use drawNode)
            nodes.addNode(clickedPoint)
        }
    }
}
