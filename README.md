# beauty-qrcode

Animated, customizable QR code component for React applications. Ships with batched animations powered by Anime.js and a zero-dependency rendering path for robust production use.

## Features
- Creates high-error-correction QR codes from any string input using `qrcode`
- Optional entrance animation with Anime.js-powered scaling and glow
- Flexible sizing and styling via `moduleSize`, `className`, and `moduleClassName`
- Framework-agnostic output that works in SPA and SSR React environments

## Installation
```bash
npm install beauty-qrcode
# or
pnpm add beauty-qrcode
```

## Usage
```jsx
import { QRCodeComponent } from 'beauty-qrcode';

export default function Example() {
  return (
    <QRCodeComponent
      url="https://example.com/signup"
      moduleSize={12}
      errorCorrectionLevel="H"
      className="qrCard"
      moduleClassName="qrPixel"
    />
  );
}
```

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `string` | `""` | Value encoded into the QR graphic. |
| `errorCorrectionLevel` | `'L'\|'M'\|'Q'\|'H'` | `'H'` | Controls resiliency to damage; higher values tolerate more error. |
| `moduleSize` | `number` | `10` | Pixel size applied to each QR module. |
| `className` | `string` | `''` | Appended to the container element for custom layout/styling. |
| `moduleClassName` | `string` | `''` | Appended to every QR module div for fine-grained styling. |
| `animate` | `boolean` | `true` | Toggle entrance animation. |

## Styling
The component uses inline layout styles for predictable sizing. Override colors, spacing, or transitions by targeting the exported classes:
```css
.qrCard {
  background: radial-gradient(circle, #fff 0%, #f2f2f2 100%);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.16);
}

.qrPixel {
  border-radius: 2px;
}
```

## Development
- `npm start` – runs the demo app in development mode for rapid iteration.
- `npm test` – launches the Jest + React Testing Library suite.
- `npm run build:lib` – bundles the distributable library to `dist/` using Microbundle. Run this before publishing.

Refer to `AGENTS.md` for detailed contribution, testing, and release guidelines.

## License
MIT © beauty-qrcode contributors
