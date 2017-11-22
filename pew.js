import { Enhancer } from "./src/enhancer";
import  { Registry } from "./src/registry"

export class Pew {
    constructor() {
        this.registry = new Registry();
        this.enhancer = new Enhancer();
    }

    setDom(dom) {
        this.enhancer.setDom(dom);
    }

    addRegistryEntry(slug, registryItem) {
        this.registry.addEntry(slug, registryItem);
    }

    enhanceRegistry() {
        this.enhancer.enhance(this.registry);
    }
}