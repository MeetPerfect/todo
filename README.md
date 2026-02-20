# React Todo 应用

这是一个使用 React、TypeScript 和 Vite 构建的功能完整的待办事项应用程序。

## 功能特性

- 添加新的待办事项
- 标记任务为完成/未完成
- 删除任务
- 按状态过滤任务（全部/未完成/已完成）
- 任务优先级设置（高/中/低）并用不同颜色标记
- 显示每个任务的创建日期和时间
- 数据本地存储持久化
- 响应式设计
- 双击编辑任务文本

## 技术栈

- React 18
- TypeScript
- Vite 5
- CSS Modules

## 安装与运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
├── components/         # React 组件
│   ├── TodoInput.tsx   # 输入组件
│   ├── TodoItem.tsx    # 单个任务项组件
│   ├── TodoList.tsx    # 任务列表组件
│   ├── TodoFilters.tsx # 过滤器组件
│   └── TodoStats.tsx   # 统计信息组件
├── hooks/              # 自定义 Hooks
│   └── useTodos.ts     # 任务管理逻辑
├── types/              # TypeScript 类型定义
│   └── Todo.types.ts   # 任务相关类型
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口点
└── App.css             # 应用样式
```

## 使用说明

1. 在顶部输入框中输入新的待办事项
2. 选择任务的优先级（高/中/低）
3. 点击“添加”按钮或按回车键添加任务
4. 使用复选框标记任务为完成/未完成
5. 使用下拉菜单更改任务优先级
6. 点击“完成”按钮切换完成状态
7. 点击“删除”按钮移除任务
8. 使用顶部过滤器按钮筛选任务
9. 双击任务文本可直接编辑