
import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { DeleteProductApi, ListProductsApi } from '../API/productApi';
import { useSelector } from 'react-redux';
import { deleteAleart } from '../helper/AlertHelper';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoCreate } from 'react-icons/io5';



const ProductList = () => {

    let [searchKeyword, setSearchKeyword] = useState("null");
    let [perPage , setPerPage] = useState(5);

    useEffect(() => {
        ListProductsApi(1, perPage, searchKeyword)
    }, [])

    const allProduct = useSelector((state) => state.product.products);
    const total = useSelector((state) => state.product.list[0]?.count);


    {/* =============== Pagination Start =============== */}
    
    // Handle Change Page
    const [currentPage, setCurrentPage] = useState( 1 );

    const handlePageChange = ( pageNumber ) => {
        setCurrentPage( pageNumber );
        ListProductsApi(pageNumber, perPage, searchKeyword)
    };

    // Handle Per Page 
    const handlePerPage = (e) => {
        setPerPage(e.target.value)
        ListProductsApi(1, e.target.value, searchKeyword)
    }

    // Handle Search Input
    const searchValue = (e) => {
        setSearchKeyword(e.target.value)

        if((e.target.value).length===0){
            setSearchKeyword(null)
            ListProductsApi(currentPage, perPage, "0")
        }
    }

    // Handle Search 
    const handleSearch = () => {
        ListProductsApi(1, perPage, searchKeyword)
     }

    {/* =============== Pagination End =============== */}


       {/* =============== Delete Start =============== */}
       const deleteExpense = async(id) =>{
        
        let result = await deleteAleart()
        if(result.isConfirmed){
           let result=  await DeleteProductApi(id)
           if(result===true){
            ListProductsApi (1, perPage, searchKeyword)
           }
        }
    }
    {/* =============== Delete End =============== */}


    


    return (
        <div>

            {/* =============== Header Start =============== */}
            <div className="bg-purple-500 p-4 flex justify-between items-center mb-5 mt-3">
            <h1 className="text-3xl font-medium text-white">Product List</h1>

                <div className="flex gap-5 items-center">
                    <div>
                        <select onChange={handlePerPage} className="select select-primary w-full max-w-xs">
                        <option value='5'>5 per page</option>
                        <option value='10'>10 per page</option>
                        <option value='20'>20 per page</option>
                        <option value='30'>30 per page</option>
                        </select>
                    </div>

                    <div className="w-[400px] flex gap-2">
                        <input onChange={searchValue} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
                        <button onClick={handleSearch} className="btn btn-warning text-black">Search</button>
                    </div>
                </div>
                    <div className="">
                        <Link to="/product-create-update" className="btn btn-error text-white  "> <IoCreate className='text-2xl mr-[-5px]'></IoCreate> Create Product</Link>
                    </div>

            </div>
            {/* =============== Header End =============== */}
            
            {/* =============== Table Start =============== */}
            <div className="overflow-x-auto">
                {
                allProduct.length>0 ?

                    <table className="table-auto min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#no</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {allProduct.map((product, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{currentPage * perPage - perPage + index + 1 }</td> 
                    <td className="px-6 py-4  border border-gray-200">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    {
                        product.images?.map((image, index) => (
                            <img key={index} src={image} alt="image" className="h-10 rounded-full" />
                        ))
                    }

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{product.brand[0]?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{product.category[0]?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{product.unit}</td>
                    <td className="px-6 py-4  border border-gray-200">{product.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{moment(product.createdDate).format("DD-MM-YYYY")}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                        <div className='flex gap-4 items-center'>
                            <Link to={`/product-create-update/${product._id}`}>
                                <FaEdit className='text-[22px] text-warning cursor-pointer'></FaEdit>
                            </Link>
                            <MdDeleteForever onClick={()=>deleteExpense(product._id)} className='text-[26px] text-error cursor-pointer'></MdDeleteForever>
                        </div>
                    </td>
                    </tr> 
                ))}
                </tbody>
            </table>

                    :
                <h1 className="text-center text-4xl text-red-500 my-12">No Data Found</h1>
                }
            
            </div>
            {/* =============== Table End =============== */}

            {/* =============== Pagination Header Start =============== */}
            <div className="bg-purple-500 p-4 flex justify-between items-center mb-5 mt-3">

            <ResponsivePagination
            current={currentPage}
            total={Math.ceil(total/perPage)}
            // total={100}
            onPageChange={handlePageChange}
            />

            </div>
            {/* =============== Pagination Header End =============== */}

        </div>
    );
};

export default ProductList;