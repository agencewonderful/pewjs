import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";

export class Pew {
    constructor(options) {
        this.registry = new Registry();
        this.enhancer = new Enhancer(options);
    }
    enhanceRegistry() {
        console.log('auto enhancer');
        this.enhancer.enhance(this.registry);
    }
    /**
     *
     * @param registryEntry RegistryEntry
     */
    addRegistryEntry(registryEntry) {
        this.registry.addEntry(registryEntry);
    }

    getRegistryEntry(key) {
        return this.registry.getEntry(key);
    }
    enhanceRegistryEntry(key) {
        let registryEntry = this.getRegistryEntry(key);
        registryEntry.force = true;
        this.enhancer.enhanceEntry(registryEntry);
    }
}