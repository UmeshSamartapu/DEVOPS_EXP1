// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse form data
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post("/register", (req, res) => {
  const { name, email, phone } = req.body;
  const registrationData = `Name: ${name}, Email: ${email}, Phone: ${phone}\n`;

  // Append data to 'registrations.txt'
  fs.appendFile(
    path.join(__dirname, "registrations.txt"),
    registrationData,
    (err) => {
      if (err) {
        console.error("Error saving registration:", err);
        return res.status(500).send("Error saving registration.");
      }
      res.send("Registration successful!");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
