import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";
import { RegistryEntry } from "./src/registry-entry";

export class Pew {
    constructor(options) {
        this.registry = new Registry();
        this.enhancer = new Enhancer();
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
    addRegistryEntry({ key, classDef, domSelector, parentHTMLElement }) {
        let entry = new RegistryEntry(key, classDef, domSelector, parentHTMLElement);
        this.registry.addEntry(entry, this.__DEBUG);
        return this;
    }

    /**
     * Useful to manually enhance an entry from the registry
     * @param key
     * @returns {Pew}
     */
    enhanceRegistryEntry(key) {
        let registryEntry = this.getRegistryEntry(key);
        if(registryEntry) {
            this.enhancer.enhanceEntry(registryEntry, true);
        } else {
            if(this.__DEBUG) {
                throw('[PewJS] No entry found for Registry Entry key "' + key + '".');
            }
        }
        return this;
    }

    getRegistryEntry(key) {
        return this.registry.getEntry(key);
    }
}
