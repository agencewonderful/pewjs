/**
 * Object that will enhance a given parentHTMLElement based on a registry of entry
 */
export class Enhancer {

    /**
     * Enable debug mode
     * @returns {Enhancer}
     * @private
     */
    __debug() {
        this.__DEBUG = true;
        return this;
    }

    /**
     * Enhance all entries from repository
     * @param registry
     * @param parentHTMLElement
     * @returns {[]}
     */
    enhance(registry, parentHTMLElement) {
        if (!parentHTMLElement) {
            parentHTMLElement = document.body;
        }
        let entries = registry.getAll();
        let keys    = Object.keys(entries);
        return keys.map((key) => {
            let thisEntry               = entries[key];
            thisEntry.parentHTMLElement = parentHTMLElement;
            this.enhanceEntry(thisEntry);
        });
    }

    /**
     * Enhance one entry
     * @param registryEntry
     * @param force
     * @returns {Enhancer}
     */
    enhanceEntry(registryEntry, force) {
        if (this.__DEBUG) {
            registryEntry.debug();
        }

        registryEntry.enhance(force);

        return this;
    }
}
