const matrix = document.getElementById("matrix");

// when the user click the button show the matrix
document.querySelector('#matrix-input').addEventListener('click', () => matrix.style.display = 'block')

// when the user click the x button close the pop-up
const close = document.querySelector(".hide-matrix");

close.onclick = function() {
    matrix.style.display = "none";
}

// when the user click on the backdrop
window.onclick = (event) => {
    if (event.target === matrix)
        matrix.style.display = "none";
}

// ensure the number of nodes are allowed
const is_valid_size = (size) => {
    return size >= 1 && size <= 8;

}

const create_table = (n) => {
    const matrix_table = document.querySelector('#matrix-table');

    // clean any old tables
    matrix_table.innerHTML = '';

    // create new table
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    // create a header with the numbers of the columns
    const thead = document.createElement('thead')
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerText = '-';
    tr.appendChild(td);

    for (let j = 0; j < n; j++) {
        const td = document.createElement('td');
        td.innerText = `${j + 1}`;
        tr.appendChild(td)
    }

    thead.appendChild(tr)
    table.appendChild(thead);

    // create the matrix
    const tbody = document.createElement('tbody');

    for (let i = 0; i < n; i++) {
        const tr = document.createElement('tr');

        // adding the row number
        const label = document.createElement('td');
        label.innerText = `${i + 1}`
        tr.appendChild(label)

        // adding the cells
        for (let j = 0; j < n; j++) {
            const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `cell_${i + 1}_${j + 1}`;
                input.value = '0';
                td.appendChild(input);
                tr.appendChild(td)
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    matrix_table.appendChild(table);

    // showing the draw graph button
    document.querySelector('#draw_matrix').style.display = 'block';
}

const draw_graph_from_matrix = () => {
    // clear the canvas
    updateCanvas(UI.canvas);

    // draw the nodes
    // TODO : use the calcPosition function after the feature is implemented
    let x = 100;
    let y = 100;
    let count = 0;
    const nodes_count = document.querySelectorAll('#matrix-table tbody tr').length;
    console.log(nodes_count)
    for (let i = 1; i <= nodes_count; i++) {
        if (count <= 4) {
            x += 100;
            graph.addNode(new GraphPoint(x, y));
            count++;
        } else {
            x = 100;
            y += 100;
            graph.addNode(new GraphPoint(x, y));
            count = 0
        }

    }

    // get all the edges weights and draws them(inputs inside td)
    const table_cells = document.querySelectorAll('#matrix-table table tbody td input');

    for (const cell of table_cells) {
        const weight = Number(cell.value);

        // don`t draw any zero weights
        if (weight !== 0) {
            const id_data = cell.id.split("_");
            const start = id_data[1];
            const end = id_data[2];
            console.log(start, end, weight)
            graph.addEdge(Number(start), Number(end), weight);
        }

    }


    // close the matrix window
    matrix.style.display = 'none';
}

const create_matrix = () => {
    const size = document.querySelector('#size').value;
    if (is_valid_size(size))
        create_table(size);
    else
        document.querySelector('#matrix-table').innerHTML = `<h3 style="color: red">Enter a valid Size</h3>`;
}

// draw the graph and close the matrix window when the button is clicked
document.querySelector('#draw_matrix').addEventListener('click', () => draw_graph_from_matrix());

// create the matrix table when a valid size is entered and the button is clicked
document.querySelector('#create-matrix').addEventListener('click', create_matrix)

