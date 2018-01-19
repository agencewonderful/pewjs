## Requirements

* ES6 or above
* npm

## Installation

1. Run 

       npm install pewjs --save
        
2. Instanciate Pew 

        let pew = new Pew()
        
3. Add entries to registry items :

        pew.addRegistryEntry(new RegistryItem(classDef: Accordion, selector: '.accordion', key: 'accordion'));

    *  Accordion is  a class definition (not instanciated yet), for example :
    
            import UIkit from 'uikit';
            export class Accordion {
                constructor(element, options) {
                    this.element = element;
                    this.options = options;
                    this.UIKit();
                }
                UIKit() {
                    UIkit.accordion(this.element, this.options);
                }
            }

4. Do whatever you need to do on your app, unrelated to PewJS, such as
    * Generate Dom
    * Execute other JS scripts
5. You can also instanciate registered Pew entries by your own.
    * Get the registered entry where you need it, for a fully free manipulation (or override of your registered items)
    
            let accordion = pew.getRegistryEntry('accordion');
            let dom = document.body; // get a Dom Parent Element
            new accordion.classDef(dom);
        
    * Or execute it when required before the automatic workflow
    
            pew.enhanceRegistryEntry('accordion');
            
6. Run Pew whenever you need (ideally at the end of your call flow)

        pew.enhanceRegistry();
        
#TL;DR :
- Instanciate Pew.
- Add registry entries that are a "Key / Class Definition / Selector (optional)" tryptic.
- Run enhancer.
