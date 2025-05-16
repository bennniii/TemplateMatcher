# @nut-tree/template-matcher change log (Apple Silicon Fork)

All notable changes to this project will be documented in this file.

## [3.0.0] - 2025-05-16

### Added
- Support for Apple Silicon ARM64 architecture
- Support for Node.js versions 16+ (aligned with nut.js v4.x requirements)
- Support for Electron versions 7+
- Compatibility with latest nut.js v4.x
- Updated installation documentation with Apple Silicon prerequisites

### Changed
- Replaced `opencv4nodejs-prebuilt` with `@u4/opencv4nodejs` for Apple Silicon compatibility 
- Updated dependency specifications in package.json
- Added preinstall script to install opencv-build
- Updated peer dependency to include nut.js v4.x

### Deprecated
- None

### Removed
- Support for Node.js versions below 16.0.0 to align with nut.js v4.x requirements

### Fixed
- Compatibility issues with Apple Silicon
- Module import paths to use the new OpenCV library
- Dependency issues with latest nut.js version
