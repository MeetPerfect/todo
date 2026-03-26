# CLAUDE.md

## 项目定位

- 一个基于 React + TypeScript + Vite 的前端 Todo 应用
- 当前功能集中在本地任务管理、多语言切换、截止日期筛选与统计展示
- 保持轻量，不默认引入后端、数据库、全局状态管理或额外基础设施

## 核心文件职责

- `src/App.tsx`：顶层页面组合，连接输入、搜索、过滤、列表、统计和语言切换
- `src/hooks/useTodos.ts`：Todo 核心业务逻辑与 localStorage 持久化入口
- `src/contexts/LanguageContext.tsx`：语言状态管理与 `language` 本地持久化
- `src/i18n/translations/*.ts`：中英文文案源
- `src/types/Todo.types.ts`：Todo 数据模型与过滤器类型定义

## 修改原则

- Todo 相关业务逻辑优先放在 `src/hooks/useTodos.ts`
- 新增或修改文案时，禁止在组件中硬编码，必须同步更新 `zh.ts` 和 `en.ts`
- 如果调整 `Todo` 字段或 `FilterType`，同步更新：
  - `src/types/Todo.types.ts`
  - `src/hooks/useTodos.ts` 中的 localStorage 兼容逻辑
  - 相关组件的 props 和显示逻辑
- 样式集中在现有 CSS 中处理，除非明确需要，不要引入新的样式体系
- 优先做小而直接的改动，不为假设需求提前抽象

## 文档与验证

- 功能、命令或结构发生变化后，同步更新 `README.md`
- 提交前至少运行一次：`npm run build`
- 如果改动涉及脚本或语法规范，可额外运行：`npm run lint`

## 范围控制

- 当前项目是前端本地应用，除非用户明确提出，不扩展到：
  - 后端 API
  - 用户认证
  - 云同步
  - 数据库
  - Redux、MobX 等重型状态管理
