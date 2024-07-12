import { useEffect, useState } from "react";
import { DeleteSalesApi, ListSalesApi } from "../API/SalesApi";
import { useSelector } from "react-redux";
import { deleteAleart } from "../helper/AlertHelper";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

const SaleLIst = () => {


    let [searchKeyword, setSearchKeyword] = useState("null");
    let [perPage, setPerPage] = useState(5);

    useEffect(() => {
        ListSalesApi(1, perPage, searchKeyword)
    }, [perPage, searchKeyword]);

    const allSales = useSelector((state) => state.sale.sales);
    const total = useSelector((state) => state.sale.list[0]?.count);

 

    // Handle Change Page
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        ListSalesApi(pageNumber, perPage, searchKeyword);
    };

    // Handle Per Page 
    const handlePerPage = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(1);
        ListSalesApi(1, parseInt(e.target.value), searchKeyword);
    }

    // Handle Search Input
    const searchValue = (e) => {
        setSearchKeyword(e.target.value);
        if ((e.target.value).length === 0) {
            setSearchKeyword("null");
            ListSalesApi(currentPage, perPage, "null");
        }
    }

    // Handle Search 
    const handleSearch = () => {
        ListSalesApi(1, perPage, searchKeyword);
        setCurrentPage(1);
    }

    // Handle Delete 
    const deleteSale = async (id) => {
        let result = await deleteAleart();
        if (result.isConfirmed) {
            let deleteResult = await DeleteSalesApi(id);
            if (deleteResult === true) {
                const updatedTotal = total - 1;
                const updatedPageNumber = Math.ceil(updatedTotal / perPage) < currentPage ? currentPage - 1 : currentPage;
                ListSalesApi(updatedPageNumber, perPage, searchKeyword);
                setCurrentPage(updatedPageNumber);
            }
        }
    }

    return (
        <div>
            {/* =============== Header Start =============== */}
            <div className="bg-purple-500 p-4 flex justify-between items-center mb-5 mt-3">
                <h1 className="text-3xl font-medium text-white">Sales List</h1>
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
                    <div>
                        <Link to="/sale-create-update" className="btn btn-error text-white"> <IoCreate className='text-2xl mr-[-5px]'></IoCreate> Create Sale</Link>
                    </div>
                </div>
            </div>
            {/* =============== Header End =============== */}
            {/* =============== Table Start =============== */}
            <div className="overflow-x-auto">
                {
                    allSales.length > 0 ?
                        <table className="table-auto min-w-full divide-y divide-gray-200 border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">#no</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Grand Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Discount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Vat/Tax</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Shipping Cost</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Other Cost</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Short Note</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allSales.map((sale, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.customer[0].customerName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.grandTotal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.discount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.vatTax}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.shippingCost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.otherCost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{sale.details}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{moment(sale.createdDate).format("DD-MM-YYYY")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                                            <div className='flex gap-4 items-center'>
                                                <MdDeleteForever onClick={() => deleteSale(sale._id)} className='text-[26px] text-error cursor-pointer'></MdDeleteForever>
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
                    total={Math.ceil(total / perPage)}
                    onPageChange={handlePageChange}
                />
            </div>
            {/* =============== Pagination Header End =============== */}
        </div>
    );
};

export default SaleLIst;