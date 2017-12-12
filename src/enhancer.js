export class Enhancer {

    /*
    * @registry: RegistryItem[]
    * @DOMElement: HTMLNode (document.body)*/
    constructor(options) {
        if(options && options.debug) {
            this.__DEBUG = options.debug;
        }
        this.slugs = [];
    }
    enhance(registry) {
        this.parse(registry);
        this.enhanceSlugs();
    }

    /*
    * Parses dom to find elements to instanciate for each slug
    * */
    parse(registry) {
        let entries = registry.getAll();
        let keys = Object.keys(entries);

        this.slugs = keys.map((key) => {
            let registryEntry = entries[key];
            let selector = (registryEntry.selector) ? registryEntry.selector : null;
            let dom = (registryEntry.partialDom) ? registryEntry.partialDom : document.body;
            let domElements = this.findElements(selector, dom);
            if(this.__DEBUG) {
                if(!selector) {
                    console.warn('[PewJS] Enhancer did not found a selector for slug : "'+key+'"');
                }
                if(domElements.length <= 0) {
                    console.warn('[PewJS] Parser did not found DOM elements matching the selector : "'+selector+'".');
                }
            }
            return {
                slug: key,
                classDef: registryEntry.classDef,
                domElements: domElements
            };
        });
    }

    enhanceSlugs() {
        let result = {};

        this.slugs.forEach((slug) => {
            let key = slug.slug;
            result[key] = [];
            slug.domElements.forEach((domElement) => {
                let enhanced = (slug.classDef) ? this.enhanceElement(domElement, slug.classDef) : console.warn('[PewJS] Enhancer did not found a classDef');
                result[key].push(enhanced.dom);
            });
        });

        if(this.__DEBUG) {
            console.info('[PewJS] Enhanced elements :', result);
        }
    }

    enhanceElement(domElement, classDef) {
        return new classDef(domElement);
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