import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const CategoryCreateUpdate = lazy(() =>
  import("../components/CategoryCreateUpdate")
);

const CategoryCreateUpdatePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CategoryCreateUpdate></CategoryCreateUpdate>
      </Suspense>
    </div>
  );
};

export default CategoryCreateUpdatePage;
