import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const ExpenseTypeCreateUpdate = lazy(() => import("../components/ExpenseTypeCreateUpdate"));

const ExpenseTypeCreateUpdatePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <ExpenseTypeCreateUpdate />
      </Suspense>
    </div>
  );
};

export default ExpenseTypeCreateUpdatePage;
