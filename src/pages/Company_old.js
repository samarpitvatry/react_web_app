import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import {FaEdit, FaRegEye, FaSearchPlus} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export const Company = () => {
    const [companyId, setCompanyId] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [legalEntityId, setLegalEntityId] = useState('');
    const [companygroup, setCompanyGroup] = useState('');
    const [reseller, setReseller] = useState('');
    const [partnership, setPartnership] = useState('');
    const [brandname, setBrandname] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState({});
    const navigate = useNavigate();


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
            setPaginationLinks({ // Update the pagination state
                next: result.next?.$ref,
                prev: result.prev?.$ref
            });
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
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Company ID</label>
                        <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Company Code</label>
                        <input type="text" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Legal Entity ID</label>
                        <input type="text" value={legalEntityId} onChange={(e) => setLegalEntityId(e.target.value)} className="filter-input"/>
                    </div>

                </div>

                <div className="filter-column">
                    <div className="filter-item">
                        <label className="filter-label">Company Group</label>
                        <input type="text" value={companygroup} onChange={(e) => setCompanyGroup(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Reseller</label>
                        <input type="text" value={reseller} onChange={(e) => setReseller(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Partnership</label>
                        <input type="text" value={partnership} onChange={(e) => setPartnership(e.target.value)} className="filter-input"/>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">Brand Name</label>
                        <input type="text" value={brandname} onChange={(e) => setBrandname(e.target.value)} className="filter-input"/>
                    </div>

                </div>

                {/* Search Button */}
                <div className="filter-item">
                    <button
                        className="search-button"
                        onClick={() => {
                            setCurrentPage(1);
                            fetchData(1);
                        }}
                        disabled={loading}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Pagination controls */}
            <div style={{ margin: '10px 0' }}>
                <button
                    className="navigation-button"
                    onClick={() => fetchData(currentPage - 1).then(() => setCurrentPage(prev => prev - 1))}
                    disabled={!paginationLinks.prev}
                >
                    Previous
                </button>
                <span style={{ margin: '0 12px', color: 'black', fontSize: '15px' }}>Page {currentPage}</span>
                <button
                    className="navigation-button"
                    onClick={() => fetchData(currentPage + 1).then(() => setCurrentPage(prev => prev + 1))}
                    disabled={!paginationLinks.next}
                >
                    Next
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="loading-spinner">
                    <ReactLoading type="cylon" color="#5514B4" height={60} width={60} /> {/*type: bars,spin,cylon, bubbles */}
                </div>
            )}


            {/* Data Table */}
            <div>
                {!loading && data.length > 0 &&
                    <table className="table table-striped table-hover" style={{ width: "auto", tableLayout: "auto" }}>
                        <thead>
                        <tr>
                            <th>Action</th>
                            <th>Company ID</th>
                            <th>Company Code</th>
                            <th>Company Name</th>
                            <th>Legal Entity ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.company_id}>
                                <td className="icon-cell">
                                    <FaSearchPlus className="detail-icon clickable-icon" onClick={() => handleDetailClick(item.company_id)} />
                                    <span style={{ marginLeft: '6px' }}> {/* Add a span with a margin for spacing */}
                                        <FaEdit className="edit-icon clickable-icon" onClick={() => handleEditClick(item.company_id)} />
                                </span>
                                </td>
                                <td>{item.company_id}</td>
                                <td>{item.company_code}</td>
                                <td>{item.company_name}</td>
                                <td>{item.legal_entity_id}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }



            </div>
        </div>
    );
};