const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/upload", (req, res) => {
    const { name, text } = req.body;

    if (!name || !text) {
        return res.status(400).json({ message: "Missing name or document text." });
    }

    const filePath = path.join(__dirname, "uploads", `${name}_document.txt`);
    
    fs.writeFile(filePath, text, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving document." });
        }
        res.json({ message: `Document saved successfully as ${name}_document.txt` });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
