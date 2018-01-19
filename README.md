# PEW.js, a Progressive Enhancement library

## Description

Pew.js is a tiny progressive enhancement library whose main concern is to enhance HTML DOM fragments with Javascript objects while respecting the separation of concerns principles.

That means that you can leave your HTML untouched, and let Pew enhance it by giving the wanted DOM fragments to your JavaScript classes so they can work on them separately. 

## Concepts

- Your Javascript objects would be instanciable prototypes or classes, that take a DOM fragment as a parameter.
- You init a Pew instance and register your objects towards its registry, by mentionning a DOM selector to get targeted by pew (more on that later).
- When Pew fires, it browses its registry to see if it finds the given selectors within its main area of intervention.
- If it finds a DOM fragment, it will instanciate your object for each found iteration of the selector, and pass the iteration fragment to your object constructor.

## Installation

1. Get the latest sources (several possibilities)
    - Either from npm by running : `npm install pewjs --save`
    - Or from the [github repository](https://github.com/agencewonderful/pewjs) by downloading the zip
    
2. Include the pew.js files
    - If you are in ES6, you can use the sources files directly, or add a script tag with the minified source.
    - If you are in ES5, you can add a script tag with the minified source.                
        
## Getting started        

1. Write some pure HTML

    ```
    <section>
        <div id="test-component-1" class="test-component">
            Test component 1
        </div>
        <div id="test-component-2" class="test-component">
            Test component 2
        </div>
        <div id="test-component-3" class="test-component">
            Test component 3
        </div>                
    </section>
    ```                      
        
2. Create an instanciable JavaScript object
    
        export class MyFrontEndComponent {
        
            /**
             * Element will receive the HTML DOM node from pew
             */
            constructor(element, options) {
                this.element = element;
                this.options = options;
                this.init();
            }
            init() {
                console.log('This is MyFrontEndComponent instanciated with the HTML DOM node : '+this.element.id);
            }
        }    

3. Instanciate Pew 

        let pew = new Pew();
         
4. Add entries to registry items :

    - The RegistryEntry first parameter is the key where your RegistryEntry is going to be stored in Pew's registry index (so you can retrieve it later for example)./
    - The RegistryEntry second parameter is your javascript object definition (not instanciated yet).
    - The RegistryEntry third parameter is your html selector. It can be a class, an id or even a data attribute.
    
            pew.addRegistryEntry(new RegistryEntry(MyFrontEndComponent, '.test-component', 'myFrontEndComponentRegistryEntryKey'));                    

    You can also instanciate registered Pew entries by your own.
    * Get the registered entry where you need it, for a fully free manipulation (or override of your registered items)
    
            let accordion = pew.getRegistryEntry('accordion');
            let DOM = document.body; // get a Dom Parent Element
            new accordion.classDef(dom);
        
    * Or execute it when required before the automatic workflow
    
            pew.enhanceRegistryEntry('accordion');
            
6. Run Pew whenever you need (ideally at the end of your call flow)

        pew.enhanceRegistry();
        
7. In our example this is what is going to happen:
    - Pew will browse its registry.
    - It will find the myFrontEndComponentRegistryEntryKey registryEntry and work with it.
    - Based on this Entry selector, it will find the 3 DOM fragments targeted by the .test-component selector
    - For each of these 3 DOM fragments, it will create a new  `MyFrontEndComponent` with the current fragment in the constructor parameter.
    
8. If we'd look in our browser console, we would see three logs:
    - This is MyFrontEndComponent instanciated with the HTML DOM node test-component-1
    - This is MyFrontEndComponent instanciated with the HTML DOM node test-component-2
    - This is MyFrontEndComponent instanciated with the HTML DOM node test-component-3        
        
#TL;DR :
- Instanciate Pew.
- Add registry entries that are a "Key / Class Definition / Selector (optional)" tryptic.
- Run enhancer.
