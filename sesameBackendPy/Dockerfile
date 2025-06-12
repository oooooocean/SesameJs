FROM registry-cn-hf-13f.septnet.cn/library/python:3.11.0

WORKDIR /sesame

# 复制内容
COPY . .

# 设置源
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

# 安装依赖
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN pip install gunicorn

# 设置环境变量
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=sesame.settings_dev

EXPOSE 8001

# 运行启动脚本
RUN chmod +x /sesame/start.sh

# 使用启动脚本作为入口
ENTRYPOINT ["/dolphin-admin-backend/start.sh"]
