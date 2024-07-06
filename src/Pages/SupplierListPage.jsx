import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const SupplierList = lazy(() => import("../components/SupplierList"));
const SupplierListPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <SupplierList></SupplierList>
      </Suspense>
    </div>
  );
};

export default SupplierListPage;
