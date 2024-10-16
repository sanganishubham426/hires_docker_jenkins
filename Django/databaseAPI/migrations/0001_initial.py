# Generated by Django 5.1 on 2024-09-26 11:10

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JobLevelModel',
            fields=[
                ('job_level_id', models.CharField(default=None, max_length=60, primary_key=True, serialize=False)),
                ('job_level_name', models.TextField(blank=True, default=None, null=True)),
                ('job_level_name_arabic', models.TextField(blank=True, default=None, null=True)),
                ('job_level_action', models.CharField(blank=True, default='active', max_length=60, null=True)),
                ('job_level_registration_date', models.DateTimeField(default=datetime.datetime(2024, 9, 26, 16, 40, 42, 677338))),
            ],
            options={
                'db_table': 'hires_job_level_tb',
            },
        ),
        migrations.CreateModel(
            name='SectorModel',
            fields=[
                ('sector_id', models.CharField(default=None, max_length=60, primary_key=True, serialize=False)),
                ('sector_name', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('sector_name_arabic', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('sector_action', models.CharField(blank=True, default='active', max_length=60, null=True)),
                ('sector_registration_date', models.DateTimeField(default=datetime.datetime(2024, 9, 26, 16, 40, 42, 675348))),
            ],
            options={
                'db_table': 'hires_sector_tb',
            },
        ),
        migrations.CreateModel(
            name='JobPositionModel',
            fields=[
                ('job_position_id', models.CharField(default=None, max_length=60, primary_key=True, serialize=False)),
                ('job_position_name', models.TextField(blank=True, default=None, null=True)),
                ('job_position_name_arabic', models.TextField(blank=True, default=None, null=True)),
                ('job_position_action', models.CharField(blank=True, default='active', max_length=60, null=True)),
                ('job_position_registration_date', models.DateTimeField(default=datetime.datetime(2024, 9, 26, 16, 40, 42, 676431))),
                ('sector', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='databaseAPI.sectormodel')),
            ],
            options={
                'db_table': 'hires_job_position_tb',
            },
        ),
    ]
