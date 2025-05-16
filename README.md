# nut.js Template Matching Image Finder (Apple Silicon Compatible)

This is an enhanced version of the original [nut-tree/TemplateMatcher](https://github.com/nut-tree/TemplateMatcher) with added support for:

- Apple Silicon processors
- Modern Node.js versions (v16 and beyond)
- Modern Electron versions (v7 and beyond)
- Compatible with latest nut.js v4.x

## Changes from Original

- Replaced `opencv4nodejs-prebuilt` with `@u4/opencv4nodejs` for Apple Silicon compatibility
- Updated Node.js (v16+) and Electron version requirements
- Compatible with the latest nut.js v4.x
- Fixed compatibility issues for modern environments

## Installation

### Prerequisites

Before installing, make sure you have the following:

```bash
# Install cmake (required for @u4/opencv4nodejs)
brew install cmake
```

### Installing the Package

```bash
# Install as a dependency in your project
npm install @nut-tree/template-matcher
```

## Usage

Usage remains the same as the original package:

```typescript
import {providerRegistry} from "@nut-tree/nut-js";
import {TemplateMatchingFinder} from "@nut-tree/template-matcher";

const finder = new TemplateMatchingFinder();
providerRegistry.registerImageFinder(finder);
```

## Building and Installation

### Prerequisites

Before building or installing, you need:

1. Node.js (16.0.0 or higher)
2. npm
3. cmake (`brew install cmake`)
4. The @nut-tree/nut-js package (for usage)

### Building from Source

To build the package from source:

```bash
# Clone the repository
git clone https://github.com/bennniii/TemplateMatcher.git
cd TemplateMatcher

# Install dependencies
# Note: you may need to install @nut-tree/nut-js separately or from a specific source
npm install

# Build the package
npm run build
```

The built files will be in the `dist` directory.

### Quick Installation for Apple Silicon

A convenient installation script is available for Apple Silicon Macs:

```bash
# Make the script executable
chmod +x ./install-silicon.sh

# Run the installation script
./install-silicon.sh
```

For detailed information about Apple Silicon compatibility, please refer to the [Apple Silicon Guide](./docs/APPLE_SILICON.md).

## Troubleshooting

If you encounter issues during installation:

1. Make sure you have cmake installed: `brew install cmake`
2. Try installing with: `OPENCV4NODEJS_DISABLE_AUTOBUILD=1 npm install`
3. For Apple Silicon specific issues, try running in a terminal with Rosetta 2 as a fallback

## Development Notes

If you're developing this package:

1. The `@nut-tree/nut-js` dependency may need to be updated to a publicly available version or aliased to your local version
2. You may need to update other dependencies to their latest versions for compatibility
3. Consider updating the test suite to ensure compatibility with Apple Silicon
