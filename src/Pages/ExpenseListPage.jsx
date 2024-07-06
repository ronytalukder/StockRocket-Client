import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
const ExpenseList = lazy(() => import("../components/ExpenseList"));
const ExpenseListPage = () => {
    return (
        <div>
            
            <Suspense fallback={<Loader />}>
                <ExpenseList />
            </Suspense>
        </div>
    );
};

export default ExpenseListPage;