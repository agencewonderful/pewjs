/**
 * The registry of objects that are there to enhance the dom
 */
export class Registry {

    constructor() {
        this.entries = {}; // collection of Slug keys => RegistryEntry
    }

    /**
     * Add an entry to the registry
     *
     * @param registryEntry RegistryEntry
     * @returns {Registry}
     */
    addEntry(registryEntry) {
        this.entries[registryEntry.key] = registryEntry;

        return this;
    }

    /**
     * Return all entries
     *
     * @returns RegistryEntry[]
     */
    getAll() {
        return this.entries;
    }

    /**
     * Return one entry
     *
     * @param key
     * @returns RegistryEntry
     */
    getEntry(key) {
        return (this.entries[key]) ? this.entries[key] : false;
    }

}
