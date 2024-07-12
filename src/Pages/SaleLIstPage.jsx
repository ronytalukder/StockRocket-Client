import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const SaleLIst = lazy(() => import("../components/SaleLIst"));

const SaleLIstPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <SaleLIst></SaleLIst>
      </Suspense>
    </div>
  );
};

export default SaleLIstPage;
