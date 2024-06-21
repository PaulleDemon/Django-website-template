Trix.config.blockAttributes.heading2 = {
    tagName: "h2",
    className: "sample                                                                                                                                          ",
    breakOnReturn: true,
    group: false,
    terminal: true
}

Trix.config.blockAttributes.heading3 = {
    tagName: "h3",
    breakOnReturn: true,
    group: false,
    terminal: true
}

Trix.config.blockAttributes.heading4 = {
    tagName: "h4",
    breakOnReturn: true,
    group: false,
    terminal: true
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

addEventListener("trix-attachment-add", function (event) {
    if (event.attachment.file) {
        handleUpload(event.attachment)
    }
})

function handleUpload(attachment) {
    uploadFile(attachment.file, setProgress, setAttributes)

    function setProgress(progress) {
        attachment.setUploadProgress(progress)
    }

    function setAttributes(attributes) {
        attachment.setAttributes(attributes)
    }
}

function uploadFile(file, progressCallback, successCallback) {
    var formData = new FormData()
    var xhr = new XMLHttpRequest()
    formData.append("Content-Type", file.type)
    formData.append("file", file)
    xhr.open("POST", "/trix-editor/upload/", true)
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
    xhr.upload.addEventListener("progress", function (event) {
        progressCallback(event.loaded / event.total * 100)
    })
    xhr.addEventListener("load", function (event) {
        if (xhr.status === 200) {
            let attributes = {
                url: JSON.parse(xhr.responseText).attachment_url
            }
            successCallback(attributes)
        }
    })
    xhr.send(formData)
}

window.addEventListener("trix-initialize", event => {
    console.log("initialized")

    const { toolbarElement } = event.target
    const h1Button = toolbarElement.querySelector("[data-trix-attribute=heading1]")
    h1Button.insertAdjacentHTML("afterend", `
        <button type="button" class="trix-button" data-trix-attribute="heading3" 
                title="Heading 3" tabindex="-1" data-trix-active="">H3</button>
    `)
    h1Button.insertAdjacentHTML("afterend", `
        <button type="button" class="trix-button" data-trix-attribute="heading2" 
                title="Heading 2" tabindex="-1" data-trix-active="">H2</button>
    `)
    
})