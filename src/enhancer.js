export class Enhancer {
    constructor(options) {
        if(options && options.debug) {
            this.__DEBUG = options.debug;
        }
    }
    enhance(registry) {
        this.enhanceEntries(registry);
    }

    enhanceEntries(registry) {
        let entries = registry.getAll();
        let keys = Object.keys(entries);
        return keys.map((key) => {
            this.enhanceEntry(entries[key]);
        });
    }

    enhanceEntry(registryEntry) {
        registryEntry.enhance();
    }
}