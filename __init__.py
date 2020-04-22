from onyx.brain.core import OnyxNeuron
from onyx.utils.log import getLogger

__author__ = 'Cassim Khouani'

LOGGER = getLogger("Weather")

class WeatherNeuron(OnyxNeuron):
    def __init__(self):
        super(WeatherNeuron, self).__init__(name="WeatherNeuron", raw_name="weather")

    def initialize(self):
        #Initialize the Neuron
        LOGGER.info("Weather init")

    def stop(self):
        pass

def create_neuron():
    return WeatherNeuron()
