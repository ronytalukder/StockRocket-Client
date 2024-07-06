import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const ExpenseTypeList = lazy(() => import("../components/ExpenseTypeList"));

const ExpenseTypeListPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <ExpenseTypeList />
      </Suspense>
    </div>
  );
};

export default ExpenseTypeListPage;
