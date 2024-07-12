import { lazy, Suspense } from "react";
import Loader from "../components/Loader";


const CategoryList = lazy(() => import("../components/CategoryList"));


const CategoryListPage = () => {
    return (
        <div>
             <Suspense fallback={<Loader />}>
        <CategoryList></CategoryList>
      </Suspense>
        </div>
    );
};

export default CategoryListPage;