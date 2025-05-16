# Apple Silicon Compatibility Guide

> **Important Note about Dependencies**: This project depends on `@nut-tree/nut-js`, which you may need to install from a specific source or install separately. The standard npm installation process might not find this dependency automatically.

This guide explains how to use and develop the TemplateMatcher library on Apple Silicon Macs.

## Installation

Installation on Apple Silicon Macs can be done in two ways:

### 1. Using the install-silicon.sh script

The included installation script handles most of the setup automatically:

```bash
# Make sure the script is executable
chmod +x ./install-silicon.sh

# Run the installation script
./install-silicon.sh
```

### 2. Manual Installation

If you prefer to install manually:

```bash
# Install cmake (required for building OpenCV)
brew install cmake

# Install opencv-build first
npm install opencv-build

# Then install the package
npm install
```

## Troubleshooting

### Common Issues

1. **Building fails with compilation errors**

   Try setting these compiler flags:
   
   ```bash
   export CXXFLAGS="-std=c++14 -Wno-c++11-narrowing"
   npm install
   ```

2. **Node.js version compatibility issues**
   
   Make sure you're using a compatible Node.js version. This library works with Node.js 16.0.0 and above.

3. **Dependency resolution problems**
   
   If npm has trouble resolving dependencies:
   
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

### Rosetta 2 Fallback

If you continue to have issues with native installation, you can try running in Rosetta 2 mode:

1. Find the Terminal application in Finder
2. Right-click and select "Get Info"
3. Check "Open using Rosetta"
4. Close and reopen Terminal
5. Run installation commands

## Testing on Apple Silicon

To run tests on Apple Silicon:

```bash
# Run tests with verbose output
npm test -- --verbose
```

If tests fail due to native module issues, try:

1. Check OpenCV installation: `brew info opencv`
2. Make sure cmake is properly installed: `cmake --version`
3. Run tests in Rosetta 2 mode if native tests fail

## Building and Publishing

When building the package for publication:

```bash
# Clean previous builds
npm run clean

# Compile the package
npm run compile

# Test the compiled package
npm test
```

## Compatibility Notes

- All image processing functionality should work identically on Apple Silicon as on x64 systems
- Performance may actually be improved on Apple Silicon for certain operations
- Memory usage patterns may differ slightly between architectures