document.addEventListener('DOMContentLoaded', function () {
    // Fetch and insert content from navbar.html
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
            console.error('Fetch error for navbar.html:', error)
        })

    // Fetch and insert content from buyCredits.html into a different container
    fetch('./buyCredits.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then((data) => {
            document.getElementById('creditsContainer').innerHTML = data
        })
        .catch((error) => {
            console.error('Fetch error for buyCredits.html:', error)
        })
})
