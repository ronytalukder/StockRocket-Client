import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const PurchaseCreate = lazy(() => import("../components/PurchaseCreate"));
const PurchaseCreatePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <PurchaseCreate />
      </Suspense>
    </div>
  );
};

export default PurchaseCreatePage;
