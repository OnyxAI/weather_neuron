from onyx.brain.core import OnyxNeuron
from neurons.weather.api import *
from onyx.utils.log import getLogger

__author__ = 'Cassim Khouani'

LOGGER = getLogger("Weather")

class WeatherNeuron(OnyxNeuron):
    def __init__(self):
        super(WeatherNeuron, self).__init__(name="WeatherNeuron", raw_name="weather")

    def get_api(self):
        api = [
            {
                'route': '/neuron/weather/token',
                'class': WeatherToken
            },
            {
                'route': '/neuron/weather/today',
                'class': WeatherToday
            }
        ]
        return api

    def initialize(self):
        #Initialize the Neuron
        LOGGER.info("Weather init")

    def stop(self):
        pass

def create_neuron():
    return WeatherNeuron()
