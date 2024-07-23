from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProductDetails
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from .pagination import paginator_func

from django.db.models import Q

from .serializers import ProductDetailsSerializer


# Create your views here.


class ViewProductDetails(APIView):

    @staticmethod
    def get(request):
        try:
            filters = request.query_params
            name = filters.get('name')
            min_price = filters.get('minPrice')
            max_price = filters.get('maxPrice')
            brand = filters.get('brand')
            product_type = filters.get('productType')
            query = Q()

            if name:
                query &= Q(name__icontains=name)
            if max_price:
                query &= Q(price__lte=max_price)
            if min_price:
                query &= Q(price__gte=min_price)
            if brand:
                query &= Q(brand__icontains=brand)
            if product_type:
                query &= Q(product_type__icontains=product_type)

            objects_data = ProductDetails.objects.filter(query)
            objects_data, total_no_of_objs = paginator_func(filters, list(objects_data))
            serialized_data = ProductDetailsSerializer(objects_data, many=True).data
            return Response({"data": serialized_data, "count": total_no_of_objs}, status=status.HTTP_200_OK)
        except Exception as error:
            print(str(error))
            return Response('SOMETHING_WENT_WRONG', status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddProductDetails(APIView):

    @staticmethod
    def post(request):
        try:
            data = request.data
            name = data.get('name')
            description = data.get('description')
            brand = data.get('brand')
            price = data.get('price')
            product_type = data.get('type')
            if ProductDetails.objects.filter(name=name, brand=brand, product_type=product_type).exists():
                raise Exception('Product already exists')
            ProductDetails.objects.create(name=name, description=description, price=price,
                                          brand=brand, product_type=product_type)
            return Response('Product Added Successfully', status.HTTP_200_OK)
        except Exception as error:
            print(str(error))
            return Response('SOMETHING_WENT_WRONG', status.HTTP_500_INTERNAL_SERVER_ERROR)


class ModifyProductDetails(APIView):

    @staticmethod
    def post(request):
        try:
            data = request.data
            product_id = data.get('id')
            name = data.get('name')
            description = data.get('description')
            brand = data.get('brand')
            price = data.get('price')
            product_type = data.get('type')
            try:
                product_obj = ProductDetails.objects.get(id=product_id)
            except ObjectDoesNotExist:
                return Response(
                    {"result": "Failure", "message": 'product not found'},
                    status=status.HTTP_200_OK
                )
            product_obj.name = name
            product_obj.description = description
            product_obj.brand = brand
            product_obj.price = price
            product_obj.product_type = product_type
            product_obj.save()
            return Response(
                {"result": "Success", "message": 'Product Details updated successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as error:
            print(str(error))
            return Response('SOMETHING_WENT_WRONG', status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteProductDetails(APIView):

    @staticmethod
    def post(request):
        try:
            data = request.data
            product_id = data.get('id')
            try:
                product_obj = ProductDetails.objects.get(id=product_id)
            except ObjectDoesNotExist:
                return Response(
                    {"result": "Failure", "message": 'product not found'},
                    status=status.HTTP_200_OK
                )
            product_obj.delete()
            return Response(
                {"result": "Success", "message": 'Product Data deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as error:
            print(str(error))
            return Response('SOMETHING_WENT_WRONG', status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetProductDetails(APIView):

    @staticmethod
    def post(request):
        try:
            data = request.data
            product_id = data.get('id')
            try:
                product_obj = ProductDetails.objects.get(id=product_id)
            except ObjectDoesNotExist:
                return Response(
                    {"result": "Failure", "message": 'product not found'},
                    status=status.HTTP_200_OK
                )
            serialized_data = ProductDetailsSerializer(product_obj).data
            return Response(serialized_data, status=status.HTTP_200_OK)
        except Exception as error:
            print(str(error))
            return Response('SOMETHING_WENT_WRONG', status.HTTP_500_INTERNAL_SERVER_ERROR)

