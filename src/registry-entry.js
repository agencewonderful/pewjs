export class RegistryEntry {
    // force : ignore "data-no-pew" if true. Useful for manual enhance ; use data-no-pew and force = true to instanciate it manually only.
    /**
     *
     * @param key Key of the entry in the registry
     * @param classDef class definition associated with the key
     * @param domSelector optional - dom selector where the class def should be executed
     * @param parentHTMLElement optional - dom element where the selector should be looked for (defaults to document.body)
     */
    constructor(key, classDef, domSelector, parentHTMLElement) {
        this.key               = key;
        this.classDef          = classDef;
        this.domSelector       = domSelector;
        this.parentHTMLElement = parentHTMLElement;
        this.HTMLCollection    = null;
    }

    /**
     * Enable debug mode
     *
     * @returns {RegistryEntry}
     */
    debug() {
        this.__DEBUG = true;
        return this;
    }

    /**
     * Launch the enhance mechanism
     * @param force
     * @returns {RegistryEntry}
     */
    enhance(force) {
        this.HTMLCollection = this.findDOMElements(force);
        this.HTMLCollection.forEach((HTMLElement) => {
            this.enhanceElement(HTMLElement);
        });

        return this;
    }

    /**
     * Enhance one element
     * @param HTMLElement
     * @returns {*}
     */
    enhanceElement(HTMLElement) {
        let instance = null;
        if (typeof HTMLElement.dataset.pewElement === 'undefined') {
            instance                       = new this.classDef(HTMLElement);
            HTMLElement.dataset.pewElement = instance;
        } else {
            instance = HTMLElement.dataset.pewElement;
        }
        return instance;
    }

    /**
     * Find Dom Element
     * @param force
     * @returns {Array}
     */
    findDOMElements(force) {
        if (!this.parentHTMLElement) {
            this.parentHTMLElement = document.body;
        }
        let elements = [];
        let ignored  = [];
        let res      = this.parentHTMLElement.querySelectorAll(this.domSelector); // by tag, by #id, by .class, by data-pew=
        if (res.length) {
            for (let i = 0; i < res.length; i++) {
                if (force || !res[i].hasAttribute('data-no-pew')) {
                    elements.push(res[i]);
                } else {
                    ignored.push(res[i]);
                }
            }
        }
        if (this.__DEBUG) {
            let str = (ignored.length > 0) ? ', and ' + ignored.length + ' ignored@ due to [data-no-pew] : ' : '';
            console.warn('[PewJS DEBUG] RegistryItem : "' + this.key + '" matched ' + res.length + ' results in ParentNode', this.parentHTMLElement, 'with selector "' + this.domSelector + '" :', elements, str, ignored);
        }
        return elements;
    }
}
