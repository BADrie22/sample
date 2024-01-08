const navbarContainer = document.getElementById('navbarContainer')
if (navbarContainer) {
    fetch('./navbar.html')
        .then((response) =>
            response.ok
                ? response.text()
                : Promise.reject('Network response was not ok')
        )
        .then((data) => {
            navbarContainer.innerHTML = data // Assuming 'data' contains the HTML content

            // Check if there's a hash in the URL and highlight the corresponding link
            const hash = window.location.hash
            if (hash) {
                const targetLink = navbarContainer.querySelector(
                    `a[href="${hash}"]`
                )
                if (targetLink) {
                    targetLink.classList.add('active')
                }
            }
        })
        .catch((error) => console.error('Fetch error:', error))
}
