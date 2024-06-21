/**
 * Author: Paul
 * 
 * License by https://foxcraft.tech
 */

class TitleInput {

    /**
     * 
     * @param {HTMLTextAreaElement} element 
     */
    constructor(element) {

        this.element = element

        this.disableEnter = this.disableEnter.bind(this)
        this.autoAdjustHeight = this.autoAdjustHeight.bind(this)

        element.addEventListener("keydown", this.disableEnter)
        element.addEventListener("change", this.autoAdjustHeight)
        element.addEventListener("input", this.autoAdjustHeight)
        // element.addEventListener("resize", () => setTimeout(this.autoAdjustHeight, 10))
        setTimeout(this.autoAdjustHeight, 10)

        window.addEventListener("resize", this.autoAdjustHeight)

    }

    disableEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    autoAdjustHeight() {
        this.element.style.height = 'auto'
        this.element.style.height = this.element.scrollHeight + 'px'
    }

}


class Toast{

    constructor(toast){
        
        this.timeout = null

        this.toastContainer = document.querySelector(toast)

        this.toastBody = this.toastContainer.querySelector("#toast-body")
        this.closeBtn = this.toastContainer.querySelector("button")
        
        
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)

        this.closeBtn.addEventListener("click", this.hide)
    }

    show(message, timeout=5000){

        if (this.timeout){
            clearTimeout(this.timeout)
        }
        this.toastBody.innerText = message
        this.toastContainer.classList.remove("tw-hidden")

        this.timeout = setTimeout(this.hide, timeout)
    }

    hide(){
        this.toastContainer.classList.add("tw-hidden")
        clearTimeout(this.timeout)
    }

}


class TagInput {
    constructor(containerId) {
        this.container = document.querySelector(containerId)

        this.input = this.container.querySelector("input")

        this.input.addEventListener("keydown", this.handleKeyDown.bind(this))
        this.container.addEventListener("click", () => this.input.focus())
        this.container.addEventListener("focus", () => this.input.focus())

        this.tags = []

    }

    handleKeyDown(event) {

        
        const value = this.input.value.trim()
        if (event.key === 'Enter' && value) {
            event.preventDefault()
            this.input.value = ''
            
            this.createTag(value)

            this.input.focus()
            // return

        } else if (event.key === 'Backspace' && value === '') {
            // Delete the last tag when backspace is pressed and the container is empty
            const tags = Array.from(this.container.querySelectorAll('.tag'))
            if (tags.length > 0) {
                const lastTag = tags[tags.length - 1]
                lastTag.parentNode.removeChild(lastTag)
                this.tags.splice(tags.length - 1, 1)
                // console.log("tags: ", this.tags)

            }
        }
    }

    createTag(value) {
        const tag = document.createElement('li')
        tag.classList.add('tag')
        // tag.contentEditable = false
        tag.innerHTML = `
                        <span>${value}</span>
                        `
        
        const button = document.createElement('button')
        button.className = "bi bi-x tw-text-xl"
        
        button.addEventListener("click", (event, ) => {
            event.preventDefault()
            this.deleteTag(event)
        })
        tag.appendChild(button)

        this.container.insertBefore(tag, this.input)
        // this.container.appendChild(tag)
        this.tags.push(value)

    }
    
    /**
     * 
     * @param {[]} tags - create tags 
     */
    createTags(tags){
        tags.forEach(tag => {
            if (tag.trim() !== ''){
                this.createTag(tag)
            }
        })
        this.input.value = ""
    }

    findIndex(element){
        return [...this.container.children].indexOf(element)
    }

    deleteTag(event){

        const parentNode = event.target.parentNode
        const index = this.findIndex(parentNode)
        
        parentNode.remove()
        
        this.tags.splice(index, 1)
    }

    getTags(){
        return this.tags
    }

    moveCursorToEnd() {
        const range = document.createRange()
        const sel = window.getSelection()
        range.selectNodeContents(this.container)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
    }

}


class EditableDiv {
    // used for quill.js editor image caption
    constructor(element) {
        this.element = element
        this.element.classList.add("editable-div")
        this.maxChars = parseInt(element.getAttribute('max-length')) || Infinity
        this.placeholder = element.getAttribute('placeholder') || ''
        
        // this.element.setAttribute("data-gramm", "false")
        // this.element.setAttribute("data-gramm_editor", "false")
        // this.element.setAttribute("data-enable-grammarly", "false")
        this.init()

        const keys = {
            'backspace': 8,
            'shift': 16,
            'ctrl': 17,
            'alt': 18,
            'delete': 46,
            // 'cmd':
            'leftArrow': 37,
            'upArrow': 38,
            'rightArrow': 39,
            'downArrow': 40,
        }

        this.utils = {
            special: {},
            navigational: {},
            isSpecial(e) {
                return typeof this.special[e.keyCode] !== 'undefined';
            },
            isNavigational(e) {
                return typeof this.navigational[e.keyCode] !== 'undefined';
            }
        }

        this.utils.special[keys['backspace']] = true
        this.utils.special[keys['shift']] = true
        this.utils.special[keys['ctrl']] = true
        this.utils.special[keys['alt']] = true
        this.utils.special[keys['delete']] = true

        this.utils.navigational[keys['upArrow']] = true
        this.utils.navigational[keys['downArrow']] = true
        this.utils.navigational[keys['leftArrow']] = true
        this.utils.navigational[keys['rightArrow']] = true

        // this.handleKeydown = this.handleKeydown.bind(this)
    }

