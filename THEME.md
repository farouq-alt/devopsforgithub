# Medieval Theme Design System

## Overview
The School Food Ordering System features a comprehensive medieval theme that transforms the modern web application into an immersive historical experience.

## Typography

### Primary Font: Cinzel
- **Usage**: Headers, titles, buttons, labels
- **Weights**: 400, 600, 700, 900
- **Characteristics**: Gothic-inspired serif font with strong medieval character
- **Applied to**: All headings (h1-h6), navigation, form labels, buttons

### Secondary Font: Crimson Text
- **Usage**: Body text, descriptions, content
- **Weights**: 400, 600, 700 (with italic variants)
- **Characteristics**: Classic serif font optimized for readability
- **Applied to**: Paragraphs, form inputs, general content

## Color Palette

### Primary Colors
- **Parchment** (#f4e8d0): Main background, aged paper effect
- **Parchment Dark** (#e8d7b8): Secondary backgrounds
- **Parchment Darker** (#d4c4a8): Tertiary backgrounds
- **Aged Paper** (#f9f5e8): Card backgrounds, clean surfaces

### Accent Colors
- **Ink Black** (#1a1410): Primary text, deep shadows
- **Ink Brown** (#3d2817): Secondary text, borders
- **Royal Gold** (#d4af37): Highlights, active states, premium elements
- **Bronze** (#cd7f32): Secondary gold, gradients

### Status Colors
- **Royal Red** (#8b1a1a): Danger, closed states
- **Seal Red** (#a52a2a): Error messages, alerts
- **Royal Blue** (#1e3a5f): Information, primary actions
- **Forest Green** (#2d5016): Success, open states

### Neutral Colors
- **Stone Gray** (#6b6b6b): Disabled states, secondary text
- **Stone Light** (#a8a8a8): Borders, dividers

## Visual Elements

### Borders
- **Width**: 2-3px for emphasis
- **Style**: Solid, straight edges (no rounded corners except 2px for subtle softness)
- **Color**: Primarily ink-brown with gold accents for active states
- **Double Borders**: Inner decorative borders on cards for depth

### Shadows
- **Light**: 0 2px 8px rgba(26, 20, 16, 0.15) - Subtle elevation
- **Medium**: 0 4px 12px rgba(26, 20, 16, 0.25) - Standard cards
- **Heavy**: 0 8px 24px rgba(26, 20, 16, 0.35) - Modals, important elements

### Textures
- **Paper Lines**: Horizontal repeating lines for parchment effect
- **Vertical Lines**: Subtle vertical lines on login container
- **Pattern Overlay**: Diamond pattern on login background

## Component Styling

### Buttons
- **Primary**: Gold gradient with ink-brown border
- **Success**: Forest green gradient
- **Danger**: Seal red gradient
- **Secondary**: Parchment with brown border
- **Typography**: Cinzel font, uppercase, letter-spacing: 2px
- **Hover**: Lift effect (translateY -2px) with enhanced shadow

### Cards
- **Background**: Aged paper
- **Border**: 2-3px solid ink-brown
- **Inner Border**: Decorative 1px border inset
- **Shadow**: Light to medium based on importance
- **Hover**: Gold border, lift effect, enhanced shadow

### Forms
- **Inputs**: Parchment background, ink-brown border
- **Focus**: Gold border with subtle glow
- **Labels**: Cinzel font, uppercase, brown color
- **Validation**: Red border and background for errors

### Navigation
- **Bottom Nav**: Fixed, aged paper background, gold accents
- **Icons**: Medieval symbols (⚔ ⚱ ⚜)
- **Active State**: Gold color, parchment background
- **Badge**: Red with gold border, Cinzel font

### Status Badges
- **Open**: Forest green background, light border
- **Closed**: Stone gray background
- **Ready**: Royal blue background
- **Delivered**: Forest green background
- **All badges**: 2px border, uppercase Cinzel text

## Layout Principles

### Spacing
- **Consistent padding**: 1rem to 1.5rem for cards
- **Gap spacing**: 0.75rem to 1rem between elements
- **Section margins**: 1rem to 1.5rem

### Responsive Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 768px (2 columns)
- **Desktop**: 768px - 1024px (2-3 columns)
- **Large Desktop**: > 1024px (3-4 columns)

### Grid Systems
- **Shops/Menu**: Responsive grid (1-4 columns)
- **Stats**: 3-4 column grid
- **Orders**: Responsive grid matching shops

## Interactive States

### Hover Effects
- **Lift**: translateY(-2px to -4px)
- **Shadow**: Increase shadow depth
- **Color**: Shift to gold or darker variant
- **Border**: Change to gold for emphasis

### Active States
- **Background**: Parchment or gold tint
- **Border**: Gold color
- **Text**: Gold or ink-black
- **Underline**: Gold bottom border for tabs

### Disabled States
- **Opacity**: 0.4 to 0.5
- **Cursor**: not-allowed
- **No hover effects**

## Accessibility

### Contrast Ratios
- **Text on parchment**: High contrast with ink-black
- **Buttons**: Strong contrast maintained
- **Status indicators**: Color + text labels

### Focus States
- **Visible outline**: Gold glow effect
- **Keyboard navigation**: Clear focus indicators
- **Skip links**: Available for screen readers

## Animation & Transitions

### Timing
- **Standard**: 0.3s ease
- **Quick**: 0.2s ease
- **Smooth**: cubic-bezier for custom easing

### Properties
- **Transform**: Lift, scale effects
- **Color**: Background, border, text
- **Shadow**: Depth changes
- **Opacity**: Fade effects

## Medieval Symbols Used

- **⚔** (Crossed Swords): Shops/Marketplace
- **⚱** (Amphora): Cart/Container
- **⚜** (Fleur-de-lis): Orders/Royal Seal

## Implementation Notes

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
```

### CSS Variables
All colors defined in `:root` for easy theming and consistency.

### Background Patterns
Created using CSS gradients and SVG data URIs for performance.

### No External Images
All visual elements created with CSS for fast loading and scalability.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- Custom fonts with fallbacks
- Graceful degradation for older browsers
