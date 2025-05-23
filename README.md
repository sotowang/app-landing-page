# Paddle App Showcase

这是一个展示Paddle支付集成的Next.js应用程序。

## 环境配置

应用程序使用环境变量来配置不同环境（开发、测试、生产）的设置。

### 环境变量

主要的环境变量包括：

- `NEXT_PUBLIC_APP_ENV`: 应用环境，可选值为 `development`、`test` 或 `production`
- `NEXT_PUBLIC_API_BASE_URL`: API基础URL
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`: Paddle客户端Token
- `NEXT_PUBLIC_PADDLE_SANDBOX`: 是否使用Paddle沙盒环境，`true` 或 `false`
- `NEXT_PUBLIC_PADDLE_VENDOR_ID`: Paddle供应商ID

### 环境文件

应用程序使用以下环境文件：

- `.env.local`: 本地开发环境配置，不会提交到版本控制
- `.env.development`: 开发环境配置
- `.env.test`: 测试环境配置
- `.env.production`: 生产环境配置

示例 `.env.local` 文件：

```
# 应用环境: development, test, production
NEXT_PUBLIC_APP_ENV=development

# API配置
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8082

# Paddle配置
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_4e523c871a7228eca4b1c697774
NEXT_PUBLIC_PADDLE_SANDBOX=true
NEXT_PUBLIC_PADDLE_VENDOR_ID=31639
```

## 配置文件

应用程序使用集中的配置文件来管理所有环境相关的设置：

- `src/config/appConfig.ts`: 主配置文件，包含所有环境相关的配置
- `src/config/paddle.ts`: Paddle配置文件（为向后兼容保留）

## 开发

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 运行生产版本

```bash
npm start
```

## Paddle集成

应用程序使用Paddle.js v2版本进行支付集成。主要组件包括：

- `SimplePaddleButton`: 简单的Paddle按钮组件
- `PricingSection`: 价格展示组件，从API获取产品数据并展示

## API集成

应用程序使用Next.js API路由来代理对外部API的请求，解决跨域问题：

- `app/api/paddle/products/route.ts`: 获取Paddle产品数据的API路由

## 环境切换

要在不同环境之间切换，可以修改 `.env.local` 文件中的 `NEXT_PUBLIC_APP_ENV` 变量，或者使用不同的环境文件。

例如，要使用生产环境配置运行应用程序：

```bash
NODE_ENV=production npm run dev
```

或者构建生产版本：

```bash
npm run build
```
