import { AiOutlineUserAdd } from "react-icons/ai";
import { BsBagPlus, BsBagX, BsCartPlus, BsGraphUp } from "react-icons/bs";
import { FaRegCircle, FaUsersLine } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import {
  MdOutlineDirectionsBike,
  MdOutlineFormatListBulleted,
  MdSpaceDashboard,
} from "react-icons/md";
import { RiBox3Line, RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbCategoryPlus, TbTruckDelivery } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Masterlayout = () => {

    const sidebarItems = [

        {
          title: "Dashboard",
          icon: <MdSpaceDashboard className="text-2xl" />,
          url: "/",
          subMenu: [],
        }, 
        {
          title: "Customer",
          icon: <FaUsersLine className="text-2xl" />,
          url: "/customer",
          subMenu: [
            {
              title: "Create Customer",
              icon: <AiOutlineUserAdd className="text-xl" />,
              url: "/customer-create-update",
            },
            {
              title: "Customer List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/customer-list",
            },
          ],
        },
        {
          title: "Supplier",
          icon: <TbTruckDelivery className="text-2xl" />,
          url: "/supplier",
          subMenu: [
            {
              title: "Create Supplier",
              icon: <MdOutlineDirectionsBike className="text-xl" />,
              url: "/supplier-create-update",
            },
            {
              title: "Supplier List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/supplier-list",
            },
          ],
        },
        {
          title: "Expense",
          icon: <RiMoneyDollarCircleLine className="text-2xl" />,
          url: "/expense",
          subMenu: [
            {
              title: "Create Expense Type",
              icon: <FaRegCircle className="text-xl" />,
              url: "/expense-type-create-update",
            },
            {
              title: "Expense Type List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/expense-type-list",
            },
            {
              title: "Create Expense",
              icon: <IoCreateOutline className="text-xl" />,
              url: "/expense-create-update",
            },
            {
              title: "Expense List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/expense-list",
            },
          ],
        },
        {
          title: "Product",
          icon: <RiBox3Line className="text-2xl" />,
          url: "/product",
          subMenu: [
            {
              title: "Create Brand",
              icon: <FaRegCircle className="text-xl" />,
              url: "/brand-create-update",
            },
            {
              title: "Brand List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/brand-list",
            },
            {
              title: "Create Category",
              icon: <TbCategoryPlus className="text-xl" />,
              url: "/category-create-update",
            },
            {
              title: "Category List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/category-list",
            },
            {
              title: "Create Product",
              icon: <IoCreateOutline className="text-xl" />,
              url: "/product-create-update",
            },
            {
              title: "Product List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/product-list",
            },
          ],
        },
        {
          title: "Purchase",
          icon: <BsBagPlus className="text-2xl" />,
          url: "/purchase",
          subMenu: [
            {
              title: "Create Purchase",
              icon: <IoCreateOutline className="text-xl" />,
              url: "/purchase-create-update",
            },
            {
              title: "Purchase List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/purchase-list",
            },
          ],
        },
        {
          title: "Sale",
          icon: <BsCartPlus className="text-2xl" />,
          url: "/sale",
          subMenu: [
            {
              title: "Create Sale",
              icon: <IoCreateOutline className="text-xl" />,
              url: "/sale-create-update",
            },
            {
              title: "Sale List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/sale-list",
            },
          ],
        },
        {
          title: "Return",
          icon: <BsBagX className="text-2xl" />,
          url: "/Return",
          subMenu: [
            {
              title: "Create Return",
              icon: <IoCreateOutline className="text-xl" />,
              url: "/return-create-update",
            },
            {
              title: "Return List",
              icon: <MdOutlineFormatListBulleted className="text-xl" />,
              url: "/return-list",
            },
          ],
        },
        {
          title: "Report",
          icon: <BsGraphUp className="side-bar-item-icon" />,
          url: "/Report",
          subMenu: [
            {
              title: "Sale Report",
              icon: <FaRegCircle className="text-xl" />,
              url: "/sale-report",
            },
            {
              title: "Return Report",
              icon: <FaRegCircle className="text-xl" />,
              url: "/return-report",
            },
            {
              title: "Purchase Report",
              icon: <FaRegCircle className="text-xl" />,
              url: "/purchase-report",
            },
            {
              title: "Expense Report",
              icon: <FaRegCircle className="text-xl" />,
              url: "/expense-report",
            },
          ],
        },
      ];

  return (
    <div>
      <div className="min-h-screen flex justify-between pt-[20px] px-[20px]">
        <div className=" w-[22%] pb-[20px]">
          <div className="p-5 bg-purple-500 rounded-[50px]  h-full">
            <h1 className="text-4xl text-white text-center font-bold ">Logo</h1>


            {/* side menu start */}
                {
                    sidebarItems.map((item, i)=>{
                        return(
                            item.subMenu.length>0?
                            
                            <div key={i} className="collapse collapse-arrow mb-[-20px] ">
                                    <input type="checkbox" /> 
                                    <div className="collapse-title text-md font-medium flex items-center gap-2 text-white ">
                                        {item.icon} { item.title }
                                    </div>
                                    <div className="collapse-content z-[9999] mt-[-10px] pl-[40px]"> 
                                        {
                                            item.subMenu.map((item, i)=>{
                                                return(
                                                    <NavLink to={item.url} key={i} className={({ isActive }) => isActive ? "flex items-center gap-2 text-black  font-medium mb-2" : "mb-2 flex items-center gap-2 text-white font-medium"} > {item.icon} {item.title} </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            :
                            <NavLink to={item.url} key={i} className={({ isActive }) => isActive ? "flex items-center gap-2 text-black font-medium ml-4" : "flex items-center gap-2 text-white font-medium ml-4"} > {item.icon} {item.title} </NavLink>

                        )
                    })
                }

            {/* side menu end */}


          </div>

          
        </div>

        <div className=" w-[74%] p-5">
          <div className="flex justify-between items-center border-b border-purple-500 pb-5 mb-5 ">
            <h1 className="text-4xl text-purple-500 font-bold "> Stock Rocket</h1>
            <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src="https://www.shutterstock.com/image-photo/serious-successful-arabian-businessman-formal-260nw-1879913899.jpg"
                alt=""
              />
            </div>
          </div>

        {/* Outlet */}
          <Outlet></Outlet>
        </div>

      </div>
    </div>
  );
};

export default Masterlayout;
