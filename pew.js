import { Enhancer } from "./src/enhancer";
import { Registry } from "./src/registry";

export class Pew {
    constructor(options) {
        this.registry = new Registry();
        this.enhancer = new Enhancer(options);
    }

    addRegistryEntry(slug, registryItem) {
        this.registry.addEntry(slug, registryItem);
    }

    enhanceRegistry() {
        this.enhancer.enhance(this.registry);
    }
}