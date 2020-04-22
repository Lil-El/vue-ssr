# What it is SSR?

简介：放在服务器进行就是服务器渲染，放在浏览器进行就是浏览器渲染

- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
- SSR 直接将 HTML 字符串传递给浏览器。大大加快了首屏加载时间。
- SSR 占用更多的 CPU 和内存资源
- 一些常用的浏览器 API 可能无法正常使用
- 在 vue 中只支持 beforeCreate 和 created 两个生命周期

```
vue-ssr和react-ssr原理相似：
将前后端代码进行打包，浏览器访问页面，接收请求，根据请求的路径去获取对应的组件，并将组件上的ajax等方法执行，获取到数据，将数据合并到vuex或redux当中。将页面转换为字符串，然后给浏览器。
```

## app.js

app.js 要导出一个函数，可以去创建 vue 实例、路由、vuex；

## client-entry.js

该文件通过 app.js 获取 vue 实例，并进行挂载
进行 webpack 打包（client-bundle），client.html 模板要引用 client-bundle.js

## server-entry.js

获取 vue 实例，服务端渲染页面时，获取对应路径匹配的路由，执行 asyncData，并合并到 vuex 中
进行 webpack 打包（server-bundle）,server.html 模板不引用 server-bundle.js

## server.js

读取 server.html 和 client/server - bundle.js，并通过 createBundleRenderer 获取 render 方法。接收浏览器的访问请求时，将 ctx.path 传给 server-entry 的方法中，并执行，将结果渲染为字符串，返回给浏览器。

---

# 优化：

- vue-server-render 的 client、server 的 plugin

  将打包的文件变成 json 格式，通过 json 引用打包文件；否则当打包文件名字改变是，要修改对应后端的代码；这样，只要引用 json 文件即可避免该问题

- vue-meta

  动态管理 html 的 head 信息（title 等），详见官方 github 库
