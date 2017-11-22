export class RegistryItem { // only for structure
    constructor() {
        this.selector = ''; // string
        this.classDef = null; // Object definition ;
        this.excludeSelector = '';
        this.options = {};
    }
}

export class Registry {
    constructor() {
        this.entries = {}; // collection of Slug keys => RegistryItem
    }

    addEntry(key, registryItem) {
        this.entries[key] = registryItem;
    }

    getAll() {
        return this.entries;
    }

}