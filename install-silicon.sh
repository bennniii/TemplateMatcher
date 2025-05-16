#!/bin/bash

# Installation script for Apple Silicon systems
echo "Installing dependencies for @nut-tree/template-matcher on Apple Silicon..."

# Check if running on Apple Silicon
if [[ $(uname -m) != "arm64" ]]; then
    echo "Warning: This system doesn't appear to be using Apple Silicon (ARM64)."
    echo "This script is optimized for Apple Silicon Macs. Continue anyway? (y/n)"
    read -r response
    if [[ "$response" != "y" ]]; then
        echo "Installation aborted."
        exit 1
    fi
fi

# Check if brew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Homebrew already installed."
fi

# Install cmake (required for opencv4nodejs)
echo "Installing cmake (required for OpenCV)..."
brew install cmake

# Check if Node.js is installed and version is compatible
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js..."
    brew install node@16
else
    NODE_VERSION=$(node --version | cut -d "v" -f 2 | cut -d "." -f 1)
    echo "Node.js already installed: $(node --version)"
    
    if [[ $NODE_VERSION -lt 16 ]]; then
        echo "Warning: Node.js version 16.0.0 or higher is required."
        echo "Current version: $(node --version)"
        echo "Would you like to install Node.js 16? (y/n)"
        read -r response
        if [[ "$response" == "y" ]]; then
            brew install node@16
        fi
    fi
fi

# Set environment variables to help with installation
export OPENCV4NODEJS_DISABLE_AUTOBUILD=0
export CXXFLAGS="-std=c++14 -Wno-c++11-narrowing"

# Install dependencies
echo "Installing npm dependencies..."
npm install opencv-build

# Note about @nut-tree/nut-js
echo "Note: You may need to install @nut-tree/nut-js separately from a specific source"
echo "This package will attempt to install dependencies, but @nut-tree/nut-js may need to be installed manually"

# Install remaining dependencies
npm install

# Build the package
echo "Building the package..."
npm run build

echo "Installation and build complete!"
echo "If you encounter any issues, try the following:"
echo "1. Run in a terminal with Rosetta 2 enabled"
echo "2. Set OPENCV4NODEJS_DISABLE_AUTOBUILD=1 and try again"
echo "3. Check the README.md and docs/APPLE_SILICON.md for more troubleshooting options"