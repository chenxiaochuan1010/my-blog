---
title: "My Neovim Cheat Sheet 2025 Edition"
date: 2025-12-10
authors: [me]
tags: [Neovim, shortcuts]
---

Today, I successfully resurrected my old Neovim configuration on my Mac. It had been years since I installed it, and I had forgotten almost everything. After updating the plugins and fixing some obsolete commands, it's now running better than ever.

<!--truncate-->

This post serves as my personal "Readme" and a cheat sheet for the shortcuts that power my workflow.

## The Core Setup

* **Plugin Manager:** [Packer.nvim](https://github.com/wbthomason/packer.nvim)
* **Language Server (LSP) Manager:** [Mason.nvim](https://github.com/williamboman/mason.nvim)
* **File Search:** [Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)
* **File Explorer:** [Nvim-Tree](https://github.com/nvim-tree/nvim-tree.lua)

---

## 🔑 The Master Key

My configuration uses the **Spacebar** as the "Leader" key.

> Whenever you see `<Space>` below, press the spacebar followed by the other keys in sequence.

---

## Cheat Sheet

### 🚀 Essentials & Workflow

These are the daily drivers for moving around and managing the editor.

| Action | Shortcut | Mnemonic / Note |
| :--- | :--- | :--- |
| **Exit Insert Mode** | **`jj`** | Quick double-tap of 'j' while typing. No reaching for Esc. |
| **Save & Quit** | **`:wq`** | Standard Vim command. |
| **Clear Highlights** | **`<Space>nh`** | **N**o **H**ighlight. Clears the yellow search results. |
| **Safe Delete Char** | **`x`** | Deletes a character *without* copying it to your clipboard. |

### 📂 File & Text Search (Telescope)

Instant fuzzy searching across the entire project.

| Action | Shortcut | Mnemonic / Note |
| :--- | :--- | :--- |
| **Find File** | **`<Space>ff`** | **F**ind **F**iles. Type to filter by filename. |
| **Find Text (Grep)**| **`<Space>fs`** | **F**ind **S**tring. Searches for text inside files. |
| **Find Word** | **`<Space>fc`** | **F**ind **C**ursor word. Searches for the word currently under the cursor. |
| **Open Buffers** | **`<Space>fb`** | **F**ind **B**uffers. List currently open files/tabs. |

### 🖥️ Window & Tab Management

I've set up custom shortcuts to make splitting the screen and moving around much easier.

**Splitting Windows**

| Action | Shortcut | Mnemonic |
| :--- | :--- | :--- |
| **Split Vertical** | **`<Space>sv`** | **S**plit **V**ertical (Side-by-side) |
| **Split Horizontal**| **`<Space>sh`** | **S**plit **H**orizontal (Top-and-bottom) |
| **Maximize Split** | **`<Space>sm`** | **S**plit **M**aximize (Toggle zoom) |
| **Equalize Sizes** | **`<Space>se`** | **S**plit **E**qual (Reset sizes) |
| **Close Split** | **`<Space>sx`** | **S**plit e**X**it |

**Navigation (Moving Between Windows)**

Hold **Space** and use the Vim direction keys.

| Move To... | Shortcut |
| :--- | :--- |
| **Left Window** | **`<Space>h`** |
| **Down Window** | **`<Space>j`** |
| **Up Window** | **`<Space>k`** |
| **Right Window**| **`<Space>l`** |

**Tabs (Browser Style)**

| Action | Shortcut | Mnemonic |
| :--- | :--- | :--- |
| **New Tab** | **`<Space>to`** | **T**ab **O**pen |
| **Close Tab** | **`<Space>tx`** | **T**ab e**X**it |
| **Next Tab** | **`<Space>tn`** | **T**ab **N**ext |
| **Previous Tab** | **`<Space>tp`** | **T**ab **P**revious |

### 🧠 Smart Coding Features (LSP)

Thanks to Mason and Lspsaga, I get intelligent features like "Go to Definition" and nice popup windows for errors. These work for supported languages (currently Python, Markdown, Lua, HTML, CSS).

| Action | Shortcut | Description |
| :--- | :--- | :--- |
| **Go to Definition** | **`gd`** | Opens a popup showing where the function/variable under cursor is defined. |
| **Go to Find Uses** | **`gf`** | Opens a list showing everywhere this item is used. |
| **Show Documentation**| **`K`** | (Shift+K). Shows a hover popup with docs for the code under cursor. |
| **Rename Variable** | **`<Space>rn`** | **R**e**n**ame. Smart rename across all project files. |
| **Code Action** | **`<Space>ca`** | **C**ode **A**ction. The "blue lightbulb" for quick fixes. |
| **File Outline** | **`<Space>o`** | Toggles a sidebar showing file structure (Headers, Functions). |
| **Show Error** | **`<Space>d`** | Shows the diagnostic error message for the item under cursor. |
| **Next Error** | **`]d`** | Jumps down to the next error/warning. |
| **Previous Error** | **`[d`** | Jumps up to the previous error/warning. |

### 📝 Writing & Blogging

Tools specifically for writing content (like this blog post!).

| Action | Shortcut | Note |
| :--- | :--- | :--- |
| **File Explorer** | **`<Space>e`** | Toggles the Nvim-Tree sidebar. |
| **Markdown Preview**| **`<Space>md`** | Opens a live preview of the current `.md` file in the browser. |
| **Comment Line** | **`gcc`** | Toggles a comment on the current line. |
| **Comment Block** | **`gc`** | (In Visual Mode) Toggles comments on selected lines. |
| **Soft Wrap** | *Auto* | Lines visually wrap at word boundaries to fit the window width. |

---

### ⚙️ Management & Maintenance

How to keep the setup running.

* **Install new tools:** Type **`:Mason`** to open the app store for language servers.
* **Update plugins:** Run **`:PackerSync`** to update all installed plugins.
