const minSal = document.getElementById('minSal');
const maxSal = document.getElementById('maxSal');
const yourForm = document.querySelector('form'); // Replace with your actual form ID

yourForm.addEventListener('submit', function (event) {
    if (!isValidSalaryRange(minSal.value, maxSal.value)) {
        alert("Please ensure the salary range is valid");
        event.preventDefault();
    }
});

function isValidSalaryRange(min, max) {
    const minNumeric = parseInt(min, 10);
    const maxNumeric = parseInt(max, 10);

    if (isNaN(minNumeric) || isNaN(maxNumeric)) {
        return false; // Non-numeric values are not valid
    }

    if (minNumeric < 0 || maxNumeric < 0) {
        return false; // Negative values are not valid
    }

    if (minNumeric >= maxNumeric) {
        return false; // Ensure min is less than max
    }

    if (min.length < 4 || max.length < 4) {
        return false; // Ensure the length is greater than or equal to 4
    }

    return true;
}
