const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const TurndownService = require('turndown');

// --- Configuration ---
const INPUT_FILE = 'feed.xml'; 
const OUTPUT_DIR = './blog/migrated';

// Initialize Turndown (HTML to Markdown converter)
// This is essential for Docusaurus/MDX to prevent HTML tag crashes
const turndownService = new TurndownService({
  headingStyle: 'atx',      // Uses ### for headings instead of underlines
  codeBlockStyle: 'fenced'  // Uses ``` for code blocks
});

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read the XML file
fs.readFile(INPUT_FILE, (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    console.error(`Make sure the file '${INPUT_FILE}' exists in this folder.`);
    return;
  }

  const parser = new xml2js.Parser();

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error(`Error parsing XML: ${err}`);
      return;
    }

    if (!result.feed || !result.feed.entry) {
      console.error("Error: Could not find any entries in the XML feed.");
      return;
    }

    const entries = result.feed.entry;
    let count = 0;

    console.log(`Found ${entries.length} total entries. Processing...`);

    entries.forEach((entry) => {
      // 1. EXTRACT TITLE
      const title = entry.title && entry.title[0] && entry.title[0]._ 
        ? entry.title[0]._ 
        : (entry.title?.[0] || 'Untitled');

      // 2. EXTRACT DATE
      // Tries 'published' first, falls back to 'updated', then current date
      const dateStr = (entry.published && entry.published[0]) 
        ? entry.published[0] 
        : (entry.updated && entry.updated[0] ? entry.updated[0] : new Date().toISOString());
      
      const date = new Date(dateStr);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

      // 3. EXTRACT RAW CONTENT
      let rawContent = '';
      if (entry.content && entry.content[0]) {
        // Content sometimes comes as an object {_: 'html...'} or just a string
        rawContent = entry.content[0]._ || entry.content[0];
      } else if (entry.summary && entry.summary[0]) {
        rawContent = entry.summary[0]._ || entry.summary[0];
      }

      // 4. CONVERT TO CLEAN MARKDOWN
      // This step fixes the "Expected closing tag </div>" errors in Docusaurus
      let cleanContent = '';
      try {
        cleanContent = turndownService.turndown(rawContent);
      } catch (e) {
        console.warn(`Warning: Could not convert content for "${title}". Using raw HTML.`);
        cleanContent = rawContent;
      }

      // 5. EXTRACT TAGS
      const tags = [];
      if (entry.category) {
        entry.category.forEach(cat => {
          if (cat?.$?.term) {
            tags.push(cat.$.term);
          }
        });
      }

      // 6. GENERATE FILENAME
      const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const filename = `${formattedDate}-${safeTitle || 'post'}.md`;
      const filePath = path.join(OUTPUT_DIR, filename);

      // 7. CONSTRUCT FRONTMATTER & CONTENT
      const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${formattedDate}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

${cleanContent}
`;

      // 8. WRITE FILE
      fs.writeFileSync(filePath, fileContent);
      count++;
    });

    console.log(`Success! Converted ${count} posts to ${OUTPUT_DIR}`);
  });
});
