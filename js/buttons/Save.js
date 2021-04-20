const saveButton = document.querySelector('.save');
saveButton.addEventListener('click', (e) => saveClickedHandler(e));


const saveClickedHandler = (e) => {
    save_graph_as_img();
}


function save_graph_as_img() {
    // create an img form the canvas
    const img = UI.canvas.toDataURL("image/png");

    // add the img as a downloadable Link to a div with display: none
    const downloadDiv = document.querySelector('#download');
    downloadDiv.innerHTML = `<a download="graph.png" href="${img}" title="ImageName"></a>`;

    // click the link automatically to download the img
    document.querySelector("#download a").click();

    // remove the link from the div after downloading
    downloadDiv.innerHTML = "";

}



