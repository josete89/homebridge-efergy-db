import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service
} from "homebridge";

let hap: HAP;

/*
 * Initializer function called when the plugin is loaded.
 */
export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("EfergyAccessory", EfergyAccessory);
};

class EfergyAccessory implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly name: string;

  private readonly powerConsumptionService: Service;
	private readonly informationService: Service;


	constructor(log: Logging, config: AccessoryConfig, api: API) {

		this.log = log;
		this.name = config.name;

		this.powerConsumptionService = new hap.Service.PowerManagement(this.name);

		this.powerConsumptionService.getCharacteristic(hap.Characteristic.ServiceLabelIndex).on(CharacteristicEventTypes.GET, (callback:CharacteristicGetCallback) => {
			log.info(' Get Called')
			callback(undefined,'800kWh');
		})

    this.informationService = new hap.Service.AccessoryRuntimeInformation()
     .setCharacteristic(hap.Characteristic.Manufacturer, 'Efergy')
     .setCharacteristic(hap.Characteristic.Model, 'Elite Classic');

		log.info('Finished initializaion of efergy')
	}

	identify(): void {
		this.log("Identify");
	}

	getServices(): Service[] {
		return [this.informationService,  this.powerConsumptionService]
	}
}
