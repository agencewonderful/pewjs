export class Registry {
    constructor() {
        this.entries = {}; // collection of Slug keys => RegistryEntry
    }

    /**
     * @param registryEntry RegistryEntry
     */
    addEntry(registryEntry) {
        this.entries[registryEntry.key] = registryEntry;
    }

    getAll() {
        return this.entries;
    }

    getEntry(key) {
        return (this.entries[key]) ? this.entries[key] : false;
    }

}