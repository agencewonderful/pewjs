import {Enhancer} from "./src/enhancer";
import {Registry} from "./src/registry";
import {RegistryEntry} from "./src/registry-entry";

export class Pew {

    /**
     * @param options
     */
    constructor(options) {
        this.registry = new Registry();
        this.enhancer = new Enhancer();
    }

    /**
     * Enable debug mode
     * @returns {Pew}
     * @private
     */
    __debug() {
        this.__DEBUG = true;
        this.enhancer.__debug();
        return this;
    }

    /**
     * Launches the enhancer on the complete registry.
     *
     * @param parentHTMLElement
     * @returns {Pew}
     */
    enhanceRegistry(parentHTMLElement) {

        if (!parentHTMLElement) {
            parentHTMLElement = document.body;
        }

        if (this.__DEBUG) {
            console.info('[PewJS] Automatic enhancement starting on the following registry : ', this.registry.getAll(), 'on the following dom fragment', parentHTMLElement);
        }
        this.enhancer.enhance(this.registry, parentHTMLElement);

        return this;
    }

    /**
     * Add an entry to enhance to the registry
     * @param registryEntry RegistryEntry
     * @returns {Pew}
     */
    addRegistryEntry({key, classDef, domSelector, parentHTMLElement}) {
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
        if (registryEntry) {
            this.enhancer.enhanceEntry(registryEntry, true);
        } else {
            if (this.__DEBUG) {
                throw('[PewJS] No entry found for Registry Entry key "' + key + '".');
            }
        }
        return this;
    }

    /**
     * Get particular registry entry
     * @param key
     * @returns {*}
     */
    getRegistryEntry(key) {
        return this.registry.getEntry(key);
    }
}
