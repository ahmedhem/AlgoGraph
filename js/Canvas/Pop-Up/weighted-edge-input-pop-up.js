






//..listing for enter clicks in the popup input field
document.querySelector('#weight-input').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        const value = e.target.value;
        handleWeightInput(value);
        e.target.value = 1;
    }
});

document.querySelector(".cancel").addEventListener('click', (e) => {
    let value = document.querySelector('#weight-input').value;
    handleWeightInput(value);
    document.querySelector("#weight-input").value = 1;
});
