import { useState } from 'react';
import Head from 'next/head';
import cl from 'classnames';
import LiquidPixelSurroundVisualizer from '../components/LiquidPixelSurroundVisualizer/LiquidPixelSurroundVisualizer.index';

import styles from '../styles/Home.module.css';

export default function Home() {
  const chain = `https://assets.codepen.io/t-2371/homedepot-helmet-9362.chain`;
  const [activeColor, setActiveColor] = useState('ffffff');
  const [activeLogo, setActiveLogo] = useState(
    'https://www.liquidpixels.com/assets/static/liquidpixels-logo-color-black.jpg'
  );

  const updateColor = (e) => {
    const updateToColor = e.currentTarget.getAttribute('data-color');
    if (activeColor != updateToColor) {
      setActiveColor(updateToColor);
    }
  };

  const updateLogo = (e) => {
    const updateToLogo = e.currentTarget.getAttribute('data-logo');
    if (activeLogo != updateToLogo) {
      setActiveLogo(updateToLogo);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LiquidPixel Sample</title>
        <meta name="description" content="Liquid Pixel Sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.gallerySection}>
          <LiquidPixelSurroundVisualizer
            activeColor={activeColor}
            activeLogo={activeLogo}
            chain={chain}
          />
        </div>
        <div className={styles.configuratorSection}>
          <section className={styles.configuratorTileContainer}>
            <h3 className={styles.tileHeader}>Color:</h3>
            <div className={styles.tileGroup}>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]: activeColor === 'ffffff'
                })}
                onClick={updateColor}
                data-color="ffffff"
              >
                <span className={cl(styles.tileBox, styles.white)}>White</span>
              </button>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]: activeColor === 'FFFF00'
                })}
                onClick={updateColor}
                data-color="FFFF00"
              >
                <span className={cl(styles.tileBox, styles.yellow)}>
                  Yellow
                </span>
              </button>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]: activeColor === '0000ff'
                })}
                onClick={updateColor}
                data-color="0000ff"
              >
                <span className={cl(styles.tileBox, styles.blue)}>Blue</span>
              </button>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]: activeColor === 'FF0000'
                })}
                onClick={updateColor}
                data-color="FF0000"
              >
                <span className={cl(styles.tileBox, styles.red)}>Red</span>
              </button>
            </div>
          </section>
          <section className={styles.configuratorTileContainer}>
            <h3 className={styles.tileHeader}>Logo:</h3>
            <div className={styles.tileGroup}>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]:
                    activeLogo ===
                    'https://www.liquidpixels.com/assets/static/liquidpixels-logo-color-black.jpg'
                })}
                onClick={updateLogo}
                data-logo="https://www.liquidpixels.com/assets/static/liquidpixels-logo-color-black.jpg"
              >
                <span className={styles.logoBox}>
                  <img
                    className={styles.logoImage}
                    alt="liquidpixel logo"
                    src="https://www.liquidpixels.com/assets/static/liquidpixels-logo-color-black.jpg"
                  />
                </span>
              </button>
              <button
                className={cl(styles.tile, {
                  [styles.tileSelected]:
                    activeLogo ===
                    'https://assets.codepen.io/t-2371/homedepot-logo.jpg'
                })}
                onClick={updateLogo}
                data-logo="https://assets.codepen.io/t-2371/homedepot-logo.jpg"
              >
                <span className={styles.logoBox}>
                  <img
                    className={styles.logoImage}
                    alt="liquidpixel logo"
                    src="https://assets.codepen.io/t-2371/homedepot-logo.jpg"
                  />
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
