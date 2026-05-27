const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4200;
const DIST_PATH = path.join(__dirname, "dist/tfg-web/browser");

// Servir archivos estáticos
app.use(express.static(DIST_PATH));

// Fallback para Angular Router (SPA)
app.get("/{*path}", (_req, res) => {
	res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
