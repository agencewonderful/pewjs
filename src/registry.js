export class RegistryItem { // only for structure
    constructor(classDef, selector, options) {
        this.classDef = classDef; // Object definition ;
        this.selector = selector;
        this.options = (options) ? options : { excludeSelector: '', partialDom : null }
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