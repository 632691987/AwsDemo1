这个项目是直接利用一个普通的 nodejs 项目就能够做到连接远程的 amazon

在做这个项目的时候，我没有做任何的配置，我仅仅是安装了 awscli 2, 然后这个项目引入aws sdk, 就可以直接控制 aws 上面的资源了，包括我访问 dynamodb

整个项目我就用了下面的命令：
1, npm init
2, npm install @aws-sdk/client-dynamodb --save
3, [update dynamodb.js] run `node dynamodb.js`