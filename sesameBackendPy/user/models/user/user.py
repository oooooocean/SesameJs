from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('用户名', max_length=255, unique=True)
    deleted = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)

    objects = BaseUserManager()

    USERNAME_FIELD = 'username'

    class Meta:
        db_table = 'user'

    @classmethod
    def create_user(cls, username, password, is_superuser=False):
        return User.objects.create(username=username, password=make_password(password), is_superuser=is_superuser)
