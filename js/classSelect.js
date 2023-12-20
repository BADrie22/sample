fetch('./navbar.html')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    })
    .then((data) => {
        document.getElementById('navbarContainer').innerHTML = data
    })
    .catch((error) => {
        console.error('Fetch error:', error)
    })

document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editProfileBtn')
    const spannable = document.getElementById('spannable')
    const multiButton = document.getElementById('btnSection')
    const discardBtn = document.getElementById('discard')
    const uploadLabel = document.getElementById('upload')
    const inputs = document.querySelectorAll('input')

    editButton.addEventListener('click', () => setEditMode(true))
    discardBtn.addEventListener('click', () => {
        setEditMode(false)
        discardChanges()
    })

    function setEditMode(enable) {
        spannable.innerText = enable ? 'Edit Profile' : 'Your Profile'
        editButton.style.display = enable ? 'none' : 'flex'
        multiButton.style.display = enable ? 'flex' : 'none'
        uploadLabel.style.opacity = enable ? '1' : '0'

        inputs.forEach((input) => {
            input.disabled = !enable
        })
    }
})

const spanText = document.getElementById('upload')
const fileInput = document.getElementById('uploadLogo')
const imagePreview = document.getElementById('imagePreview')
let originalImageSrc = imagePreview.src

function classSelect(str) {
    const activeClass = document.getElementById(str)
    if (activeClass) {
        activeClass.classList.add('active')
        console.log(activeClass)
    }
}

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
