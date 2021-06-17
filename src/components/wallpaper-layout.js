import * as React from 'react';

import Layout from './layout';

import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';

const WallpaperLayout = ({ ...rest }) => {
  return (
    <Layout>
      <Wallpaper {...rest} />
    </Layout>
  );
};

export default WallpaperLayout;

function Wallpaper({ maxHeight = '90vh', dynamic, dynamicData, children }) {
  // if (dynamic) {
  //   return (
  //     <div style={{ display: 'grid' }}>
  //       <GatsbyImage
  //         style={{
  //           gridArea: '1/1',
  //           maxHeight,
  //           // marginTop: 70,
  //         }}
  //         image={dynamicData}
  //         src="" // marked as required, but useless
  //         alt=""
  //         layout="fullWidth"
  //       />
  //       <div
  //         style={{
  //           gridArea: '1/1',
  //           position: 'relative',
  //           placeItems: 'center',
  //           display: 'grid',
  //         }}
  //       >
  //         {children}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div style={{ display: 'grid' }}>
      <StaticImage
        style={{
          gridArea: '1/1',
          maxHeight,
          // marginTop: 70,
        }}
        layout="fullWidth"
        alt=""
        src={'../images/background.jpg'}
        // formats={['auto', 'webp', 'avif']}
      />
      <div
        style={{
          gridArea: '1/1',
          position: 'relative',
          placeItems: 'center',
          display: 'grid',
        }}
      >
        {children}
      </div>
    </div>
  );
}
