from datetime import datetime
import requests, json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse

from onyx.extensions import db
from neurons.weather.models.WeatherConfigModel import WeatherConfig
from onyx.models import to_dict

class WeatherToday(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)

    @jwt_required
    def get(self):
        try:
            query = WeatherConfig.query.filter_by(type="token").first()

            if query is None:
                return jsonify(status="error")
            else:
                token = query.value
                location = requests.get("http://ip-api.com/json").json()
                data = requests.get("https://api.darksky.net/forecast/{}/{},{}?units=si".format(token, location['lat'], location['lon'])).json()

                return jsonify(status="success", weather=data)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500


class WeatherToken(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('token')

    @jwt_required
    def get(self):
        try:
            query = WeatherConfig.query.filter_by(type="token").first()

            if query is None:
                return jsonify(status="error")
            else:
                return jsonify(status="success", token=query.value)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()

            token = args['token']

            query = WeatherConfig.query.filter_by(type="token").first()

            if query is None:
                new = WeatherConfig(type="token", value=token)

                db.session.add(new)
            else:
                query.value = token

                db.session.add(query)

            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
