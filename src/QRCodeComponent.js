import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import QRCode from 'qrcode';

const containerBaseStyle = {
  display: 'grid',
  margin: '20px auto',
  padding: '12px',
  borderRadius: '10px',
  transition: 'box-shadow 0.5s ease-in-out',
};

const moduleBaseStyle = {
  width: '100%',
  height: '100%',
};

function QRCodeComponent({
  url = '',
  errorCorrectionLevel = 'H',
  moduleSize = 10,
  className = '',
  moduleClassName = '',
  animate = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = '';

    let qr;
    try {
      qr = QRCode.create(url || '', { errorCorrectionLevel });
    } catch (error) {
      console.error('Failed to create QR code', error);
      return;
    }

    const qrMatrix = qr.modules;
    if (!qrMatrix) {
      return;
    }

    const qrSize = qrMatrix.size;
    const totalModules = qrSize * qrSize;
    const dimension = qrSize * moduleSize;
    const center = Math.floor(qrSize / 2);

    Object.assign(container.style, containerBaseStyle, {
      gridTemplateColumns: `repeat(${qrSize}, 1fr)`,
      width: `${dimension}px`,
      height: `${dimension}px`,
    });

    const nodes = [];
    for (let row = 0; row < qrSize; row += 1) {
      for (let col = 0; col < qrSize; col += 1) {
        const module = document.createElement('div');
        module.className = `qr-module${moduleClassName ? ` ${moduleClassName}` : ''}`;
        Object.assign(module.style, moduleBaseStyle);
        module.style.backgroundColor = qrMatrix.get(col, row) ? 'black' : 'white';
        container.appendChild(module);
        nodes.push({ node: module, row, col });
      }
    }

    nodes.forEach(({ node, row, col }) => {
      const distance = Math.hypot(row - center, col - center);
      node.dataset.distance = String(distance);
    });

    if (animate) {
      anime({
        targets: container.querySelectorAll('.qr-module'),
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(25, { from: 'center', grid: [qrSize, qrSize] }),
        easing: 'cubicBezier(.34,1.56,.81,1.38)',
      });

      anime({
        targets: container,
        boxShadow: [
          '0px 0px 0px 0px rgba(99, 99, 99, 0)',
          '3px 3px 9px 9px rgba(99, 99, 99, 0.5)',
          '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
        ],
        easing: 'cubicBezier(.34,1.56,.81,1.38)',
        duration: 200,
        delay: 0.8 * totalModules,
      });
    }

    return () => {
      container.innerHTML = '';
    };
  }, [url, errorCorrectionLevel, moduleSize, moduleClassName, animate]);

  const containerClasses = ['qr-container'];
  if (className) {
    containerClasses.push(className);
  }

  return <div ref={containerRef} className={containerClasses.join(' ')} />;
}

export default QRCodeComponent;
