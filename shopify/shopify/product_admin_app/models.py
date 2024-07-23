from django.db import models


# Create your models here.
class ProductDetails(models.Model):
    name = models.CharField(max_length=256, db_column='name')
    description = models.TextField(db_column='description', null =True)
    brand = models.CharField(db_column='brand', max_length=256)
    price = models.FloatField(db_column='price')
    product_type = models.CharField(db_column='product_type', max_length=256)

    class Meta:
        db_table = 'product_details'
        managed = True
