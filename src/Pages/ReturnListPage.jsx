import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const ReturnList = lazy(() => import("../components/ReturnList"));
const ReturnListPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <ReturnList></ReturnList>
      </Suspense>
    </div>
  );
};

export default ReturnListPage;
