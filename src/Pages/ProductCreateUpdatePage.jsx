import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const ProductCreateUpdate = lazy(() => import("../components/ProductCreateUpdate"));

const ProductCreateUpdatePage = () => {
    return (
        <div>
        <Suspense fallback={<Loader></Loader>}>
        <ProductCreateUpdate />
      </Suspense>
        </div>
    );
};

export default ProductCreateUpdatePage;