export class RegistryEntry {
    /**
     *
     * @param key Key of the entry in the registry
     * @param classDef class definition associated with the key
     * @param domSelector optional - dom selector where the class def should be executed
     * @param HTMLElement optional - dom element where the selector should be looked for (defaults to document.body)
     */
    constructor(key, classDef, domSelector, HTMLElement) {
        this.key = key;
        this.classDef = classDef;
        this.domSelector = domSelector;
        this.HTMLElement = HTMLElement;
    }
    create(){
        return new this.classDef();
    }
}
