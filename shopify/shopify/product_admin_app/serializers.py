from rest_framework import serializers

from .models import ProductDetails


class ProductDetailsSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField()

    class Meta:
        model = ProductDetails
        fields = "__all__"
