const spanText = document.getElementById('upload')
const fileInput = document.getElementById('uploadLogo')
const imagePreview = document.getElementById('imagePreview')
let originalImageSrc = imagePreview.src

function handleFile() {
    const file = fileInput.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => (imagePreview.src = e.target.result)
        reader.readAsDataURL(file)
        spanText.style.opacity = '0'
    } else {
        imagePreview.src = originalImageSrc
    }
}

function discardChanges() {
    imagePreview.src = originalImageSrc
    fileInput.value = null
}
