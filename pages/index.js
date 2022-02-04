import { useState } from 'react';
import Head from 'next/head';
import cl from 'classnames';
import LiquidPixelSurroundVisualizer from '../components/LiquidPixelSurroundVisualizer/LiquidPixelSurroundVisualizer.index';

import styles from '../styles/Home.module.css';

export default function Home() {
  // load from product setup?
  const modelOptions = {
    Helmet_9362: {
      textureMapName: 'Helmet_9362',
      optionName: 'Cap Style',
      model: 'https://assets.codepen.io/t-2371/homedepot-helmet-9362.glb',
      chain: 'https://assets.codepen.io/t-2371/homedepot-helmet-9362.chain'
    },
    Helmet: {
      textureMapName: 'Helmet',
      optionName: 'Full Brim',
      model: 'https://assets.codepen.io/t-2371/homedepot-helmet-9367.glb',
      chain: 'https://assets.codepen.io/t-2371/homedepot-helmet-9367.chain'
    }
  };
  const logoList = [
    {
      name: 'LiquidPixel',
      src: 'https://www.liquidpixels.com/assets/static/liquidpixels-logo-color-black.jpg'
    },
    {
      name: 'The Home Depot',
      src: 'https://assets.codepen.io/t-2371/homedepot-logo.jpg'
    },
    {
      name: 'Bechtel',
      src: 'https://res.cloudinary.com/dc6unffgo/image/upload/v1643384581/lptest/bechtel-logo-2_eis7u9.png'
    },
    {
      name: 'Pro Construction',
      src: 'https://res.cloudinary.com/dc6unffgo/image/upload/v1643384582/lptest/519-5191205_logo-pro-construction-professional-construction-construction-company-logo_wm5xtl.png'
    },
    {
      name: 'Turner',
      src: 'https://res.cloudinary.com/dc6unffgo/image/upload/v1643384581/lptest/images_xkszg5.png'
    }
  ];
  const modelOptionKeys = Object.keys(modelOptions);
  const [activeColor, setActiveColor] = useState('ffffff');
  const [activeLogo, setActiveLogo] = useState(logoList[0].src);
  const [activeTexture, setActiveTexture] = useState({
    prev: null,
    current: modelOptions[modelOptionKeys?.[0]]
  });
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

  const updateTexture = (e) => {
    const updateToTexture = e.currentTarget.getAttribute('data-texture');

    if (activeTexture?.current?.textureMapName != updateToTexture) {
      setActiveTexture({
        ...activeTexture,
        current: modelOptions?.[updateToTexture]
      });
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
            activeTexture={activeTexture}
            setActiveTexture={setActiveTexture}
          />
        </div>
        <div className={styles.configuratorSection}>
          <section className={styles.configuratorTileContainer}>
            <h3 className={styles.tileHeader}>Brim Style:</h3>
            <div className={styles.tileGroup}>
              {modelOptionKeys.map((optionKey) => {
                const option = modelOptions[optionKey];
                return (
                  <button
                    key={option?.textureMapName}
                    className={cl(styles.tile, {
                      [styles.tileSelected]:
                        activeTexture?.current?.textureMapName ===
                        option?.textureMapName
                    })}
                    onClick={updateTexture}
                    data-texture={option?.textureMapName}
                  >
                    <span className={cl(styles.tileText)}>
                      {option?.optionName}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
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
              {logoList.map((logo) => (
                <button
                  key={logo.name}
                  className={cl(styles.tile, {
                    [styles.tileSelected]: activeLogo === logo.src
                  })}
                  onClick={updateLogo}
                  data-logo={logo.src}
                >
                  <span className={styles.logoBox}>
                    <img
                      className={styles.logoImage}
                      alt={logo.name}
                      src={logo.src}
                    />
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
