class Modal {
    constructor(content = '') {
        this.content = content
        this.insert_content(content)

        this.pop_up = document.getElementById('Modal')

        // when the close icon is clicked close the pop-up
        this.close_icon = document.querySelector('.hide-Modal')
        this.close_icon.onclick = () => (this.pop_up.style.display = 'none')

        // add eventListener to close the pop-up when the background is clicked
        window.onclick = (event) => {
            if (event.target === this.pop_up) this.pop_up.style.display = 'none'
        }
    }

    insert_content(content) {
        document.querySelector('#inserted-content').innerHTML = content
    }

    open(size = 80) {
        // reset the size of the pop-up to 80%
        this.changeSize(size)
        // show the pop-up
        this.pop_up.style.display = 'block'
    }

    close() {
        this.changeSize(80)
        this.close_icon.click()
    }

    // default size is 80%, Min. = 30 and max. 100
    changeSize(width) {
        if (width >= 40 && width <= 100) {
            document.querySelector('.Modal-content').style.width = width + '%'
            return true
        }

        return false
    }
}

// make it a singleton
const modal = new Modal()
Object.freeze(modal)

export default modal
