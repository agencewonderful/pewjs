export class Enhancer {

    /*
    * @registry: RegistryItem[]
    * @DOMElement: HTMLNode (document.body)*/
    constructor() {
        this.slugs = [];
        this.dom = document.body;
    }
    setDom(dom) {
        this.dom = dom;
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
            return {
                slug: key,
                classDef: entries[key].classDef,
                elements: this.findElements(entries[key], this.dom)
            };
        });
    }

    enhanceSlugs() {
        this.slugs.forEach((slug) => {
            slug.elements.forEach((element) => {
                this.enhanceElement(element, slug.classDef);
            });
        })
    }

    enhanceElement(element, classDef) {
        new classDef(element);
    }


    findElements(registryItem, dom) {
        let selector = registryItem.selector;
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