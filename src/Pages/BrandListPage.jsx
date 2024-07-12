import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';


const BrandList = lazy(() => import('../components/BrandList'));
const BrandListPage = () => {
    return (
        <Suspense fallback={<Loader></Loader>}>
        <BrandList />
      </Suspense>
    );
};

export default BrandListPage;