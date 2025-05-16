#!/usr/bin/env python3
"""
OpenCV Validation Script for Template Matcher on Apple Silicon

This script validates that OpenCV is properly installed and that template matching
works correctly on the system. It's a useful diagnostic tool when setting up
the template matcher on a new system.

Usage:
    python3 opencv_validation.py [image_path]

If no image_path is provided, the script will try to use an image from the lib/__mocks__ directory.
"""

import os
import sys
import cv2
import numpy as np

def main():
    print(f"Running OpenCV validation test")
    print(f"OpenCV version: {cv2.__version__}")
    
    # Determine the image path
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
    else:
        # Try to find an image in the mocks directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        repo_dir = os.path.dirname(script_dir)
        mock_dir = os.path.join(repo_dir, 'lib', '__mocks__')
        
        if os.path.exists(mock_dir):
            images = [f for f in os.listdir(mock_dir) if f.endswith('.png')]
            if images:
                image_path = os.path.join(mock_dir, images[0])
            else:
                print("No image files found in lib/__mocks__")
                sys.exit(1)
        else:
            print("Mock directory not found. Please provide an image path.")
            sys.exit(1)
    
    print(f"Using image: {image_path}")
    
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Failed to load image: {image_path}")
        sys.exit(1)
    
    # Get image properties
    height, width, channels = img.shape
    print(f"Image size: {width}x{height}, {channels} channels")
    
    # Create a simple template matching test
    # Use a portion of the image as the template
    h_quarter, w_quarter = height // 4, width // 4
    template = img[h_quarter:3*h_quarter, w_quarter:3*w_quarter]
    template_height, template_width = template.shape[:2]
    print(f"Template size: {template_width}x{template_height}")
    
    # Perform template matching
    result = cv2.matchTemplate(img, template, cv2.TM_SQDIFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    
    # Calculate confidence (TM_SQDIFF_NORMED: lower is better, so convert)
    confidence = 1.0 - min_val
    print(f"Match confidence: {confidence:.4f}")
    print(f"Match location: {min_loc}")
    
    # This should be a perfect match since template is from the same image
    if confidence < 0.9:
        print("WARNING: Confidence lower than expected for same-image match")
    else:
        print("✅ Test passed: Template matching works correctly")
    
    # Test multiple scales
    print("\nTesting multiple scales:")
    scale_steps = [0.9, 0.8, 0.7, 0.6, 0.5]
    for scale in scale_steps:
        scaled_width = int(template_width * scale)
        scaled_height = int(template_height * scale)
        
        # Skip if too small
        if scaled_width <= 10 or scaled_height <= 10:
            print(f"  Scale {scale}: Skipping (too small)")
            continue
            
        scaled_template = cv2.resize(template, (scaled_width, scaled_height), interpolation=cv2.INTER_AREA)
        print(f"  Scale {scale}: Scaled template size: {scaled_width}x{scaled_height}")
        
        # Match with scaled template
        result = cv2.matchTemplate(img, scaled_template, cv2.TM_SQDIFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        
        # Calculate confidence
        scaled_confidence = 1.0 - min_val
        print(f"  Scale {scale}: Confidence: {scaled_confidence:.4f}, Location: {min_loc}")
    
    print("\n✅ All OpenCV operations completed successfully")
    print("Template matching should work properly on this system")

if __name__ == "__main__":
    main()