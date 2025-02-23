# Generated by Django 5.0.7 on 2024-07-22 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='name', max_length=256)),
                ('description', models.TextField(db_column='description')),
                ('brand', models.CharField(db_column='brand', max_length=256)),
                ('price', models.FloatField(db_column='price')),
                ('product_type', models.CharField(db_column='product_type', max_length=256)),
            ],
            options={
                'db_table': 'product_details',
                'managed': True,
            },
        ),
    ]
