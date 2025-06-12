from rest_framework.response import Response
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.views import exception_handler as default_exception_handler
import logging

logger = logging.getLogger(__name__)

def exception_handler(exc, context):
    response = default_exception_handler(exc, context)

    if not response or not response.data:
        logger.error('未知错误', exc_info=True)
        return Response({'code': HTTP_500_INTERNAL_SERVER_ERROR, 'message': 'Internal Server Error'}, status=500,
                        exception=exc)

    data = response.data

    if isinstance(data, list):
        data = data[0]

    if 'detail' in data:
        message = data['detail']
    else:
        message = data.__str__()

    return Response({
        'code': response.status_code,
        'message': message,
    }, status=response.status_code, exception=exc)
