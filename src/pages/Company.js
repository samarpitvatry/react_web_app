import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import {FaEdit, FaRegEye, FaSearchPlus} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const Company = () => {
    const [companyId, setCompanyId] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [legalEntityId, setLegalEntityId] = useState('');
    const [companygroup, setCompanyGroup] = useState('');
    const [reseller, setReseller] = useState('');
    const [partnership, setPartnership] = useState('');
    const [brandname, setBrandname] = useState('');
    const [status, setStatus] = useState('Active');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    // For tracking the current page
    const [currentPage, setCurrentPage] = useState(1);

    const resetFilters = () => {
        setCompanyId('');
        setCompanyCode('');
        setCompanyName('');
        setLegalEntityId('');
        setCompanyGroup('');
        setReseller('');
        setPartnership('');
        setBrandname('');
        setStatus('Active');
        setData([]);// Reset Table data
        // Add any other states that need resetting
    };



    const onPageChange = (event) => {
        // event.first is the index of the first record
        // event.rows is the number of rows to display
        const newPage = event.first / event.rows + 1;  // Calculate the new page number
        setCurrentPage(newPage);
        fetchData(newPage);
    };


    const fetchData = async (page = 1) => {
        setLoading(true);
        let baseURL = 'https://ords1.qa.btcitest.com/ords/coss/coss/company/list';
        let params = [];

        if (companyId) {
            params.push('company_id=' + encodeURIComponent(companyId));
        }
        if (companyCode) {
            params.push('company_code=' + encodeURIComponent(companyCode));
        }
        if (companyName) {
            params.push('company_name=' + encodeURIComponent(companyName));
        }
        if (legalEntityId) {
            params.push('legal_entity_id=' + encodeURIComponent(legalEntityId));
        }
        if (status && status !== 'All') {
            params.push('status=' + encodeURIComponent(status));
        }

        if (page > 1) {  // Add page number to params for pagination
            params.push('page=' + page);
        }

        try {
            const response = await fetch(`${baseURL}?${params.join('&')}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            setData(result.items);

        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDetailClick = (companyId) => {
        navigate(`/company/detail/${companyId}`);
    };

    const handleEditClick = (accountId) => {
        navigate(`/company/edit/${companyId}`);

    };


    return (
        <div>
            {/* Filter Container */}
            <div className="filter-container">
                <div className="filter-column">
                    <div className="filter-item">
                        <label className="filter-label">Company Name</label>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                               className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Company ID</label>
                        <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)}
                               className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Company Code</label>
                        <input type="text" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)}
                               className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="filter-input"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="All">All</option>
                        </select>
                    </div>

                </div>

                <div className="filter-column">
                    <div className="filter-item">
                        <label className="filter-label">Legal Entity ID</label>
                        <input type="text" value={legalEntityId} onChange={(e) => setLegalEntityId(e.target.value)}
                               className="filter-input"/>
                    </div>
                    {/* <div className="filter-item">
                        <label className="filter-label">Reseller</label>
                        <input type="text" value={reseller} onChange={(e) => setCompanyCode(e.target.value)}
                               className="filter-input"/>
                    </div> */}
                    <div className="filter-item">
                        <label className="filter-label">Company Group</label>
                        <input type="text" value={companygroup} onChange={(e) => setCompanyId(e.target.value)}
                               className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Partnership</label>
                        <input type="text" value={partnership} onChange={(e) => setCompanyName(e.target.value)}
                               className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Brand Name</label>
                        <input type="text" value={brandname} onChange={(e) => setLegalEntityId(e.target.value)}
                               className="filter-input"/>
                    </div>

                </div>

                {/* Search/Clear Button */}
                <div className="filter-item">
                    <button
                        className="search-button"
                        onClick={() => {
                            fetchData(1);
                        }}
                        disabled={loading}
                    >
                        Search
                    </button>
                    <button
                        className="clear-button"
                        onClick={resetFilters}
                    >
                        Clear
                    </button>
                </div>
            </div>


            {/* Loading Indicator */}
            {loading && (
                <div className="loading-spinner">
                    <ReactLoading type="cylon" color="#5514B4" height={60} width={60} /> {/*type: bars,spin,cylon, bubbles */}
                </div>
            )}


            {/* Data Table */}
            <div>
                {/* Data Table replaced with PrimeReact DataTable */}
                <div className="datatable-container">
                    {!loading && data.length > 0 &&
                        <DataTable value={data}
                                   paginator rows={10}
                                   paginator className="table"
                                   first={first} rows={rows}
                                   onPage={(e) => { setFirst(e.first); setRows(e.rows); }}
                            //onPage={onPageChange}
                                   rowClassName={rowData => ({'p-datatable-striped': rowData, 'p-datatable-hover': rowData, 'p-datatable-custom': rowData})}
                                   paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
                                   rowsPerPageOptions={[10, 25, 50, 100]}
                                   tableStyle={{ minWidth: '60rem',  width: "auto", tableLayout: "auto" }}

                        >

                            <Column body={(rowData, column) =>
                                <React.Fragment>
                                    <button className="icon-button"
                                            onClick={() => handleDetailClick(rowData.company_id)}>
                                        <FaSearchPlus/>
                                    </button>
                                    <button className="icon-button"
                                            onClick={() => handleEditClick(rowData.company_id)}>
                                        <FaEdit/>
                                    </button>
                                </React.Fragment>
                            } header="Action"></Column>
                            <Column field="company_id" header="Company ID"></Column>
                            <Column field="company_code" header="Company Code"></Column>
                            <Column field="company_name" header="Company Name"></Column>
                            <Column field="legal_entity_id" header="Legal Entity ID"></Column>
                            <Column field="status" header="Status"></Column>
                        </DataTable>
                    }
                </div>



            </div>
        </div>
    );
};