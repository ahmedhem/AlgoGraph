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

const is_valid_size = (size) => {
    return size >= 1 && size <= 8;

}

const create_matrix = () => {
    const size = document.querySelector('#size').value;
    console.log(size);
    if (is_valid_size(size)) {
        console.log(size);
    }
}


document.querySelector('#create-matrix').addEventListener('click', create_matrix)

