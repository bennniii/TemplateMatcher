import {providerRegistry} from "@nut-tree/nut-js";
import TemplateMatchingFinder from "./lib/template-matching-finder.class";

// Auto-register for backward compatibility
const finder = new TemplateMatchingFinder();
providerRegistry.registerImageFinder(finder);

// Export the finder class for direct use
export {TemplateMatchingFinder};

export interface TemplateMatcherProviderData {
    searchMultipleScales: boolean;
}
