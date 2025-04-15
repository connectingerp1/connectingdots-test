// src/lib/staticHtml.js

import fs from "fs/promises";
import path from "path";

// Function to read the static HTML content
// IMPORTANT: Adjust 'src/pages' if your static files are generated elsewhere
const STATIC_HTML_DIR = path.join(process.cwd(), "src", "pages");

export async function getStaticPageHtml(filenameWithoutExtension) {
  const filePath = path.join(STATIC_HTML_DIR, `${filenameWithoutExtension}.html`);
  console.log(`Attempting to read: ${filePath}`); // Log path for debugging
  try {
    // Check if file exists first
    await fs.access(filePath);
    return await fs.readFile(filePath, "utf-8");
  } catch (err) {
    if (err.code !== 'ENOENT') {
      // Log errors other than 'file not found'
      console.error(`Error accessing/reading static file ${filenameWithoutExtension}.html:`, err);
    } else {
      console.warn(`Static HTML file not found: ${filePath}`);
    }
    return null; // Indicate file not found or error
  }
}