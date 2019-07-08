# 前端部分知识讲义

[TOC]

## 从输入URL到页面展示

### 输入URL

URL（Uniform Resource Locator），统一资源定位符。

**scheme://host.domain:port/path/filename**

在js中，对应关系是这样的：

![image-20181129124929454](/Users/panhui/Library/Application Support/typora-user-images/image-20181129124929454.png)

```javascript
location.href;
// "https://mt.creditcard.cmbc.com.cn:8443/mmc/page/threePage/clientLib/index.html?a=1&b=2#/123"

location.protocol; // "https:"

location.origin; // "https://mt.creditcard.cmbc.com.cn:8443"

location.host;     // "mt.creditcard.cmbc.com.cn:8443"

location.hostname; // "mt.creditcard.cmbc.com.cn"

location.port; // "8443"

location.pathname; // "/mmc/page/threePage/clientLib/index.html"

location.search; // "?a=1&b=2"

location.hash; // "#/123"
```



### 域名解析

1. IP 地址

   浏览器并不能直接通过域名找到对应的服务器，而是要通过 IP 地址（互联网协议地址）。

   IP 地址是一个 32 位的二进制数，比如 127.0.0.1 为本机 IP。

   域名相当于是IP地址的别名，方便记忆。解决域名—IP的映射关系，**DNS 服务应运而生。**

2. 域名解析

   **DNS 是一个网络服务器，我们的域名解析简单来说就是在 DNS 上记录一条信息记录**。

   > rs.creditcard.cmbc.com.cn（域名）     114.112.173.40（IP） 443（端口号）

3. DNS查询

   - 浏览器缓存

   - 操作系统缓存

   - 路由缓存

   - ISP 的 DNS 服务器。ISP：互联网服务提供商(Internet Service Provider)。

   - 根服务器

     ![image-20181129130526853](/Users/panhui/Library/Application Support/typora-user-images/image-20181129130526853.png)



### TCP连接

客户端发起 TCP 三次握手，用以同步客户端和服务端的序列号和确认号，并交换 TCP 窗口大小信息。

![image-20181129131558921](/Users/panhui/Library/Application Support/typora-user-images/image-20181129131558921.png)



### HTTP请求

请求报文主要包括：请求行、请求头和请求体：

![WX20181129-133238@2x](/Users/panhui/Downloads/WX20181129-133238@2x.png)

1. 请求行： 请求方法 URL HTTP协议版本

   请求方法，8种。常见的GET、POST、PUT、DELETE、HEAD等

2. 请求头：由一组键值对构成，属性：值。

3. 请求体：请求数据。不是所有请求都有请求体。



### 服务器处理

略。

### HTTP响应

响应报文主要包括：响应行、响应头和响应体：

![image-20181129135252369](/Users/panhui/Library/Application Support/typora-user-images/image-20181129135252369.png)

1. 响应行：协议版本  状态码  状态码描述。

   ![image-20181129135838951](/Users/panhui/Library/Application Support/typora-user-images/image-20181129135838951.png)


2. 响应头：键值对。比如时间、缓存控制、响应类型等等
3. 响应体：响应返回数据，并不是所有响应报文都有响应数据。



### 浏览器解析

浏览器渲染机制：

![image-20181129140113522](/Users/panhui/Library/Application Support/typora-user-images/image-20181129140113522.png)

浏览器解析渲染页面分为一下五个步骤：

- 根据 HTML 解析出 DOM 树
  - 深度优先遍历，构建完当前所有子节点，继续构建兄弟节点。
  - 遇到script暂停解析，直至脚本执行完毕。
- 根据 CSS 解析生成 CSS 规则树
  - js执行暂停，直到CSSOM就绪。
  - CSSOM就绪前不会render。

- 结合 DOM 树和 CSS 规则树，生成渲染树
  - 两者均就绪后，构建render tree。
  - 精简DOM和CSS，可以加快浏览器解析+render。
- 根据渲染树计算每一个节点的信息
  - 布局（layout）：计算尺寸、位置等。
  - 回流（reflow）：后边的变化导致之前的计算需要调整。
