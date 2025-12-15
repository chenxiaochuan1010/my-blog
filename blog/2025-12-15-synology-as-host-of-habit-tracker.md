---
title: "Synology as host of habit tracker"
date: 2025-12-15
authors: [me]
tags: [Synology]
---

<!-- Write your intro here... -->
Me: 现在node服务运行在mac后台，每当mac进入休眠，网页端无法正常刷新。正好我有一台群晖，可以利用吗？
Gemini: 太棒了！拥有群晖（Synology）是解决这个问题的**终极方案**。
<!-- Contents after this line will be hiden, unless 'Read More' button been pressed.-->

<!--truncate-->

群晖本质上就是一台低功耗、24小时运行的小型 Linux 服务器。把它作为习惯打卡页面的“家”，既省电又稳定，而且数据掌握在自己手里。

最简单、最现代的方法是利用群晖的 **Container Manager (Docker)**。这不需要你懂复杂的 Linux 命令，只需要在图形界面点几下。

请按照以下步骤操作：

---

### 第一阶段：准备文件 (在 Mac 上)

1.  **清理文件：**
    进入你的 `habit-tracker` 文件夹。
    **删除 `node_modules` 文件夹**。
    *(原因：Mac 上的依赖包和群晖（Linux）不兼容，而且文件碎且多，传输很慢。我们一会儿让群晖自己重新安装。)*

2.  **上传到群晖：**
    * 打开 Mac 的 Finder -> 网络 -> 连接你的群晖。
    * 打开群晖的 `docker` 共享文件夹（如果没有，就在 File Station 里随便找个地方建一个，比如 `docker`）。
    * 在里面新建一个文件夹叫 `habit-tracker`。
    * 把 Mac 上剩下的文件（`server.js`, `package.json`, `index.html`, `style.css`, `script.js`, `data.json`, `banner.png` 等）统统**复制**进去。

---

### 第二阶段：部署容器 (在群晖网页后台)

1.  **安装套件：**
    登录群晖 DSM 后台，去 **套件中心**，搜索并安装 **Container Manager** (旧版本叫 Docker)。

2.  **下载 Node.js 镜像：**
    * 打开 Container Manager。
    * 点击左侧 **注册表 (Registry)**。
    * 搜索 `node`。
    * 选择第一个官方镜像（通常几千颗星那个），标签选 `18-alpine` (体积小，够用)。等待下载完成。

3.  **创建容器 (关键步骤)：**
    * 点击左侧 **映像 (Image)**，找到刚下载的 `node:18-alpine`，选中它，点击 **运行 (Run)**。
    * **常规设置：**
        * 容器名称：填 `habit-tracker`。
        * 勾选 **“启用自动重新启动”** (Enable auto-restart)。这样即使群晖重启，打卡页也会自动跑起来。
    * **高级设置 (Advanced Settings) —— 这里最重要：**
        * **端口设置 (Port Settings)：**
            * 本地端口 (Local Port)：填 `3000`。
            * 容器端口 (Container Port)：填 `3000`。
            * *(如果提示 3000 被占用，本地端口可以改个生僻的，比如 8888)*
        * **存储空间设置 (Volume Settings)：**
            * 点击“添加文件夹”。
            * 选择刚才你在第一阶段上传的 `/docker/habit-tracker` 文件夹。
            * 装载路径 (Mount Path) 填：`/app`。
        * **命令 (Command) / 执行命令：**
            * 这里需要填一段“魔法指令”，因为它启动时需要先安装依赖。
            * 在“命令”框里（或者入口点 Entrypoint），填入以下内容：
                `sh -c "cd /app && npm install && node server.js"`
            * *(解释：这句话的意思是：进入 /app 目录 -> 安装依赖 -> 启动服务器)*

4.  **完成：**
    一路点击“下一步”，最后点击“完成”。容器就会开始启动。

---

### 第三阶段：验证与 iPad 设置

1.  **查看状态：**
    在 Container Manager 的“容器”列表里，看看 `habit-tracker` 的圆点是不是**绿色**的。
    * 如果是绿色，双击它，看“日志”。如果你看到 `Server running on port 3000`，恭喜你，成功了！

2.  **iPad 重新连接：**
    * 你的服务器地址变了！不再是 Mac 的 IP，而是 **群晖的 IP**。
    * 假设群晖 IP 是 `192.168.1.100`。
    * 在 iPad Safari 打开 `http://192.168.1.100:3000`。

3.  **重新添加到主屏幕：**
    * 确认网页能打开、能打卡、数据在变。
    * 删除 iPad 上旧的图标。
    * 按之前的步骤，把这个新地址 **“添加到主屏幕”**。

---

### 🎉 完工！
现在，你的 Mac 可以放心地合盖休眠，甚至关机带走。女儿的打卡服务将由那台默默工作的群晖 24 小时守护，数据也永久保存在群晖的硬盘里，非常安全！
