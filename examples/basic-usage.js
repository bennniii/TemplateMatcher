/**
 * Basic usage example for @nut-tree/template-matcher with Apple Silicon support
 * 
 * This example demonstrates how to use the template matcher to find an image on the screen.
 * Works on both Intel and Apple Silicon Macs, as well as Windows and Linux.
 * 
 * Requirements:
 * - @nut-tree/nut-js must be installed
 * - The template-matcher must be built/installed
 */

// Import dependencies
const { screen, mouse, Region, imageResource } = require("@nut-tree/nut-js");
const { providerRegistry } = require("@nut-tree/nut-js");
const { TemplateMatchingFinder } = require("../dist/index");

// Initialize the template matcher
const finder = new TemplateMatchingFinder();
providerRegistry.registerImageFinder(finder);

// Example configuration - uncomment to use
// screen.config.confidence = 0.95;  // Set confidence threshold for image matching

// Set resource directory for sample images
imageResource.setResourceDirectory("./lib/__mocks__");

async function findAndClickImage() {
    try {
        // Search for a template image
        console.log("Searching for template image...");
        const region = await screen.find(imageResource("needle.png"));
        
        console.log(`Image found at: (${region.left}, ${region.top}) with dimensions ${region.width}x${region.height}`);
        
        // Option: Click on the found image
        // await mouse.move(region.center());
        // await mouse.leftClick();
        
        return region;
    } catch (error) {
        console.error("Failed to find image:", error.message);
        return null;
    }
}

// Run the example
findAndClickImage()
    .then(region => {
        if (region) {
            console.log("Example completed successfully!");
        } else {
            console.log("Example failed to find the image.");
        }
    })
    .catch(error => {
        console.error("Unexpected error:", error);
    });