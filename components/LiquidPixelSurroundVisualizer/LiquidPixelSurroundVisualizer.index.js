import { useEffect } from 'react';
import cl from 'classnames';
// getScript will be used from @gcc/autobahn-utilities in gcc-autobahn-frontend
import { getScript } from '../../util/getScript';

import styles from '../../styles/LiquidPixelVisualizer.module.css';

const lpClassName = 'surroundViewer';
let surroundLoading = false;
let viewer;

const loadSurround = (callback) => {
  const { com } = window;
  if (!com?.liquidpixels?.Surround && !surroundLoading) {
    surroundLoading = true;
    getScript(
      'https://assets.codepen.io/t-2371/com.liquidpixels.Surround.js'
    ).then(() => {
      callback?.();
    });
  } else if (com?.liquidpixels?.Surround) {
    callback?.();
  }
};

const LiquidPixelSurroundVisualizer = ({ activeColor, activeLogo, chain }) => {
  useEffect(() => {
    loadSurround(() => {
      if (!viewer) {
        const { com } = window;
        viewer = new com.liquidpixels.Surround(`.${lpClassName}`, {
          server: 'homedepot.liquifire.com',
          uri: 'homedepot',
          model: 'https://assets.codepen.io/t-2371/homedepot-helmet-9362.glb',
          textureMap: {
            Helmet_9362: `set=color[%23${activeColor}]&set=logo[${activeLogo}]&call=url[${chain}],&sink=format[png]`
          },
          lighting: [
            {
              type: 'point',
              color: '#ffffff',
              intensity: 1,
              distance: 0,
              decay: 1,
              castShadow: true,
              position: {
                x: 0,
                y: 0,
                z: 0
              }
            }
          ],
          renderer: {
            hidpi: true
          },
          handleEvent: function (eventName, data) {
            if (eventName === 'loaded') {
              (() => {
                console.log('loaded: ', data);
              })();
            }
          }
        });
      } else {
        viewer.updateTextureMap({
          Helmet_9362: `set=color[%23${activeColor}]&set=logo[${activeLogo}]&call=url[${chain}],&sink=format[png]`
        });
      }
    });
  }, [activeColor, activeLogo, chain]);

  return (
    <>
      <div className={cl(lpClassName, styles.surroundContainer)} />
    </>
  );
};

export default LiquidPixelSurroundVisualizer;
