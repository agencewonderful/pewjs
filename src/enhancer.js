class RegistryItem {
    constructor(key, classDef, HTMLCollection) {
        this.key = key;
        this.classDef = classDef;
        this.HTMLCollection = HTMLCollection;
    }
    enhance() {
        this.HTMLCollection.forEach((element) => {
            this.enhanceElement(element);
        });
    }
    enhanceElement(element) {
        return new this.classDef(element);
    }
}

export class Enhancer {

    /*
    * @registry: RegistryItem[]
    * @DOMElement: HTMLNode (document.body)*/
    constructor(options) {
        if(options && options.debug) {
            this.__DEBUG = options.debug;
        }
        this.keys = [];
    }
    enhance(registry) {
        console.log('ENHANCE', registry);
        this.keys = this.extractEntries(registry);
        this.enhanceRegistry();
    }

    /*
    * Parses dom to find elements to instanciate for each slug
    * */
    extractEntries(registry) {
        console.log('registry', registry);
        let entries = registry.getAll();
        console.log('ENTRIES', entries);
        let keys = Object.keys(entries);
        console.log('entries', entries);
        return keys.map((key) => {
            console.log('map', key);
            let registryEntry = entries[key];
            let selector = (registryEntry.domSelector) ? registryEntry.domSelector : null;
            let dom = (registryEntry.HTMLElement) ? registryEntry.HTMLElement : document.body;
            let HTMLElements = this.findElements(selector, dom);

            return new RegistryItem(key, registryEntry.classDef, HTMLElements);
        });
    }

    enhanceRegistry() {
        console.log(this.keys);
        this.keys.forEach((registryItem) => {
            registryItem.enhance();
        });
    }


    findElements(selector, dom) {
        let elements = [];

        let res = dom.querySelectorAll(selector); // by tag, by #id, by .class
        if(res.length) {
            for(let i = 0; i < res.length; i++) {
                elements.push(res[i]);
            }
        } else {
            let res = dom.querySelectorAll('[data-plugin-registry]');
            for(let i = 0; i < res.length; i++) {
                if(res[i].getAttribute('data-plugin-registry') === selector) {
                    elements.push(res[i]);
                }
            }
        }
        return elements;
    }
}