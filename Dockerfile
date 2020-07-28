FROM zixia/wechaty   
# 指定接下来的工作路径为/app  - 类似于cd命令
WORKDIR /bot
# 拷贝前端项目到app目录下
COPY ./package*.json ./
# 安装依赖
RUN npm rebuild&&npm install
COPY ./ ./


   
CMD [ "npm","run" ,"docker"]