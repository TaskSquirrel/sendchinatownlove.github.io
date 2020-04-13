import * as React from 'react';
import { useEffect} from 'react'
import { useParams } from 'react-router-dom';
import HeroBanner from '../HeroBanner';
import Footer from '../Footer';
import { sampleMerchant } from './sample-merchant';
import StoreInfo from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import styles from './styles.module.scss';
import { getSeller } from '../../utilities/api'

const MerchantPage: React.SFC = () => {
  // creates global name variable
  let { id } = useParams();

  console.log('MerchantPage.tsx', { id });

  // TO DO: implement component async pattern for api dep/loading state
  useEffect(() => {
    // Update the document title using the browser API
    getSeller()
  }, []);

  const storeInfoProps = {
    ...sampleMerchant.storeInfo,
    storeDetailsProps: {
      storeStoryProps: {
        story: sampleMerchant.storeStory,
      },
      storeMenuProps: {
        menuItems: sampleMerchant.menuItems,
      },
    },
    className: styles.storeInfo,
  };
  return (
    <div>
      <main className={styles.container}>
        <HeroBanner />
        <div className={styles.contentContainer}>
          <StoreInfo {...storeInfoProps} />
          <OwnerPanel
            className={styles.ownerPanel}
            {...sampleMerchant.ownerInfo}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MerchantPage;
