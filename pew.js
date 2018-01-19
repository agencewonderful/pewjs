import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";

export class Pew {
    constructor(options) {
        this.registry = new Registry();
        this.enhancer = new Enhancer(options);
    }

    /**
     *
     * @param registryEntry RegistryEntry
     */
    addRegistryEntry(registryEntry) {
        this.registry.addEntry(registryEntry);
    }

    enhanceRegistry() {
        this.enhancer.enhance(this.registry);
    }
}

