function classSelect(str) {
    const activeClass = document.getElementById(str);
    if (activeClass) {
        activeClass.classList.add('active');
        console.log(activeClass);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const creditInput = document.getElementById('creditInput');
    const editButton = document.getElementById('editProfileBtn');
    const multiButton = document.getElementById('btnSection');
    const discardBtn = document.getElementById('discard');
    const uploadLabel = document.getElementById('upload');
    const textArea = document.getElementById('jobDesc');
    const creditsBtn = document.getElementById('creditsBtn');
    const chips = document.querySelectorAll('.chipsets > div');

    if (creditInput) {
        creditInput.addEventListener('input', changeVal);
    }

    if (chips) {
        chips.forEach((chip) => {
            chip.addEventListener('click', () => addVal(chip));
        });
    }

    // Fetch and load the navbar asynchronously
    const navbarContainer = document.getElementById('navbarContainer');
    if (navbarContainer) {
        fetch('./navbar.html')
            .then((response) => response.ok ? response.text() : Promise.reject('Network response was not ok'))
            .then((data) => {
                navbarContainer.innerHTML = data; // Assuming 'data' contains the HTML content
                navbarContainer.addEventListener('click', handleNavbarClick);

                // Check if there's a hash in the URL and highlight the corresponding link
                const hash = window.location.hash;
                if (hash) {
                    const targetLink = navbarContainer.querySelector(`a[href="${hash}"]`);
                    if (targetLink) {
                        targetLink.classList.add('active');
                    }
                }
            })
            .catch((error) => console.error('Fetch error:', error));
    }

    if (creditsBtn) {
        creditsBtn.addEventListener('click', loadCreditsPage);
    }

    // Event listeners for edit and discard buttons
    if (editButton) {
        editButton.addEventListener('click', () => setEditMode(true));
    }
    if (discardBtn) {
        discardBtn.addEventListener('click', () => {
            setEditMode(false);
            discardChanges();
        });
    }

    function setEditMode(enable) {
        editButton.style.display = enable ? 'none' : 'flex';
        multiButton.style.display = enable ? 'flex' : 'none';

        if (uploadLabel instanceof Element) {
            uploadLabel.style.opacity = enable ? '1' : '0';
        }

        inputs.forEach((input) => {
            input.disabled = !enable;
        });

        if (textArea instanceof Element) {
            textArea.disabled = !enable;
        }
    }

    function handleNavbarClick(event) {
        const clickedElement = event.target;
        if (clickedElement.tagName === 'A') {
            const activeElements = navbarContainer.querySelectorAll('.active');
            activeElements.forEach((element) => element.classList.remove('active'));

            clickedElement.classList.add('active');
        }
    }

    function loadCreditsPage() {
        fetch('./buyCredits.html')
            .then((response) => response.ok ? response.text() : Promise.reject('Network response was not ok'))
            .then((data) => {
                document.getElementById('creditsContainer').innerHTML = data;
            })
            .catch((error) => console.error('Fetch error for buyCredits.html:', error));
    }
});

function extendNav() {
    const labels = document.querySelectorAll('label');
    labels.forEach((label) => {
        label.style.display = label.style.display === 'none' || label.style.display === '' ? 'inline-block' : 'none';
    });
}

function changeVal(event) {
    const creditInput = document.getElementById('creditInput');
    const balance = document.getElementById('balance');
    const creditScore = document.getElementById('creditScore').innerText;
    const totalBalElements = document.querySelectorAll('span#totalBal');
    const payBtn = document.getElementById('payBtn');

    if (creditInput && balance && totalBalElements && payBtn) {
        let inputValue = Number(creditInput.value);

        if (isNaN(inputValue) || inputValue <= 0) {
            creditInput.value = balance.innerText = inputValue = 0;

            totalBalElements.forEach((totalBal) => totalBal.innerText = inputValue * creditScore);
            payBtn.setAttribute('disabled', 'true');
            event.preventDefault();
        } else {
            payBtn.removeAttribute('disabled');
        }

        balance.innerText = inputValue;
        creditInput.value = inputValue;

        totalBalElements.forEach((totalBal) => totalBal.innerText = inputValue * creditScore);
    }
}

function addVal(val) {
    const creditInput = document.getElementById('creditInput');
    if (creditInput) {
        let numValue = Number(val.innerText);

        if (!isNaN(numValue)) {
            creditInput.value = Number(creditInput.value) + numValue;
            changeVal();
        }
    }
}
