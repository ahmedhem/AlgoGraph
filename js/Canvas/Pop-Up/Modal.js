class Modal {
    constructor(content = '') {
        this.content = content
        this.insert_content(content)

        this.pop_up = document.getElementById("Modal");

        // when the close icon is clicked close the pop-up
        this.close_icon = document.querySelector(".hide-Modal");
        this.close_icon.onclick = () => this.pop_up.    style.display = "none";


        // add eventListener to close the pop-up when the background is clicked
        window.onclick = (event) => {
            if (event.target === this.pop_up)
                this.pop_up.style.display = "none";
        }
    }

    insert_content(content) {
        document.querySelector("#inserted-content").innerHTML = content;
    }

    open () {
        // show the pop-up
        this.pop_up.style.display = 'block'

    }

    close () {
        this.close_icon.click()
    }
}

const modal = new Modal()
modal.open()

modal.insert_content(`<h1>hi!</h1>`)