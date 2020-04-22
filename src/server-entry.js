import createApp from "./app";

export default function(context) {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前
  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp();
    router.push(context.url);
    //等待路由中的钩子函数 执行完毕后才开始渲染逻辑
    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents(); //获取当前路径匹配的路由
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(
        matchedComponents.map((c) => {
          return c.asyncData && c.asyncData(store); //asyncData方法可能是异步的，使用PromiseAll等待结果执行
        })
      ).then(
        () => {
          context.state = store.state; //保存到window.__initState__上
          resolve(app);
        },
        (err) => {
          reject(err);
        }
      );
      resolve(app);
    }, reject);
  });
}
