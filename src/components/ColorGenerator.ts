export function ColorGenerator() {
    const buttonElement = document.getElementById('change');
    const body = document.body;
    
    const rgbElement = document.getElementById('rgb-value');
    const hexElement = document.getElementById('hex-value');
    const hslElement = document.getElementById('hsl-value');

    const copyRgbButton = document.getElementById('copy-rgb');
    const copyHexButton = document.getElementById('copy-hex');
    const copyHslButton = document.getElementById('copy-hsl');

    let rgbValue = 'rgb(78, 198, 124)';
    let hexValue = '#4ec67c';
    let hslValue = 'hsl(143, 51%, 54%)';

    copyRgbButton?.addEventListener('click', () => copyToClipboard(rgbValue));
    copyHexButton?.addEventListener('click', () => copyToClipboard(hexValue));
    copyHslButton?.addEventListener('click', () => copyToClipboard(hslValue));

    rgbElement!.textContent = rgbValue;
    hexElement!.textContent = hexValue;
    hslElement!.textContent = hslValue;
    body.style.backgroundColor = rgbValue;

    const rgbToHex = (r: number, g: number, b: number): string => {
        const toHex = (color: number): string => {
            const hex = color.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        const red = toHex(r);
        const green = toHex(g);
        const blue = toHex(b);

        return `#${red}${green}${blue}`;
    };

    const rgbToHsl = (r: number, g: number, b: number):string  => {
        r /= 255;
        g /= 255;
        b /= 255;
    
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number = 0, s: number, l: number = (max + min) / 2;
    
        if (max === min) {
            s = 0; // Šedá barva
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
        // return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };

    const setColors = (hex: string, rgb: string, hsl: string): void => {
        hexElement!.textContent = hex;
        rgbElement!.textContent = rgb;
        hslElement!.textContent = hsl;

        body.style.backgroundColor = rgb;
        body.classList.add('change-color-animation');
    }

    const copyToClipboard = (text: string): void => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    const generateRandomRgbColor = (): void => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const rgb = `rgb(${r}, ${g}, ${b})`;
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);

        rgbValue = rgb;
        hexValue = hex;
        hslValue = hsl;

        setColors(hex, rgb, hsl);
    }

    const handleButtonClick = (event: Event): void => {
        event.preventDefault();
        generateRandomRgbColor();
    }

    buttonElement?.addEventListener('click', handleButtonClick);
}
