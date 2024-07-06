import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const CustomerList = lazy(() => import("../components/CustomerList"));

const CustomerListPage = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                    <CustomerList></CustomerList>
                </Suspense>         
        </div>
    );
};

export default CustomerListPage;