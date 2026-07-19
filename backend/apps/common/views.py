from rest_framework.response import Response


def success_response(data, message="Success"):
    return Response({
        "success": True,
        "message": message,
        "data": data
    })


def error_response(errors, message="Error", status_code=400):
    return Response(
        {
            "success": False,
            "message": message,
            "errors": errors
        },
        status=status_code
    )