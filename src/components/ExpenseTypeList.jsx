import { useEffect, useState } from "react";
import { ExpenseTypeDeleteApi, ListExpenseTypeApi } from "../API/ExpenseTypeApi";
import { useSelector } from "react-redux";
import { deleteAleart } from "../helper/AlertHelper";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import moment from "moment";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ExpenseTypeList = () => {
    let [searchKeyword, setSearchKeyword] = useState("null")
    let [perPage, setPerPage] = useState(5)

    useEffect(() => {
        ListExpenseTypeApi(1, perPage, searchKeyword)
    }, [])


    const allExpenseType = useSelector((state) => state.expenseType.expenseTypes)
    console.log(allExpenseType)
    const total = useSelector((state) => state.expenseType.list[0]?.count)


    // Pagination Start=================

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
       setCurrentPage(pageNumber);
       ListExpenseTypeApi(pageNumber, perPage, searchKeyword)
    }

    const handlePerPage=(e)=>{
        setPerPage(parseInt(e.target.value))
        setCurrentPage(1)
        ListExpenseTypeApi(1, parseInt(e.target.value), searchKeyword)
    }

    const handleSearchValue=(e)=>{
        setSearchKeyword(e.target.value)
        if(e.target.value.length===0){
            setSearchKeyword("null")    
            ListExpenseTypeApi(currentPage, perPage, "null")
        }
    }

    const handleSearch = ()=>{
        ListExpenseTypeApi(1, perPage, searchKeyword)
        setCurrentPage(1)
    }

    
    // Pagination Edn=================


    const deleteExpenseType = async (id)=>{
      let result = await deleteAleart()
      if(result.isConfirmed){
        let reusult = await ExpenseTypeDeleteApi(id)
        if(reusult===true){
          const updateToal = total - 1
          const updatePageNubmer = Math.ceil(updateToal/perPage) < currentPage?currentPage-1:currentPage
          ListExpenseTypeApi(updatePageNubmer, perPage, searchKeyword)
          setCurrentPage(updatePageNubmer)
        }
      }

    }
    return (
        <div>

        {/* =============== Header Start =============== */}
        <div className="bg-purple-500 p-4 flex justify-between items-center mb-5 mt-3">
          <h1 className="text-white font-bold text-3xl">Expense Type List</h1>
  
          <div className="flex gap-5 items-center">
            <div>
              <select onChange={handlePerPage} className="select select-primary w-full max-w-xs">
                <option value="5">5 Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="20">20 Per Page</option>
                <option value="30">30 Per Page</option>
              </select>
            </div>
  
            <div className="w-[400px] flex gap-2">
              <input onChange={handleSearchValue} type="text"  placeholder="Search..."  className="input input-primary w-full max-w-xs" />
              <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
  
            <div>
              <Link to="/expense-type-create-update" className="btn btn-warning">Create Expense Type</Link>
            </div>
          </div>
        </div>
        {/* =============== Header End =============== */}
  
  
      {/* =============== Table Start =============== */}
  
      <table className="min-w-full bg-white mb-5">
                  <thead className="bg-purple-600 text-white">
                      <tr>
                          <th className="w-1/12 py-2 px-4 text-left">No</th>
                          <th className="w-2/12 py-2 px-4 text-left">Expense Type Name</th>
                          <th className="w-2/12 py-2 px-4 text-left">Created at</th>
                          <th className="w-1/12 py-2 px-4 text-left">Action</th>
                      </tr>
                  </thead>
  
                  <tbody>
  
                      {
                          allExpenseType?.map((expenseType, i) => {
  
                              return(
                              <tr key={i} className="bg-gray-100 border-b">
                                  <td className="py-2 px-4">{(currentPage-1)*perPage+i+1}</td>
                                  <td className="py-2 px-4">{expenseType.name}</td>
                                  <td className="py-2 px-4">{moment(expenseType.createdDate).format("DD-MM-YYYY")}</td>
                                  <td className="py-2 px-4">
                                  <button className=" text-white px-2 py-1 rounded flex items-center gap-2 justify-end">
                                  <Link to={`/expense-type-create-update/${expenseType._id}`} ><CiEdit className="text-[35px] text-purple-600" /></Link>
                                  <MdDeleteForever onClick={() => deleteExpenseType(expenseType._id)} className="text-4xl text-red-500" />
                                  </button>
                                  </td>
                              </tr>
                              )
                          })
                      }    
                      
                  </tbody>
  
              </table>
  
      {/* ===============Table End =============== */}
  
      {/* ===============Pagination Start =============== */}
      
      <ResponsivePagination
      current={ currentPage }
      total={Math.ceil(total/perPage)}
      onPageChange={handlePageChange}>
  
      </ResponsivePagination>
  
      {/* ===============Pagination End =============== */}
  
  
      
  
      </div>
    );
};

export default ExpenseTypeList;