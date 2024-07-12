import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const PurchaseList = lazy(() => import("../components/PurchaseList"));

const PurchaseListPage = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <PurchaseList />
            </Suspense>
            
        </div>
    );
};

export default PurchaseListPage;