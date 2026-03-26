# Todo React App

一个使用 React、TypeScript 和 Vite 构建的轻量级待办事项应用，支持任务优先级、截止日期、关键词搜索、中英文切换以及 localStorage 本地持久化。

## 功能特性

- 新增任务，并为任务设置优先级（高 / 中 / 低）
- 可选填写截止日期，保存为 `YYYY-MM-DD` 格式
- 标记任务完成、撤销完成、删除任务
- 双击任务文本进行原地编辑
- 按状态筛选任务：`all` / `active` / `completed` / `today` / `overdue`
- 按关键词实时搜索任务文本
- 显示任务创建时间、截止日期以及今日到期 / 已逾期状态
- 统计卡片展示总数、未完成、已完成、今日到期、已逾期数量
- 支持中文 / English 界面切换，并记住语言选择
- 使用 localStorage 持久化任务数据和语言设置

## 技术栈

- React 18
- TypeScript
- Vite 5
- ESLint
- 普通 CSS（`src/App.css`），未使用 CSS Modules

## 安装与运行

1. 安装依赖

```bash
npm install
```

2. 启动开发环境

```bash
npm run dev
```

3. 构建生产版本

```bash
npm run build
```

4. 预览构建结果

```bash
npm run preview
```

5. 运行代码检查

```bash
npm run lint
```

## 项目结构

```text
src/
├── components/
│   ├── LanguageToggle.tsx   # 语言切换按钮
│   ├── TodoFilters.tsx      # 任务过滤器
│   ├── TodoInput.tsx        # 新建任务表单（文本、优先级、截止日期）
│   ├── TodoItem.tsx         # 单个任务项（编辑、状态、日期展示）
│   ├── TodoList.tsx         # 任务列表
│   └── TodoStats.tsx        # 统计卡片
├── contexts/
│   └── LanguageContext.tsx  # 语言状态与持久化
├── hooks/
│   └── useTodos.ts          # Todo 核心业务逻辑与 localStorage 同步
├── i18n/
│   ├── index.ts             # 文案查询入口
│   └── translations/
│       ├── en.ts            # 英文文案
│       └── zh.ts            # 中文文案
├── types/
│   └── Todo.types.ts        # Todo 与过滤器类型定义
├── App.tsx                  # 页面组合与顶层状态接入
├── App.css                  # 全局样式
└── main.tsx                 # 应用入口
```

## 数据模型

### `Todo`

```ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  dueDate?: string;
}
```

字段说明：

- `id`：任务唯一标识
- `text`：任务内容
- `completed`：是否完成
- `priority`：任务优先级
- `createdAt`：创建时间，使用 ISO datetime string
- `dueDate`：可选截止日期，使用 `YYYY-MM-DD` date string

### `FilterType`

```ts
type FilterType = 'all' | 'active' | 'completed' | 'today' | 'overdue';
```

其中：

- `today`：筛选今天到期且未完成的任务
- `overdue`：筛选已逾期且未完成的任务

## 使用说明

1. 在输入框中填写任务内容
2. 选择优先级，可选填写截止日期
3. 点击“添加”或按回车创建任务
4. 使用搜索框按关键词过滤当前任务列表
5. 使用过滤按钮切换全部、未完成、已完成、今日到期、已逾期视图
6. 勾选复选框或点击“完成 / Undo”切换任务状态
7. 双击任务文本可直接编辑内容
8. 使用下拉菜单调整任务优先级
9. 点击“删除”移除任务
10. 在底部统计区域查看当前任务分布

## 本地存储说明

应用会在浏览器 localStorage 中保存以下信息：

- `todos`：任务数组
- `language`：当前界面语言

`useTodos` 会在初始化时对历史数据做基础兼容处理，例如：

- 自动规范 `priority`
- 校验 `dueDate` 是否符合有效日期格式
- 兼容旧字段 `timestamp` 到 `createdAt`

## 多语言说明

当前项目支持中文和英文两套文案。

- 中文文案：`src/i18n/translations/zh.ts`
- 英文文案：`src/i18n/translations/en.ts`
- 语言状态：`src/contexts/LanguageContext.tsx`

如果新增按钮、标签、提示语或状态文案，不要在组件里硬编码字符串，应同步更新中英文翻译文件，并通过 `t()` 读取。

## 主要实现说明

- `src/hooks/useTodos.ts`：负责任务新增、删除、切换完成状态、文本编辑、优先级更新、筛选、搜索、统计和 localStorage 同步
- `src/components/TodoInput.tsx`：负责新建任务表单与截止日期输入
- `src/components/TodoItem.tsx`：负责单项任务展示、编辑以及截止日期状态展示
- `src/components/TodoStats.tsx`：负责统计卡片展示
- `src/contexts/LanguageContext.tsx`：负责语言切换和持久化

## 当前限制

- 仅前端本地应用，不包含后端 API
- 数据仅保存在当前浏览器的 localStorage 中
- 当前没有用户系统、云同步或测试用例
