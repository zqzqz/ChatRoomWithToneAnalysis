##
forked and edited from chat2x
For hackxSJTU2017

## 特点
* 前端 bootstrap+vue.js 重写
* 后端 nodejs+express+sockit.io+winston+mongodb 重写
* 进入聊天室随机分配角色
* 根据头像自动生成聊天气泡颜色
* 发言冷却，@XXX，简单的信息提醒
* 使用 ibm waston tone analyzer API
* 本地调用python2.7脚本
* 当用户言论过激时或失当时，后台发出提示信息，阻断信息的发送，同时提供推荐的改进发言，是否采用可由用户决定。


# <img src="public/images/logo2.png" width="25"> Chat2x

***

## Feature
* Migrate from https://code.google.com/archive/p/drrr-like-chat/
* Rewrite front-end by bootstrap+vue.js 
* Rewrite back-end by nodejs+express+sockit.io+winston+mongodb
* Random character when entering the chatroom, configurable character list
* Auto-generated message bubble color from character avatar
* Cooling, @XXX, simple notifications
* using ibm ibm waston tone analyzer API
* When users say something inappropriate(too rude or impolite), the server will send a warning message and block the current message. At the same time, a suggested sentence will be provided and the user can decide whether accept the suggestion.

## How to use
1. Install nodejs, npm and mongodb
2. log in bluemix.net and create a waston tone analyzer service
3. $npm install waston-developer-cloud
4. set the API key in modules/socket.js and synonym substitution/__main__.py
5. $pip install bs4
6. use nltk to install data package(?)
7. At root director,`node bin/www`
8. Server set up at http://127.0.0.1:3000


