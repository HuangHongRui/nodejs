# NODE JS
---

## COMMJS

-

## DEBUGGER

-

## GET

-

## POST

- chunk / 水管

## 开发环境

- 原生NODE搭建
- nodemon监测文件变动
- cross-env设置环境变量

## 初始化路由

- 根据技术方案设计路由
- 将路由/数据分离

## 数据模型

- router 路由
- model 数据模型/设计数据格式
- controller 数据处理

## API/路由

- API：不同端之间暴露出来用以对接的接口
- 路由：后端系统内部的一个模块

## 数据库

- MySQL
  * 关系型
  * 轻量、易学
  * [下载](https://dev.mysql.com/downloads/mysql/)
- NodeJs -> MySQL
- API -> MySQL
- [workbench 可视化工具](https://dev.mysql.com/downloads/workbench/)

## 数据库-操作

- 建库
- 建表
  * use myblog;
  * show tables;
  * insert user (username, `password`, realname) value('tony', '123', '托尼');
  * select * from user;
  * select username, realname from user;
  * select * from user where username = 'leo' and password = 123;
  * select * from user where realname like '%里%';
  * select * from user where password like '%1%' order by id desc;
- 表操作

## 引入SQL

- mysql 库 - 硬盘数据库

## 分工

- conf MySQL配置
- controller 处理数据
- db SQL创建/连接/统一函数方法
- route 接收请求路径
- model 数据模型

## 登录

- 核心_登录校验/登录信息存储
- cookie
  * 存在浏览器的一串Str(<5kb)
  * 跨域不共享
  * 可以结构化数据(k=v)
  * 发送请求时，会将请求域名的cookie发送至server
  * server可修改cookie返回至浏览器
  * 浏览器可修改cookie（有限）
  存放userid
- session
  解析userid
- redis 内存数据库
- nginx

## 日志

- 服务器的眼睛
- 访问日志/access-log （最重要的日志）
- 自定义日志（自定义事件、错误记录等）

- 文件操作 nodejs stream
- 写日志-日志功能开发和使用
- 分析日志-日志文件拆分，日志内容分析

## IO

- 网络IO
- 文件IO
- 桶 --流--> 桶

## 日志

- 访问日志
- 错误日志
- 自定义日志

- 拆分
  * 时间
  * 实现方式：crontab 命令, 定时任务
    > * * * * * COMMAND
    > 分 时 号 月 星期0-6 
  * readline 拆分日志内容

## 安全

- QSL注入: 窃取数据库内容
  * 原始/简单的攻击
  * 方式：输入一个SQL片段，拼接成攻击代码
  * 预防：mysql-escape函数处理输入内容
- XSS攻击: 窃取前端COOKIE
  * xss 库
- 密码加密: 保障用户信息安全
  * 
- OP支持: 硬件/服务支持
