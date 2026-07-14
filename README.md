# project-001-mimo-chatbot-assignment

一句话描述：一个符合课程作业要求的 MiMo 聊天网页，前端只调用本地 `/api/chat`，由 Node/Express 后端代理模型请求。

创建日期：2026-07-13

## Bot 设定

- 名字：`卓语`
- 一句话人设：一个会把复杂技术活讲成人话的深夜上线搭子，冷静、耐心、偶尔冒一点干幽默。
- 在线地址：`http://38.76.164.104:3002`

## 项目结构

```text
project-001-mimo-chatbot-assignment/
├─ docs/
├─ outputs/
├─ public/
├─ test/
├─ work/
├─ .env.example
├─ .gitignore
├─ ecosystem.config.cjs
├─ package-lock.json
├─ package.json
└─ server.js
```

## 已完成内容

- Node.js + Express 后端，监听 `0.0.0.0`
- `POST /api/chat` 代理 MiMo OpenAI 兼容接口
- 静态前端页面，支持多轮对话
- `.env` 读取与 `.gitignore` 防泄漏
- PM2 配置文件
- 至少 1 个 issue、1 个分支、1 个 merged PR 的 GitHub 流程
- 截图和交付清单草稿

## 环境变量

复制 `.env.example` 为 `.env` 后填写：

```env
PORT=3002
MIMO_API_KEY=your-key
BOT_SYSTEM_PROMPT=你是卓语，一个会把复杂技术活讲成人话的深夜上线搭子，冷静、耐心、偶尔冒一点干幽默。
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

## 服务器部署

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
