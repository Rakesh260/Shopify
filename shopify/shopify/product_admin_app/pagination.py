from django.core.paginator import Paginator


def paginator_func(request, object_list):

    number_of_items = int(request.get('pageLength'))
    paginator = Paginator(object_list, number_of_items)
    page_obj = paginator.get_page(request.get('pageIndex'))

    return page_obj, paginator.count
