# Visual Guide - Medieval Theme

## Color Swatches

### Backgrounds
```
Parchment:        #f4e8d0  ████████
Parchment Dark:   #e8d7b8  ████████
Parchment Darker: #d4c4a8  ████████
Aged Paper:       #f9f5e8  ████████
```

### Text Colors
```
Ink Black:        #1a1410  ████████
Ink Brown:        #3d2817  ████████
Stone Gray:       #6b6b6b  ████████
Stone Light:      #a8a8a8  ████████
```

### Accent Colors
```
Royal Gold:       #d4af37  ████████
Bronze:           #cd7f32  ████████
Royal Blue:       #1e3a5f  ████████
Forest Green:     #2d5016  ████████
Royal Red:        #8b1a1a  ████████
Seal Red:         #a52a2a  ████████
```

## Typography Examples

### Headers (Cinzel Font)
```
H1: SCHOOL FOOD ORDERING (2.2rem, 900 weight, uppercase, 2px spacing)
H2: AVAILABLE SHOPS (1.4rem, 900 weight, uppercase, 2px spacing)
H3: Pizza Palace (1.2rem, 900 weight, uppercase, 1px spacing)
```

### Body Text (Crimson Text Font)
```
Regular: Order food during your break (1.05rem, 400 weight)
Bold: Total: $15.00 (1rem, 700 weight)
Italic: Closes at 12:30 (0.9rem, 400 weight, italic)
```

## Component Previews

### Login Page
```
┌─────────────────────────────────────────┐
│  SCHOOL FOOD ORDERING                   │
│  Order food during your break           │
│                                         │
│  YOUR NAME                              │
│  ┌───────────────────────────────────┐ │
│  │ Enter your name                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  I AM A...                              │
│  ┌───────────────────────────────────┐ │
│  │ Student                        ▼  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │         CONTINUE                  │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Shop Card
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ PIZZA PALACE        [OPEN]      │ │
│ │                                 │ │
│ │ 12 spots left                   │ │
│ │ Service fee: $1                 │ │
│ │ Closes at 12:30                 │ │
│ │                                 │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │     VIEW MENU →             │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Button States
```
Primary (Gold):
┌─────────────────┐
│  PLACE ORDER    │  (Gold gradient, brown border)
└─────────────────┘

Success (Green):
┌─────────────────┐
│  MARK READY     │  (Forest green gradient)
└─────────────────┘

Danger (Red):
┌─────────────────┐
│  LOGOUT         │  (Seal red, red border)
└─────────────────┘
```

### Status Badges
```
[OPEN]      - Forest green background
[CLOSED]    - Stone gray background
[READY]     - Royal blue background
[QUEUED]    - Stone gray background
[DELIVERED] - Forest green background
```

### Navigation Icons
```
⚔  Shops (Crossed Swords)
⚱  Cart (Amphora/Vessel)
⚜  Orders (Fleur-de-lis)
```

## Layout Structure

### Dashboard Header
```
┌────────────────────────────────────────────────┐
│ GOOD MORNING, JOHN        [LOGOUT]             │
│ Break countdown                                │
└────────────────────────────────────────────────┘
═══════════════════════════════════════════════════ (Gold border)
```

### Timer Section
```
┌────────────────────────────────────────────────┐
│  ORDER CUTOFF IN          15:30                │
└────────────────────────────────────────────────┘
```

### Content Grid (Desktop)
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Shop 1  │ │  Shop 2  │ │  Shop 3  │ │  Shop 4  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Bottom Navigation (Mobile)
```
┌────────────────────────────────────────────────┐
│    ⚔         ⚱  [2]        ⚜                  │
│  SHOPS      CART        ORDERS                 │
└────────────────────────────────────────────────┘
```

## Hover Effects

### Card Hover
```
Before:  Border: brown, Shadow: light
After:   Border: gold, Shadow: medium, Lift: -4px
```

### Button Hover
```
Before:  Position: 0, Shadow: medium
After:   Position: -2px, Shadow: heavy
```

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width cards
- Bottom navigation visible
- Stacked forms

### Tablet (640px - 768px)
- Two column grid
- Bottom navigation visible
- Larger touch targets

### Desktop (> 768px)
- Multi-column grid (3-4 columns)
- Bottom navigation hidden
- Hover effects enabled
- Larger spacing

## Accessibility Features

### Focus States
```
Input Focus:
┌─────────────────────────────────────┐
│ John Doe                            │ (Gold border + glow)
└─────────────────────────────────────┘
```

### Color Contrast
- Text on parchment: 12:1 ratio (AAA)
- Buttons: 7:1 ratio (AA)
- Status badges: 4.5:1 ratio (AA)

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators on all interactive elements
- Skip links for screen readers

## Animation Timing

```
Standard transition: 0.3s ease
Quick transition:    0.2s ease
Hover lift:          transform 0.3s
Color change:        0.3s ease
Shadow change:       0.3s ease
```

## Best Practices

1. **Consistency**: Use defined colors and spacing
2. **Hierarchy**: Cinzel for emphasis, Crimson for content
3. **Contrast**: Maintain readability on parchment
4. **Spacing**: Consistent padding and margins
5. **Borders**: 2-3px for emphasis, 1px for decoration
6. **Shadows**: Light for cards, medium for buttons, heavy for modals
7. **Hover**: Always include lift + shadow enhancement
8. **Typography**: Uppercase for headers/buttons, sentence case for content