    init() {
        this.element.addEventListener('keydown', this.handleKeydown.bind(this))
        this.element.addEventListener('paste', this.handlePaste.bind(this))
        this.element.addEventListener('keyup', this.updatePlaceholderState.bind(this))
        this.element.addEventListener('input', this.updatePlaceholderState.bind(this))
        this.updatePlaceholderState()
    }

    handleKeydown(event) {
        
        // this.element.focus()
        // console.log("down", event.key)
        let len = event.target.innerText.trim().length
        let hasSelection = false
        // console.log("utils: ", this.utils)
        const selection = window.getSelection()
        const isSpecial = this.utils.isSpecial(event)
        const isNavigational = this.utils.isNavigational(event)

        if (selection) {
            hasSelection = !!selection.toString()
        }

        if (event.key === 'Backspace') {
            if (!hasSelection) {
                if (len === 0) {
                    // If there's no text and no selection, prevent backspace from navigating
                    event.preventDefault()
                    return false
                }
                // Prevent the default behavior of backspace
                event.preventDefault()
                // Get the selection anchor node and offset
                const anchorNode = selection.anchorNode
                const anchorOffset = selection.anchorOffset
                // Create a range for the last character
                const range = document.createRange()
                range.setStart(anchorNode, anchorOffset - 1)
                range.setEnd(anchorNode, anchorOffset)
                // Delete the contents of the range
                range.deleteContents()
            } else {
                // Delete selected text
                document.execCommand('delete')
            }
        }

        if (isSpecial || isNavigational) {
            return true
        }

        if (len >= this.maxChars && !hasSelection) {
            event.preventDefault()
            return false
        }

    }

    handlePaste(event) {
        event.preventDefault()
        const text = (event.clipboardData || window.clipboardData).getData('text').slice(0, this.maxChars - this.element.innerText.length)
        document.execCommand('insertText', false, text)
    }

    updatePlaceholderState() {

        if (this.element.innerText.length === 0) {
            this.element.classList.add('empty')
        } else {
            this.element.classList.remove('empty')
        }
    }
}


class SlideShow{

    constructor(slideContainer, autoNext=true, timeout=6000){

        this.slideContainer = slideContainer
        this.autoNext = autoNext

        this.slideIndex = 0
        this.timeout = null

        this.timeoutTime = timeout

        const dots = this.slideContainer.querySelectorAll('.dot')

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlides(index)
            })
        })

        const nextBtn = this.slideContainer.querySelector(".next")
        const previousBtn = this.slideContainer.querySelector(".prev")

        if (nextBtn && previousBtn){

            nextBtn.addEventListener("click", () => {this.plusSlides(1)})
            previousBtn.addEventListener("click", () => {this.plusSlides(-1)})

        }

        this.plusSlides = this.plusSlides.bind(this)
        this.currentSlide = this.currentSlide.bind(this)
        this.showSlides = this.showSlides.bind(this)
        
        this.showSlides(this.slideIndex)

    }

    plusSlides(i) {
        this.showSlides(this.slideIndex + i)
    }
    
    currentSlide(i) {
        this.showSlides(this.slideIndex + i)
    }

    showSlides(n){
        let slides = this.slideContainer.querySelectorAll(".slides")
        let dots = this.slideContainer.querySelectorAll(".dot")

        this.slideIndex = n

        if (n >= slides.length) { 
            this.slideIndex = 0 
        }
        if (n < 0) { 
            this.slideIndex = slides.length -1
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "")
        }

        slides[this.slideIndex].style.display = "block"
        dots[this.slideIndex].className += " active"

        if (this.autoNext){

            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => this.plusSlides(1), this.timeoutTime)
        }
    }

}


class Modal{

    /**
     * 
     * @param {HTMLElement} modal 
     */
    constructor(modal, title, description){

        this.modal = modal

        const closeBtn = modal.querySelector("#modal-close")

        this.show = this.show.bind(this)
        this.close = this.close.bind(this)
        this.updateModal = this.updateModal.bind(this)
        this.updateButton = this.updateButton.bind(this)
        this.showModalInput = this.showModalInput.bind(this)
        this.hideModalInput = this.hideModalInput.bind(this)

        this.updateModal(title, description)
        closeBtn.addEventListener("click", this.close)

    }

    close(){
        this.modal.classList.add("tw-hidden")
    }

    show(){
        this.modal.classList.remove("tw-hidden")
    }

    showModalInput(){
        const input = this.modal.querySelector("#modal-input")
        input.classList.remove("tw-hidden")
    }

    hideModalInput(){
        const input = this.modal.querySelector("#modal-input")
        input.classList.add("tw-hidden")
    }

    updateButton(text, link){

        const actionBtn = this.modal.querySelector("#modal-action-btn")
        actionBtn.textContent = text
        if (link){
            actionBtn.setAttribute("href", link)
        }else{
            actionBtn.removeAttribute("href")
        }
        actionBtn.addEventListener("click", this.close)
    }

    updateModal(title, description){

        this.modal.querySelector("#modal-title").textContent = title
        this.modal.querySelector("#modal-description").textContent = description
        
    }

}   