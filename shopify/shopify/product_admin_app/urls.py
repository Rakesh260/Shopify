from django.urls import path

from .views import AddProductDetails, ViewProductDetails, ModifyProductDetails, \
    DeleteProductDetails, GetProductDetails
urlpatterns = [
    path('add-product', AddProductDetails.as_view(), name='add-product'),
    path('view-products', ViewProductDetails.as_view(), name='view-products'),
    path('edit-product', ModifyProductDetails.as_view(), name='edit-product'),
    path('delete-product', DeleteProductDetails.as_view(), name='delete-product'),
    path('get-product', GetProductDetails.as_view(), name='get-product')
]
