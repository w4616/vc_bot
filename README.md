# free.vps.vc库存监控bot
ps：写的很烂，缝缝补补。小白一个。

自动续期整活的！！！！！！！！！！！！！！！！！！！！！！

自动续期整活的！！！！！！！！！！！！！！！！！！！！！！

自动续期整活的！！！！！！！！！！！！！！！！！！！！！！

自动续期整活的！！！！！！！！！！！！！！！！！！！！！！

## 运行截图
![image](https://raw.githubusercontent.com/w4616/freevpsvc/main/image/vc1.png)

### 使用教程
下载并解压

进入文件目录

因为vpsvc需要登陆才能查看库存，所以需要填入ck才能运行ck获取方法：

登陆完成按F12，选择'网络'。刷新页面，随便选择一个请求

![image](https://raw.githubusercontent.com/w4616/freevpsvc/main/image/ck1.png)

请求头的 Cookie: PHPSESSID=******************* 将PHPSESSID填入config.py，后续也可以在tg中提交ck

![image](https://raw.githubusercontent.com/w4616/freevpsvc/main/image/ck2.png)

ps：vpsvc的ck有效期很短，我没有能力绕过or自动获取，欢迎有能力的大佬修改！！！

在bot.js中第十行填入自己的TG API，在第61行填入管理员的tg id

安装python

```shell
apt-get upgrade -y # CentOS：yum update -y
apt install -y python3 python3-pip # CentOS: yun install -y python3 python3-pip
pip3 install -r requirements.txt
```

安装nodejs

```shell
apt install -y nodejs npm # CentOS：yum install -y nodejs npm
npm install node-telegram-bot-api
```

运行

```shell
node bot.js
```
