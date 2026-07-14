# project-001-mimo-chatbot-assignment

一句话描述：一个符合作业要求的 MiMo 聊天网页，前端只调用本地 `/api/chat`，由 Node/Express 后端代理模型请求。

创建日期：2026-07-13

## 项目结构

```text
project-001-mimo-chatbot-assignment/
├── docs/
├── outputs/
├── public/
├── test/
├── work/
├── .env.example
├── .gitignore
├── ecosystem.config.cjs
├── package.json
├── package-lock.json
└── server.js
```

## 已完成内容

- Node.js + Express 后端，监听 `0.0.0.0`
- `POST /api/chat` 代理 MiMo OpenAI 兼容接口
- 静态前端页面，支持多轮对话
- `.env` 读取、`.gitignore` 防泄露
- PM2 配置文件
- 本地测试与启动脚本
- 提交模板、截图清单、验收自查清单

## 环境变量

复制 `.env.example` 为 `.env` 后填写：

```env
PORT=3002
MIMO_API_KEY=你的密钥
BOT_SYSTEM_PROMPT=你的人设
MIMO_MODEL=mimo-v2.5-pro
MIMO_BASE_URL=https://api.xiaomimimo.com/v1
```

## 本地运行

```bash
npm install
npm test
npm start
```

打开 `http://localhost:3002`。

## 服务器部署命令

```bash
npm install
cp .env.example .env
npm start
```

如需 PM2：

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

## 当前分配信息

- 服务器账号：`zhuowu`
- 专属端口：`3002`
- GitHub 仓库：`kuaizengji/ai-chat-zhuowu`
- 作业 issue 标题：`[作业01] Zhuowu Ouyang`
