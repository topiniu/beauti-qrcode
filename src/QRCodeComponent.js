import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import QRCode from 'qrcode';

function QRCodeComponent({ url }) {
    const containerRef = useRef(null);
    const [qrMatrix, setQrMatrix] = useState(null);

    useEffect(() => {
        // QRCode.create(url, { errorCorrectionLevel: 'H' }).then(qr => {
        //     setQrMatrix(qr);
        // });
        setQrMatrix(QRCode.create(url, { errorCorrectionLevel: 'H' }).modules);

    }, [url]);

    useEffect(() => {
        if (containerRef.current && qrMatrix) {
            const qrSize = qrMatrix.size;
            const totalModules = qrSize * qrSize;
            const center = Math.floor(qrSize / 2);

            // Clear existing divs
            containerRef.current.innerHTML = '';

            // Set CSS variables for dynamic sizing
            containerRef.current.style.setProperty('--qr-size', qrSize);
            containerRef.current.style.setProperty('--qr-width', `${qrSize * 10}px`);

            // Create divs
            const divs = [];
            for (let i = 0; i < totalModules; i++) {
                const div = document.createElement('div');
                div.className = 'qr-module';
                const row = Math.floor(i / qrSize);
                const col = i % qrSize;
                div.style.backgroundColor = qrMatrix.get(col, row) ? 'black' : 'white';
                containerRef.current.appendChild(div);
                divs.push({ div, row, col });
            }

            // Calculate distances from the center
            divs.forEach(({ div, row, col }) => {
                const distance = Math.sqrt(Math.pow(row - center, 2) + Math.pow(col - center, 2));
                div.dataset.distance = distance;
            });

            // Animate the appearance of modules
            anime({
                targets: '.qr-module',
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(25, { from: 'center', grid: [qrSize, qrSize] }),
                easing: 'cubicBezier(.34,1.56,.81,1.38)',
                complete: () => {
                    // Add a shadow to the center div
                    // Animate the box shadow of the container after the QR code is shown
                }
            });
            anime({
                targets: '.qr-container',
                boxShadow: ['0px 0px 0px 0px rgba(99, 99, 99, 0)', '3px 3px 9px 9px rgba(99, 99, 99, 0.5)', '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'],
                easing: 'cubicBezier(.34,1.56,.81,1.38)',
                duration: 200,
                delay: 80 * qrSize * qrSize / 100, // Wait for the QR code animation to complete
            });
        }
    }, [qrMatrix]);

    return <div ref={containerRef} className="qr-container"></div>;
}

export default QRCodeComponent;
