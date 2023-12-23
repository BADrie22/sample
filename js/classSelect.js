function classSelect(str) {
    const activeClass = document.getElementById(str)
    if (activeClass) {
        activeClass.classList.add('active')
        console.log(activeClass)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const creditInput = document.getElementById('creditInput')
    if (creditInput) {
        creditInput.addEventListener('input', changeVal)
    }

    const chips = document.querySelectorAll('.chipsets > div')
    if (chips) {
        chips.forEach((chip) => {
            chip.addEventListener('click', function () {
                addVal(this)
            })
        })
    }

    const editButton = document.getElementById('editProfileBtn')
    const multiButton = document.getElementById('btnSection')
    const discardBtn = document.getElementById('discard')
    const uploadLabel = document.getElementById('upload')
    const inputs = document.querySelectorAll('input')
    const textArea = document.getElementById('jobDesc')
    const creditsBtn = document.getElementById('creditsBtn')

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

    if (creditsBtn instanceof Element) {
        creditsBtn.addEventListener('click', () => {
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
    }

    // Event listeners for edit and discard buttons
    if (editButton) {
        editButton.addEventListener('click', () => setEditMode(true))
    }
    if (discardBtn) {
        discardBtn.addEventListener('click', () => {
            setEditMode(false)
            discardChanges()
        })
    }

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

function changeVal(event) {
    const creditInput = document.getElementById('creditInput')
    const balance = document.getElementById('balance')
    const creditScore = document.getElementById('creditScore').innerText
    const totalBalElements = document.querySelectorAll('span#totalBal')
    const payBtn = document.getElementById('payBtn')

    if (creditInput && balance && totalBalElements && payBtn) {
        let inputValue = Number(creditInput.value)

        if (isNaN(inputValue) || inputValue <= 0) {
            creditInput.value = balance.innerText = inputValue = 0
            
            totalBalElements.forEach((totalBal) => {
                totalBal.innerText = inputValue * creditScore
            })
            payBtn.setAttribute('disabled', 'true')
            event.preventDefault()
        } else {
            payBtn.removeAttribute('disabled')
        }

        balance.innerText = inputValue
        creditInput.value = inputValue

        totalBalElements.forEach((totalBal) => {
            totalBal.innerText = inputValue * creditScore
        })
    }
}

function addVal(val) {
    const creditInput = document.getElementById('creditInput')
    if (creditInput) {
        let numValue = Number(val.innerText)

        if (!isNaN(numValue)) {
            creditInput.value = Number(creditInput.value) + numValue
            changeVal()
        }
    }
}
