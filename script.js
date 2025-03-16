function saveText() {
  const inputText = document.getElementById("inputText").value;
  if (!inputText) {
    alert("Please enter some text!");
    return;
  }

  // Get existing archives from localStorage
  let archives = JSON.parse(localStorage.getItem("archives")) || [];

  // Add new text to the archive
  archives.push(inputText);
  localStorage.setItem("archives", JSON.stringify(archives));

  // Refresh the list
  displayArchives();
  document.getElementById("inputText").value = "";
}

function displayArchives() {
  const archiveList = document.getElementById("archiveList");
  archiveList.innerHTML = ""; // Clear existing list

  let archives = JSON.parse(localStorage.getItem("archives")) || [];

  archives.forEach((text, index) => {
    const div = document.createElement("div");
    div.className = "archive-item";
    div.innerHTML = `<strong>Entry #${index + 1}</strong><br>${text}`;
    archiveList.appendChild(div);
  });
}

// Load archives on page load
window.onload = displayArchives;
