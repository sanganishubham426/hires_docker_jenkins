# Generated by Django 5.1 on 2024-09-26 11:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('recruiterAPI', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='jobdescriptionmodel',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='recruiterbulkresumeuploadmodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='recruiterresumecandidatemodel',
            name='job_description',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='recruiterAPI.jobdescriptionmodel'),
        ),
        migrations.AddField(
            model_name='recruiterresumecandidatemodel',
            name='recruiter_bulk_resume_upload',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='recruiterAPI.recruiterbulkresumeuploadmodel'),
        ),
        migrations.AddField(
            model_name='recruiterresumecandidatemodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
