# Sung Jin Woo - Shadow Monarch Interactive Website

A super creative interactive React website featuring Sung Jin Woo with dark blue background, smooth animations, and interactive elements that respond to mouse movement.

## Features

- 🎨 **Dark Blue Theme**: Beautiful gradient background with purple and gold accents
- 🖱️ **Mouse Tracking**: Interactive elements that follow your mouse cursor
- ✨ **Smooth Animations**: Framer Motion powered animations throughout
- 🌟 **Parallax Effects**: 3D-like depth with mouse movement
- 💨 **Dust Animation**: Post-battle dust particles floating at the bottom
- 🎭 **Floating Elements**: Interactive orbs and effects
- 📊 **Stats Section**: Sung Jin Woo's abilities and powers
- 👥 **Shadow Army**: Display of his shadow soldiers

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## Technologies Used

- React 18
- Framer Motion (animations)
- Styled Components (styling)
- React Spring (physics-based animations)

## Interactive Features

- **Mouse Tracking**: Move your mouse around the page to see elements respond
- **Parallax Effect**: The entire page has a subtle 3D tilt effect
- **Hover Effects**: Cards and elements scale and glow on hover
- **Scroll Animations**: Elements animate as you scroll through sections
- **Dust Particles**: Continuous dust animation at the bottom simulating post-battle atmosphere

## File Structure

```
src/
├── components/
│   ├── HeroSection.js      # Main hero with Sung Jin Woo image
│   ├── StatsSection.js     # Abilities and stats cards
│   ├── ShadowArmy.js       # Shadow soldiers display
│   ├── FloatingElements.js # Interactive floating orbs
│   └── DustAnimation.js    # Bottom dust particles
├── App.js                  # Main app with mouse tracking
├── index.js               # React entry point
└── index.css              # Global styles
```

## Customization

You can easily customize:
- Colors in `src/index.css` (CSS variables)
- Animation speeds in component files
- Mouse sensitivity in `App.js`
- Dust particle count in `DustAnimation.js`

Enjoy the interactive experience! 🎮✨
