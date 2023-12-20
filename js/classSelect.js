const spanText = document.getElementById("upload");
function classSelect(str) {
  const activeClass = document.getElementById(str);
  if (activeClass) {
    activeClass.classList.add("active");
    console.log(activeClass);
  }
}

// Fetch and insert the navbar content
fetch("./navbar/navbar.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text(); // Change to response.text() to handle HTML content
  })
  .then((data) => {
    // Handle the HTML content
    document.getElementById("navbarContainer").innerHTML = data;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

function setVisible() {
  spanText.style.opacity = "1";
}

function handleFile() {
  const fileInput = document.getElementById("uploadLogo");
  const imagePreview = document.getElementById("imagePreview");

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
    spanText.style.opacity = "0";
  } else {
    // Handle case where no file is selected
    imagePreview.src = "#";
  }
}
