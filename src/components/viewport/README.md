# Viewport System Documentation

## Overview

The Viewport system is a custom implementation for managing sections in a single-page application with smooth transitions between different sections. It provides a fullscreen scrolling experience where each section takes up the entire viewport, and users can navigate through sections using mouse wheel, keyboard, or touch gestures.

## Components

### 1. Viewport (`/src/components/viewport/Viewport.tsx`)

The main component that manages the display of sections.

**Props:**
- `children`: ReactNode[] - Array of sections/content to display
- `onSectionChange`: (index: number) => void - Callback when section changes
- `initialSection`: number - Index of initially active section (default: 0)

**Features:**
- Smooth transitions between sections
- Mouse wheel navigation
- Touch navigation for mobile devices
- Keyboard navigation (Arrow keys, PageUp/PageDown, Home/End)
- Visual navigation dots
- Animation of section content when sections change

### 2. ViewportSection (`/src/components/viewport/ViewportSection.tsx`)

A wrapper component to standardize section styling within the Viewport.

**Props:**
- `children`: ReactNode - Content of the section
- `className`: string - Additional CSS classes (optional)
- `id`: string - HTML ID for the section (optional)

**Example usage:**
```tsx
<ViewportSection id="about" className="bg-gray-900">
  <h2>About Us</h2>
  <p>Content goes here...</p>
</ViewportSection>
```

## Usage Example

```tsx
"use client";

import Viewport from "@/components/viewport/Viewport";
import ViewportSection from "@/components/viewport/ViewportSection";
import { useState } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("Home");
  
  const sections = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" }
  ];
  
  const handleSectionChange = (index: number) => {
    setActiveSection(sections[index].name);
  };
  
  return (
    <div>
      {/* Display current section name */}
      <div className="fixed top-5 left-5 z-50">
        {activeSection}
      </div>
      
      <Viewport onSectionChange={handleSectionChange}>
        {/* Home Section */}
        <ViewportSection id="home">
          <h1>Welcome</h1>
        </ViewportSection>
        
        {/* About Section */}
        <ViewportSection id="about">
          <h2>About Us</h2>
        </ViewportSection>
      </Viewport>
    </div>
  );
}
```

## Implementation Details

### Section Navigation

The Viewport tracks the current section index and uses CSS transforms to display the active section. Each section occupies 100% of the viewport height (h-screen), and the container is transformed using `translateY` to show the appropriate section.

### Animation

When switching sections, the component uses GSAP to animate the new section's content, creating a subtle entrance effect. This enhances the user experience by making transitions more engaging.

### Mobile Support

Touch events are handled to enable swiping between sections on mobile devices. A minimum swipe distance threshold prevents accidental navigation.

### Accessibility

Keyboard navigation ensures the component is accessible to users who navigate with keyboards. The navigation dots provide an alternative way to directly access specific sections.

## Best Practices

1. Keep sections lightweight to ensure smooth transitions
2. Use ViewportSection for consistent styling
3. Provide meaningful section names for better UX
4. Consider adding aria-labels and other accessibility enhancements
5. Test on both desktop and mobile devices to ensure responsive behavior
