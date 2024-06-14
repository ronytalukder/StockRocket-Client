import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const CustomerCreateUpdate = lazy(() => import("../components/CustomerCreateUpdate"));

const CustomerCreateUpdatePage = () => {
    return (
        <div>
                <Suspense fallback={<Loader />}>
                    <CustomerCreateUpdate></CustomerCreateUpdate>
                </Suspense>
        </div>
    );
};

export default CustomerCreateUpdatePage;