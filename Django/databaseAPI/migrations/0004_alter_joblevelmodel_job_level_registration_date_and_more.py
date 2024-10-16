# Generated by Django 5.1 on 2024-09-26 11:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('databaseAPI', '0003_alter_joblevelmodel_job_level_registration_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joblevelmodel',
            name='job_level_registration_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 26, 17, 6, 18, 148201)),
        ),
        migrations.AlterField(
            model_name='jobpositionmodel',
            name='job_position_registration_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 26, 17, 6, 18, 147091)),
        ),
        migrations.AlterField(
            model_name='sectormodel',
            name='sector_registration_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 26, 17, 6, 18, 146054)),
        ),
    ]
