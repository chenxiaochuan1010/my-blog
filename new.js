const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 1. Get the title from command line arguments
const args = process.argv.slice(2);
const title = args.join(' ') || 'New Post';

// 2. Generate Dates and Filenames
const date = new Date();
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');
const dateStr = `${yyyy}-${mm}-${dd}`;

// Create a safe filename (e.g., "2025-12-06-my-post-title.md")
// Support Chinese/Unicode by only removing unsafe chars and replacing spaces
const slug = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/^-+|-+$/g, '') || 'untitled';
const filename = `${dateStr}-${slug}.md`;
const filePath = path.join('./blog', filename);

// 3. The Template Content
const content = `---
title: "${title}"
date: ${dateStr}
authors: [me]
tags: []
---

<!-- Write your intro here... -->

<!-- Contents after this line will be hiden, unless 'Read More' button been pressed.-->

<!--truncate-->
`;

// 4. Write file and open Neovim
fs.writeFile(filePath, content, (err) => {
    if (err) return console.error(err);
    console.log(`Created: ${filePath}`);
    
    // Spawn Neovim with 'inherit' to take over the terminal correctly
    const editor = spawn('nvim', [filePath], { stdio: 'inherit' });

    editor.on('close', (code) => {
        console.log(`Finished editing.`);
    });
});
