import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const ReturnCreate = lazy(() => import("../components/ReturnCreate"));


const ReturnCreatePage = () => {
    return (
        <div>
             <Suspense fallback={<Loader></Loader>}>
        <ReturnCreate></ReturnCreate>
      </Suspense>
        </div>
    );
};

export default ReturnCreatePage;