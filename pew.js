import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";

export class Pew {
    constructor(options, debug = false) {
        this.registry = new Registry(debug);
        this.enhancer = new Enhancer(options, debug);
        this.__DEBUG = debug;
    }
    __debug() {
        this.__DEBUG = true;
        this.enhancer.__debug();
    }

    enhanceRegistry() {
        if(this.__DEBUG) {
            console.info('[PewJS] Automatic enhancement starting on the following registry : ', this.registry.getAll());
        }
        this.enhancer.enhance(this.registry);
    }
    /**
     *
     * @param registryEntry RegistryEntry
     */
    addRegistryEntry(registryEntry) {
        this.registry.addEntry(registryEntry, this.__DEBUG);
        return this;
    }
    enhanceRegistryEntry(key) {
        let registryEntry = this.getRegistryEntry(key);
        this.enhancer.enhanceEntry(registryEntry, true);
        return this;
    }
    getRegistryEntry(key) {
        return this.registry.getEntry(key);
    }
}