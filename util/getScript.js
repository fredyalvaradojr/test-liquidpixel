// https://github.com/GCC-Autobahn/gcc-autobahn-frontend/blob/master/libraries/gcc-autobahn-utilities/src/get-script/index.js
export const getScript = (
  source,
  container = document.getElementsByTagName('head')[0]
) =>
  new Promise((resolve) => {
    let script = document.createElement('script');
    script.async = 1;
    script.onload = (_, isAbort) => {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;
        if (!isAbort) {
          resolve();
        }
      }
    };
    script.onreadystatechange = script.onload;
    script.src = source;
    container.appendChild(script);
  });

export default getScript;
