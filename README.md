<p align="center">
    <a href="https://www.form-create.com">
        <img width="300" alt="FormCreate" src="https://static.form-create.com/file/img/info-logo2.png">
    </a>
</p>

<p align="center">
    <a href="https://www.form-create.com/" target="_blank">官网</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://view.form-create.com/" target="_blank">帮助文档</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://form-create.com/v3/designer/" target="_blank">在线演示</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://form-create.com/v3/mobile/" target="_blank">移动端在线演示</a>
    <span>&nbsp;|&nbsp;</span>
    <a href="https://form-create.com/v3/" target="_blank">FormCreate 文档</a>
</p>

<p align="center">
  <a href="https://github.com/xaboy/form-create" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="TIM" /></a>
  <a href="https://github.com/xaboy/form-create" target="_blank"><img src="https://img.shields.io/npm/dt/@form-create/designer.svg" alt="dt" /></a>
</p>

## FormCreate 低代码表单设计器

**[@form-create/designer](https://github.com/xaboy/form-create-designer/tree/next/packages/element-ui)** 是基于 [@form-create/element-ui](https://github.com/xaboy/form-create) 和 ElementPlus 实现的低代码表单设计器组件。支持Vue2和Vue3

**[@form-create/vant-designer](https://github.com/xaboy/form-create-designer/tree/next/packages/vant)** 是基于 [@form-create/vant](https://github.com/xaboy/form-create) 和 Vant 实现的**移动端**低代码表单设计器组件。支持Vue3

[![FcDesigner](https://static.form-create.com/file/img/banner-m2.jpg)](https://pro.form-create.com/view)

## 特点
- 使用JSON数据生成表单
- 支持扩展自定义组件
- 内置36个常用的表单组件和布局组件
- 提供丰富的表单操作API
- 支持子表单和分组
- 支持事件配置
- 支持样式配置
- 支持表格布局
- 支持表单验证
- 支持多语言

> 如果对您有帮助，您可以点右上角 **"Star"** 支持一下 谢谢！本项目还在不断开发完善中,如有任何建议或问题[请在这里提出](https://github.com/xaboy/form-create-designer/issues/new)

> 本项目QQ讨论群[629709230](https://jq.qq.com/?_wv=1027&k=F1FlEFIV)

![demo1](https://static.form-create.com/file/img/open-designer.jpg)

## PC端设计器

**CDN:**

```html
<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css"></link>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/element-plus/dist/index.full.js"></script>
<script src="https://unpkg.com/@form-create/element-ui@next/dist/form-create.min.js"></script>
<script src="https://unpkg.com/@form-create/designer@next/dist/index.umd.js"></script>
```

**NodeJs:**

```shell
npm install @form-create/designer@next
npm install @form-create/element-ui@next
npm install element-plus
```

```js
import FcDesigner from '@form-create/designer'
import ELEMENT from 'element-plus';
import 'element-plus/dist/index.css';

app.use(ELEMENT);
app.use(FcDesigner)
app.use(FcDesigner.formCreate)
```

**使用**

```html
<fc-designer ref="designer"/>
```

## 移动端设计器

**CDN:**

```html
<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css"></link>
<link rel="stylesheet" href="https://unpkg.com/vant@4/lib/index.css"/>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/element-plus/dist/index.full.js"></script>
<script src="https://unpkg.com/vant@4/lib/vant.min.js"></script>
<script src="https://unpkg.com/@form-create/element-ui@next/dist/form-create.min.js"></script>
<script src="https://unpkg.com/@form-create/vant@next/dist/form-create.min.js"></script>
<script src="https://unpkg.com/@form-create/vant-designer@next/dist/index.umd.js"></script>
```

**NodeJs:**

```shell
npm install @form-create/vant-designer@next
npm install @form-create/element-ui@next
npm install @form-create/vant@next
npm install element-plus
npm install vant
```

```js
import FcDesignerMobile from '@form-create/vant-designer'
import ELEMENT from 'element-plus';
import vant from 'vant';
import 'vant/lib/index.css';
import 'element-plus/dist/index.css';

app.use(ELEMENT)
app.use(vant)
app.use(FcDesignerMobile)
app.use(FcDesignerMobile.formCreate)
```

**使用**

```html
<fc-designer-mobile ref="designer"/>
```

## 联系

![http://static.form-create.com/file/img/support.jpg](http://static.form-create.com/file/img/support.jpg)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present xaboy
