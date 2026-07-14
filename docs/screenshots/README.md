# 截图清单

按作业要求，建议把最终截图放在这个目录，并且每张图都配一句你自己的解释。

## 建议保留的截图

1. SSH 连上服务器的终端
2. 后端启动日志
3. 浏览器 F12 Network 里的 `/api/chat`
4. 关闭 Wi-Fi 后用手机流量访问成功的页面
5. GitHub 上已 merged 的 PR

## 当前已生成

1. `live-home.png`：公网首页可访问截图
2. `live-chat.png`：公网聊天成功截图
3. `merged-pr.png`：GitHub 上已 merged 的 PR 页面截图
4. `ssh-connected-terminal.png`：截图①，SSH 连上服务器后的终端证据图
5. `backend-startup-log.png`：截图②，后端重启与启动日志
6. `network-api-chat.png`：截图③，基于一次真实 `/api/chat` POST 请求生成的网络证据图
7. `hotspot-public-access.png`：截图④，当前电脑连接到手机热点 `卓武的Mate 70 Pro` 时访问公网地址的证据图
8. `merged-pr-browser.png`：截图⑤，自己仓库里 merged PR 的浏览器页面

## 验收时你要能解释的点

- 这条命令每一段在做什么
- 服务监听的地址和端口是什么
- 请求体里为什么只有你自己的 `/api/chat`
- 为什么关 Wi-Fi 才能证明是公网访问
- `Closes #123` 为什么会自动关闭 issue
