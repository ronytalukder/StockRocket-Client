import { Suspense, lazy } from 'react';
import Loader from '../components/Loader';

const ProductList = lazy(() => import('../components/ProductList'));



const ProductListPage = () => {
    return (
        <div>
            <Suspense fallback={<Loader></Loader>}>
                  <ProductList/>
             </Suspense>
        </div>
    );
};

export default ProductListPage;