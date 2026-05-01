# Investment Companion Website

A cutting-edge, SEO-friendly website for selling financial courses and e-books. Built with Next.js and Tailwind CSS, featuring dark theme, 3D animations, and a responsive design.

## Features

- **Modern Design**: Dark theme with gradient accents and glowing effects
- **Responsive Layout**: Mobile-first approach with a fluid design
- **SEO Optimized**: Server-side rendering via Next.js for better indexing
- **Performance Focused**: Fast loading times with optimized assets
- **Advanced Animations**: Using Framer Motion and GSAP for smooth transitions
- **3D Elements**: Interactive book showcase with 3D effects
- **Secure Payments**: Integration ready for payment processing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- NPM or Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/investment-companion.git
cd investment-companion
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Deployment

This website can be easily deployed on Vercel (recommended for Next.js projects):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure your deployment settings
4. Deploy

Vercel offers a generous free tier that includes:
- Automatic HTTPS
- Global CDN
- Continuous deployment from Git

## Customization

### Logo and Images

Replace the placeholder images in the `/public` directory:
- `/public/logo.png`: Your company logo
- `/public/icons/*.svg`: Icons for course categories

### Colors

Edit the color scheme in `/src/app/globals.css` by modifying the CSS variables:

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --primary: #00FFFF;
  --primary-dark: #0080FF;
  --primary-gradient: linear-gradient(90deg, #00FFFF 0%, #0080FF 50%, #8080FF 100%);
}
```

## Tech Stack

- **Next.js**: React framework with server-side rendering
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **GSAP**: Advanced animations
- **Three.js**: 3D graphics (via React Three Fiber)

## SEO Benefits

This website is built with SEO in mind:
- Server-side rendering for better indexing
- Semantic HTML structure
- Optimized meta tags
- Fast loading times
- Mobile-friendly design
- Social media sharing optimizations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern fintech websites
- Icons from [Feather Icons](https://feathericons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

Created with ❤️ for Investment Companion by Harsh Mendapara
