# Generated by Django 5.1 on 2024-09-27 04:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userloginAPI', '0007_alter_useremailverification_expire_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useremailverification',
            name='expire_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 27, 10, 23, 54, 422802)),
        ),
    ]
