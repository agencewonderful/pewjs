export class RegistryEntry {
    /**
     *
     * @param key Key of the entry in the registry
     * @param classDef class definition associated with the key
     * @param domSelector optional - dom selector where the class def should be executed
     * @param parentHTMLElement optional - dom element where the selector should be looked for (defaults to document.body)
     */
    constructor(key, classDef, domSelector, parentHTMLElement) {
        console.log('REGISTRY ENTRY CREATED', key);
        this.key = key;
        this.classDef = classDef;
        this.domSelector = domSelector;
        this.parentHTMLElement = parentHTMLElement;
        this.HTMLCollection = null;
        this.force = false;
    }

    enhance() {
        this.HTMLCollection = this.findDOMElements();
        this.HTMLCollection.forEach((HTMLElement) => {
            this.enhanceElement(HTMLElement);
        });
    }
    enhanceElement(HTMLElement) {
        return new this.classDef(HTMLElement);
    }
    findDOMElements() {
        if(!this.parentHTMLElement) {
            this.parentHTMLElement = document.body;
        }
        let elements = [];
        let res = this.parentHTMLElement.querySelectorAll(this.domSelector); // by tag, by #id, by .class, by data-pew=

        if(res.length) {
            for(let i = 0; i < res.length; i++) {
                if(this.force || !res[i].hasAttribute('data-no-pew')) {
                    elements.push(res[i]);
                }
            }
        }

        return elements;
    }
}