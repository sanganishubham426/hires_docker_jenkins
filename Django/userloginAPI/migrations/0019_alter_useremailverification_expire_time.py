# Generated by Django 5.1 on 2024-09-27 07:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userloginAPI', '0018_alter_useremailverification_expire_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useremailverification',
            name='expire_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 27, 12, 32, 3, 809585)),
        ),
    ]