- 根据计算好的信息绘制页面
  - 绘制（paint）：遍历render tree，调用呈现器。
  - 重绘（repaint）：颜色等外观属性改变，不影响布局，将只会引起浏览器的重绘。
  - 回流（reflow）：改变尺寸等属性，重新计算render tree，重新渲染。



**回流一定重绘，重绘不一定回流。**回流代价更大。



### 断开连接

1. tcp 四次挥手

   ![image-20181129141841418](/Users/panhui/Library/Application Support/typora-user-images/image-20181129141841418.png)






## jsBridge原理与全民生活APP中的实现

### 什么是jsBridge

在HybridAPP中，经常需要js和客户端进行互相调用，而完成某些操作。

通常来讲有三种方式：

1. native向webview的全局对象注入。
2. 拦截js的alert、confirm、prompt方法。
3. 通过iframe发送约定协议的请求



#### 全局注入

native向webview的全局对象（window），注入一个jsBridge的全局方法。

1. native每有一个新方法，就为jsBridge添加一个属性方法。

```javascript
var cb = function(info){ // 回调
    // do something
    console.log(info);
};
var param = { // 参数
    success: cb
};
window.jsBridge.getUserInfo(JSON.stringify(param)); // 获取用户信息
window.jsBridge.gotoLogin(''); // 去登录
```

2. 或者通过js传入具体方法名，由native判断如何处理。

```javascript
var cb = function(info){ // 回调
    // do something
    console.log(info);
};
var param = { // 参数
    success: cb
};
window.jsBridge('getUserInfo', JSON.stringify(param)); // 获取用户信息
window.jsBridge('gotoLogin', ''); // 去登录
```



#### 拦截alert、confirm、prompt

因为webview的环境由native创建，js调用这些方法时，native可以捕捉到，并进行判断。

```javascript
var cb = function(info){ // 回调
    // do something
    console.log(info);
};
var param = { // 获取用户信息参数
    function: 'getUserInfo', 
    success: cb
};
//var param = { // 去登录参数
//    function: 'gotoLogin',
//    success: ''
//};
alert(JSON.stringify(param)); // 调用
```



#### iframe发送约定协议请求

native捕捉到页面的请求中，是按约定好的协议格式的话，就能判断出是js在调用native。

```html
<!-- iframe -->
<iframe style="display:none;" height="0px" width="0px" frameborder="0" src="callNative:jsBridge:gotoLogin('{}')"></iframe>
```



### 全民生活APP中的实现

对不同的native有不同的实现方式

同时对于jsBridge的回调，需要是**全局函数**供naive调用。

可以每次都创建一个临时全局函数，调用完就被删除：

```javascript
var tempNameId = 1000;
function getFunctionName(cb){
	// do something...
    var cbName = tempNameId++; // 创建临时全局函数名
    
    window[cbName] = function(){ // 将此全局函数与回调cb关联起来
        
        // 对回调参数做一些必要判断和转义处理
        
		cb.apply(this, args); // 调用回调
        delete window[cbName];// 调用完删除临时方法
    };
    
    return cbName;
}
```



#### Android

采用全局注入的方式。

```javascript
var param = {
    success: getFunctionName(function(info){ // 成功回调
        console.log(info);
    })
}

window.callClientForComm.getUserInfo(JSON.stringify(param));
```



#### iOS

采用拦截约定协议的方式，通知native要进行native调用。

同时让js创建一个数组，暂时存储需要传给native的参数，让native调用js获取参数。

```html
<!-- iframe -->
<iframe style="display:none;" height="0px" width="0px" frameborder="0" src="mszx:demoid:executeJSCode_JSDict_"></iframe>
```

```javascript
x5.commandQueue = []; // 参数空间

var command = {
    className: 'demoid', //约定好的协议类
    methodName: 'executeJSCode_JSDict_'， // 约定好的调用入口
    options:{
    	'1': 'getUserInfo', // 方法名
    	'2': getFunctionName(function(info){ // 回调
    			console.log(info);
		})
	}
};
x5.commandQueue.push(command); // 需要调用native时, 将参数压入此数组

// 此时让iframe发送一次请求，通知iOS。iOS收到通知后，通过下面的方法获取参数。
x5.getAndClearQueuedCommands = function () {
	var json = JSON.stringify(x5.commandQueue);
	x5.commandQueue = [];
	return json;
};
```

