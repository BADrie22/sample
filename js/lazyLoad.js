document.addEventListener("DOMContentLoaded", () => {
    lazyLoadImages()
})

function lazyLoadImages() {
    let lazyImages = document.querySelectorAll('img')

    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Load the actual image
                    entry.target.src = entry.target.dataset.src
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.5 }
    ) // Adjust the threshold as needed

    lazyImages.forEach((image) => {
        observer.observe(image)
    })
}
