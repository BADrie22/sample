function classSelect(str) {
    const activeClass = document.getElementById(str)
    if (activeClass) {
        activeClass.classList.add('active')
        console.log(activeClass)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editProfileBtn')
    const multiButton = document.getElementById('btnSection')
    const discardBtn = document.getElementById('discard')
    const uploadLabel = document.getElementById('upload')
    const inputs = document.querySelectorAll('input')
    const textArea = document.getElementById('jobDesc')

    // Fetch and load the navbar asynchronously
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

    // Event listeners for edit and discard buttons
    editButton.addEventListener('click', () => setEditMode(true))
    discardBtn.addEventListener('click', () => {
        setEditMode(false)
        discardChanges()
    })

    // Function to set the edit mode
    function setEditMode(enable) {
        editButton.style.display = enable ? 'none' : 'flex'
        multiButton.style.display = enable ? 'flex' : 'none'

        // Check if uploadLabel is defined and is an element before modifying it
        if (uploadLabel instanceof Element) {
            uploadLabel.style.opacity = enable ? '1' : '0'
        }

        inputs.forEach((input) => {
            input.disabled = !enable
        })

        if (textArea instanceof Element) {
            document.querySelector('textarea').disabled = !enable
        }
    }
})
