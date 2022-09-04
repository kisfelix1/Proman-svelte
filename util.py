from functools import wraps
from flask import jsonify


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        response=jsonify(func(*args, **kwargs))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    return decorated_function
