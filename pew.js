import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";
import { RegistryEntry } from "./src/registry-entry";

export class Pew {
    constructor(options, debug = false) {
        this.registry = new Registry();
        this.enhancer = new Enhancer();
        this.__DEBUG = debug;
    }
    __debug() {
        this.__DEBUG = true;
        this.enhancer.__debug();
    }

    /**
     * Launches the enhancer on the complete registry.
     */
    enhanceRegistry() {
        if(this.__DEBUG) {
            console.info('[PewJS] Automatic enhancement starting on the following registry : ', this.registry.getAll());
        }
        this.enhancer.enhance(this.registry);
    }
    /**
     * Add an entry to enhance to the registry
     * @param registryEntry RegistryEntry
     */
    addRegistryEntry({ key, classDef, domSelector }) {
        let entry = new RegistryEntry(key, classDef, domSelector);
        this.registry.addEntry(entry, this.__DEBUG);
        return this;
    }

    /**
     * Useful to manually enhance an entry from the registry
     * @param key
     * @returns {Pew}
     */
    enhanceRegistryEntry(key) {
        let registryEntry = this.registry.getEntry(key);
        if(registryEntry) {
            this.enhancer.enhanceEntry(registryEntry, true);
        } else {
            if(this.__DEBUG) {
                throw('[PewJS] No entry found for Registry Entry key "' + key + '".');
            }
        }
        return this;
    }
}
