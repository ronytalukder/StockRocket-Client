import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Registration from './components/Users/Registration'
import Login from './components/Users/Login'
import ForgotPassword from './components/Users/ForgotPassword'
import OtpVerify from './components/Users/OtpVerify'
import NewPassword from './components/Users/NewPassword'
import { getAuthToken } from './helper/SessionHelper'
import Masterlayout from './components/Layout/Masterlayout'

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
          element: <h1>Customer-create-update</h1>,
        },
        {
          path: "/customer-create-update/:id",
          element: <h1>Customer-create-update</h1>,
        },
        {
          path: "/customer-list",
          element: <h1>Customer-list</h1>,
        },
    
        {
          path: "/supplier-create-update",
          element: <h1>Supplier</h1>,
        },
        {
          path: "/supplier-create-update/:id",
          element: <h1>Supplier</h1>,
        },
        {
          path: "/supplier-list",
          element: <h1>Supplier-list</h1>,
        },
    
        {
          path: "/expense-type-create-update",
          element: <h1>Expense</h1>,
        },
        {
          path: "/expense-type-create-update/:id",
          element: <h1>Expense</h1>,
        },
        {
          path: "/expense-type-list",
          element: <h1>Expense-list</h1>,
        },
        {
          path: "/expense-create-update",
          element: <h1>Expense</h1>,
        },
        {
          path: "/expense-create-update/:id",
          element: <h1>Expense-update</h1>,
        },
        {
          path: "/expense-list",
          element: <h1>Expense-list</h1>,
        },
        {
          path: "/brand-create-update",
          element: <h1>Brand</h1>,
        },
        {
          path: "/brand-create-update/:id",
          element: <h1>Brand-update</h1>,
        },
        {
          path: "/brand-list",
          element: <h1>Brand-list</h1>,
        },
        {
          path: "/category-create-update",
          element: <h1>Category</h1>,
        },
        {
          path: "/category-create-update/:id",
          element: <h1>Category-update</h1>,
        },
        {
          path: "/category-list",
          element: <h1>Category-list</h1>,
        },
        {
          path: "/product-create-update",
          element: <h1>Product</h1>,
        },
        {
          path: "/product-create-update/:id",
          element: <h1>Product-update</h1>,
        },
        {
          path: "/product-list",
          element: <h1>Product-list</h1>,
        },
        {
          path: "/purchase-create-update",
          element: <h1>Purchase</h1>,
        },
        {
          path: "/purchase-list",
          element: <h1>Purchase-list</h1>,
        },
        {
          path: "/sale-create-update",
          element: <h1>Sale</h1>,
        },
        {
          path: "/sale-list",
          element: <h1>Sale-list</h1>,
        },
        {
          path: "/return-create-update",
          element: <h1>Return</h1>,
        },
        {
          path: "/return-list",
          element: <h1>Return-list</h1>,
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
