import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Registration from './components/Users/Registration'
import Login from './components/Users/Login'
import ForgotPassword from './components/Users/ForgotPassword'
import OtpVerify from './components/Users/OtpVerify'
import NewPassword from './components/Users/NewPassword'
import { getAuthToken } from './helper/SessionHelper'
import Masterlayout from './components/Layout/Masterlayout'
import CustomerCreateUpdatePage from './Pages/CustomerCreateUpdatePage'
import CustomerListPage from './Pages/CustomerListPage'
import SupplierPage from './Pages/SupplierPage'
import SupplierListPage from './Pages/SupplierListPage'
import ExpenseTypeCreateUpdatePage from './Pages/ExpenseTypeCreateUpdatePage'
import ExpenseTypeListPage from './Pages/ExpenseTypeListPage'
import ExpenseCreateUpdatePage from './Pages/ExpenseCreateUpdatePage'
import ExpenseListPage from './Pages/ExpenseListPage'
import ProductCreateUpdatePage from './Pages/ProductCreateUpdatePage'
import ProductListPage from './Pages/ProductListPage'
import BrandCreateUpdatePage from './Pages/BrandCreateUpdatePage'
import BrandListPage from './Pages/BrandListPage'
import CategoryCreateUpdate from './components/CategoryCreateUpdate'
import CategoryListPage from './Pages/CategoryListPage'
import PurchaseCreatePage from './Pages/PurchaseCreatePage'
import PurchaseListPage from './Pages/PurchaseListPage'
import SaleLIstPage from './Pages/SaleLIstPage'
import SalesCreatePage from './Pages/SalesCreatePage'
import ReturnCreatePage from './Pages/ReturnCreatePage'
import ReturnListPage from './Pages/ReturnListPage'

function App() {


  const authenticRoutes = getAuthToken()?
  [
    {
      path : "/",
      element : <Masterlayout></Masterlayout> ,
      children: [
        {
          path: "/",
          element: <h1>Dashboard</h1>, 
        },
        {
          path: "/profile",
          element: <h1>Profile</h1>,
        },
        {
          path: "/customer-create-update",
          element: <CustomerCreateUpdatePage></CustomerCreateUpdatePage>,
        },
        {
          path: "/customer-create-update/:id",
          element: <CustomerCreateUpdatePage></CustomerCreateUpdatePage>,
        },
        {
          path: "/customer-list",
          element: <CustomerListPage></CustomerListPage>, 
        },
    
        {
          path: "/supplier-create-update",
          element: <SupplierPage></SupplierPage>,
        },
        {
          path: "/supplier-create-update/:id",
          element: <SupplierPage></SupplierPage>,
        },
        {
          path: "/supplier-list",
          element: <SupplierListPage></SupplierListPage>,
        },
    
        {
          path: "/expense-type-create-update",
          element: <ExpenseTypeCreateUpdatePage></ExpenseTypeCreateUpdatePage>,
        },
        {
          path: "/expense-type-create-update/:id",
          element: <ExpenseTypeCreateUpdatePage></ExpenseTypeCreateUpdatePage>,
        },
        {
          path: "/expense-type-list",
          element: <ExpenseTypeListPage></ExpenseTypeListPage>,
        },
        {
          path: "/expense-create-update",
          element: <ExpenseCreateUpdatePage></ExpenseCreateUpdatePage>,
        },
        {
          path: "/expense-create-update/:id",
          element: <ExpenseCreateUpdatePage></ExpenseCreateUpdatePage>,
        },
        {
          path: "/expense-list",
          element: <ExpenseListPage></ExpenseListPage>,
        },
        {
          path: "/brand-create-update",
          element: <BrandCreateUpdatePage></BrandCreateUpdatePage>,
        },
        {
          path: "/brand-create-update/:id",
          element: <BrandCreateUpdatePage></BrandCreateUpdatePage>,
        },
        {
          path: "/brand-list",
          element: <BrandListPage></BrandListPage>,
        },
        {
          path: "/category-create-update",
          element: <CategoryCreateUpdate></CategoryCreateUpdate>,
        },
        {
          path: "/category-create-update/:id",
          element: <CategoryCreateUpdate></CategoryCreateUpdate>,
        },
        {
          path: "/category-list",
          element: <CategoryListPage></CategoryListPage>,
        },
        {
          path: "/product-create-update",
          element: <ProductCreateUpdatePage></ProductCreateUpdatePage>,
        },
        {
          path: "/product-create-update/:id",
          element: <ProductCreateUpdatePage></ProductCreateUpdatePage>,
        },
        {
          path: "/product-list",
          element: <ProductListPage></ProductListPage>,
        },
        {
          path: "/purchase-create-update",
          element: <PurchaseCreatePage></PurchaseCreatePage>,
        },
        {
          path: "/purchase-list",
          element: <PurchaseListPage></PurchaseListPage>,
        },
        {
          path: "/sale-create-update",
          element: <SalesCreatePage></SalesCreatePage>,
        },
        {
          path: "/sale-list",
          element: <SaleLIstPage></SaleLIstPage>,
        },
        {
          path: "/return-create-update",
          element: <ReturnCreatePage></ReturnCreatePage>,
        },
        {
          path: "/return-list",
          element: <ReturnListPage></ReturnListPage>,
        },
        {
          path: "/sale-report",
          element: <h1>Sale</h1>,
        },
        {
          path: "/return-report",
          element: <h1>Return</h1>,
        },
        {
          path: "/purchase-report",
          element: <h1>Purchase</h1>,
        },
        {
          path: "/expense-report",
          element: <h1>Expense</h1>,
        },
        {
          path: "*",
          element: <h1>Not Found</h1>,
        },
      ],
    },
   
  ]
  :
  [
    {
      path : "/login",
      element : <Login></Login>
    },
    {
      path : "/registration",
      element : <Registration></Registration>
    },
    {
      path : "/forgot-password",
      element : <ForgotPassword></ForgotPassword>
    },
    {
      path : "/verify-otp",
      element : <OtpVerify></OtpVerify>
    },
    {
      path : "/create-new-password",
      element : <NewPassword></NewPassword>
    },
    {
      path : "*",
      element : <h1>Not Found</h1>
    },
  ]

  const router = createBrowserRouter (authenticRoutes)

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
