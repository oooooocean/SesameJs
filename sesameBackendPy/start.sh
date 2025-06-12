#!/bin/sh

# 运行数据库迁移
python manage.py migrate --settings=dolphin.settings_dev

# 使用 gunicorn 启动 Django 项目
exec gunicorn --chdir dolphin --workers 2 --bind 0.0.0.0:8001 --timeout 120 --env DJANGO_SETTINGS_MODULE=dolphin.settings_dev --access-logfile - --log-level info dolphin.wsgi:application