import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const SalesCreate = lazy(() => import("../components/SalesCreate"));
const SalesCreatePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <SalesCreate></SalesCreate>
      </Suspense>
    </div>
  );
};

export default SalesCreatePage;
