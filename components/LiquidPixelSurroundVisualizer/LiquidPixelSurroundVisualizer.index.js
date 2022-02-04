/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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

const LiquidPixelSurroundVisualizer = ({
  activeColor,
  activeLogo,
  activeTexture
}) => {
  const [prevTextureName, setPrevTextureName] = useState(null);

  useEffect(() => {
    loadSurround(() => {
      if (
        viewer &&
        activeTexture?.current?.textureMapName === prevTextureName
      ) {
        viewer.updateTextureMap({
          [activeTexture?.current
            ?.textureMapName]: `set=color[%23${activeColor}]&set=logo[${activeLogo}]&call=url[${activeTexture?.current?.chain}],&sink=format[png]`
        });
      }

      if (viewer && activeTexture?.current?.textureMapName != prevTextureName) {
        console.log('viewer reset: ', activeTexture);
        viewer.reset({
          model: activeTexture?.current?.model,
          textureMap: {
            [activeTexture?.current
              ?.textureMapName]: `set=color[%23${activeColor}]&set=logo[${activeLogo}]&call=url[${activeTexture?.current?.chain}]&sink=format[webp]`
          }
        });
      }

      if (!prevTextureName && !viewer) {
        const { com } = window;
        viewer = new com.liquidpixels.Surround(`.${lpClassName}`, {
          server: 'homedepot.liquifire.com',
          uri: 'homedepot',
          model: activeTexture?.current?.model,
          textureMap: {
            [activeTexture?.current
              ?.textureMapName]: `set=color[%23${activeColor}]&set=logo[${activeLogo}]&call=url[${activeTexture?.current?.chain}],&sink=format[png]`
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
      }

      setPrevTextureName(activeTexture?.current?.textureMapName);
    });
  }, [activeColor, activeLogo, activeTexture]);

  return (
    <>
      <div className={cl(lpClassName, styles.surroundContainer)} />
    </>
  );
};

export default LiquidPixelSurroundVisualizer;
