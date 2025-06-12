from rest_framework.response import Response


class ResponseMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        should_intercept = isinstance(response, Response) and not response.exception and response.content_type != 'text/event-stream'
        if should_intercept:
            data = {
                'code': 0,
                'message': response.status_text if hasattr(response, 'status_text') else 'success',
                'data': response.data if hasattr(response, 'data') else None
            }
            response.data = data
            response._is_rendered = False

        return super().finalize_response(request, response, *args, **kwargs)
