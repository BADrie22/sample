document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('advancedOptions')
        .addEventListener('click', () => loadAdvancedOptions())
})

function toggleCheckbox(checkboxElement) {
    const checkbox = checkboxElement.previousElementSibling
    checkbox.checked = !checkbox.checked
}

function clearFilters() {
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })

    // Remove 'active' from the sidebar
    const activeElement = document.getElementById('active')
    if (activeElement) {
        activeElement.removeAttribute('id')
    }
}

function loadAdvancedOptions() {
    // Fetch the content of searchBox.html and update the page
    fetch('searchBox.html')
        .then((response) => response.text())
        .then((html) => {
            document.getElementById('searchBox').innerHTML = html
        })
        .catch((error) =>
            console.error('Error loading advanced options:', error)
        )
}
