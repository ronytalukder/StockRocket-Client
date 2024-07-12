import  { lazy, Suspense } from 'react';
import Loader from '../components/Loader';


const BrandCreateUpdate = lazy(() => import('../components/BrandCreateUpdate'));
const BrandCreateUpdatePage = () => {
    return (
        <div>
        <Suspense fallback={<Loader></Loader>}>
          <BrandCreateUpdate />
        </Suspense>
      </div>
    );
};

export default BrandCreateUpdatePage;