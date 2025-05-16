# TemplateMatcherFinder Examples

This directory contains examples for using the TemplateMatcher library on different platforms, including Apple Silicon Macs.

## Running the Examples

1. First, make sure you have built the package:

```bash
# From the root of the repository
npm run compile
```

2. Install nut.js (if not already installed):

```bash
npm install @nut-tree/nut-js
```

3. Run an example:

```bash
node examples/basic-usage.js
```

## Example Files

- `basic-usage.js` - Demonstrates how to find an image on the screen using the template matcher

## Notes for Apple Silicon Users

All examples should work natively on Apple Silicon Macs without modification. If you encounter any issues, please refer to the [Apple Silicon Guide](../docs/APPLE_SILICON.md) for troubleshooting.

## Creating Your Own Examples

When creating examples that use this library:

1. Import the TemplateMatchingFinder from the package
2. Register it with the nut.js providerRegistry
3. Configure the confidence threshold as needed
4. Use screen.find() to locate images on screen

Example:

```javascript
const { screen, providerRegistry } = require("@nut-tree/nut-js");
const { TemplateMatchingFinder } = require("@nut-tree/template-matcher");

// Register the finder
const finder = new TemplateMatchingFinder();
providerRegistry.registerImageFinder(finder);

// Use it
async function findImage(imagePath) {
    return await screen.find(imagePath);
}
```