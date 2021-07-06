import modal from "./Modal.js";
import {handleWeightInput} from "../../functions.js";

export function openPopup() {
    modal.insert_content(`
        <div class="weight-container">
            <span id="weight-input-text">Want to Add a weight?</span>
            <input id="weight-input" class="" type="number" min="0" value="1">
            <button type="submit" class="btn cancel">Confirm</button>
        </div>
    `)

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


    modal.open()
    modal.changeSize(50)
}


