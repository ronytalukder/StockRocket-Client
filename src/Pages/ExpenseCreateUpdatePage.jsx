import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const ExpenseCreateUpdate = lazy(() => import("../components/ExpenseCreateUpdate"));

const ExpenseCreateUpdatePage = () => {
    return (
        <div>
               <Suspense fallback={<Loader></Loader>}>
                <ExpenseCreateUpdate />
            </Suspense>
        </div>
    );
};

export default ExpenseCreateUpdatePage;