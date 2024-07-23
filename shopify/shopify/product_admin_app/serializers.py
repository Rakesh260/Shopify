from rest_framework import serializers

from product_admin_app.models import ProductDetails


class ProductDetailsSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField()

    class Meta:
        model = ProductDetails
        fields = "__all__"
