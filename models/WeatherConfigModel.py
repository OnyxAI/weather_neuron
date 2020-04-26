from onyx.extensions import db

class WeatherConfig(db.Model):
    __tablename__ = 'weather_config'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String())
    value = db.Column(db.String())
