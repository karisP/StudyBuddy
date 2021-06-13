"use strict";

const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../study-buddy/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../study-buddy/build', 'index.html'));
});
  
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});
