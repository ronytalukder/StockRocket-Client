import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const SupplierCreateUpdate = lazy(() => import("../components/SupplierCreateUpdate"));

const SupplierPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <SupplierCreateUpdate></SupplierCreateUpdate>
      </Suspense>
    </div>
  );
};

export default SupplierPage;
