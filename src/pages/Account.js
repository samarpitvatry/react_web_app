import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { FaRegEye, FaSearch, FaSearchPlus, FaRegEdit, FaEdit } from 'react-icons/fa'; // Import the icon from Font Awesome
import { useNavigate } from 'react-router-dom';


export const Account = () => {
    const [accountName, setAccountName] = useState('');
    const [ebNumber, setEbNumber] = useState('');
    const [status, setStatus] = useState('Active');
    const [accountType, setAccountType] = useState('EB');
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleDetailClick = (accountId) => {
        // This function will navigate to the AccountDetails page when called
        navigate(`/account/details/${accountId}`);

    };
    const handleEditClick = (accountId) => {
        // Logic for handling click event, like setting state or routing to a detail
    };


    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            let baseURL = 'https://ords1.qa.btcitest.com/ords/coss/coss/accounts/list';
            //let baseURL = 'http://qa1boskube11.qa.btcitest.com:30500/ords/coss/coss/accounts/list'; //APIGateway URL
            let params = [];

            if (accountName) {
                params.push('accountname=' + encodeURIComponent(accountName));
            }
            if (ebNumber) {
                params.push('ebnumber=' + encodeURIComponent(ebNumber));
            }
            if (status) {
                params.push('status=' + encodeURIComponent(status));
            }
            if (accountType) {
                params.push('accounttype=' + encodeURIComponent(accountType));
            }
            if (city) {
                params.push('city=' + encodeURIComponent(city));
            }
            if (province) {
                params.push('province=' + encodeURIComponent(province));
            }
            if (postalCode) {
                params.push('postalcode=' + encodeURIComponent(postalCode));
            }
            if (country) {
                params.push('country=' + encodeURIComponent(country));
            }
            if (page > 1) {
                params.push('page=' + page);
            }
            let url = baseURL;
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            const response = await fetch(url);
            const result = await response.json();
            setData(result.items);
            setPaginationLinks({
                first: result.first?.$ref,
                next: result.next?.$ref,
                prev: result.prev?.$ref
            });
            setMessage('');
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Error fetching data. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="filter-container">
                {/* Account Name Filter */}
                <div className="filter-column">
                    <div className="filter-item">
                        <label className="filter-label">Account Name</label>
                        <input
                            type="text"
                            value={accountName}
                            onChange={e => setAccountName(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* EB Number Filter */}
                    <div className="filter-item">
                        <label className="filter-label">EB Number</label>
                        <input
                            type="text"
                            value={ebNumber}
                            onChange={e => setEbNumber(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="filter-item">
                        <label className="filter-label">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="filter-input"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="">All</option>
                        </select>
                    </div>

                    {/* Account Type Filter */}
                    <div className="filter-item">
                        <label className="filter-label">Account Type</label>
                        <select
                            value={accountType}
                            onChange={e => setAccountType(e.target.value)}
                            className="filter-input"
                        >
                            <option value="EB">Account</option>
                            <option value="JV">JV</option>
                            <option value="CH">CH</option>
                        </select>
                    </div>
                </div>

                {/* City Filters */}
                <div className="filter-column">
                    {/* City Filter */}
                    <div className="filter-item">
                        <label className="filter-label">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* State/ Province Filter */}
                    <div className="filter-item">
                        <label className="filter-label">State / Province</label>
                        <input
                            type="text"
                            value={province}
                            onChange={e => setProvince(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* ZIP/ Postal Code Filter */}
                    <div className="filter-item">
                        <label className="filter-label">ZIP / Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* Country Filter */}
                    <div className="filter-item">
                        <label className="filter-label">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className="filter-input"
                        />
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

            {/* Message display */}
            {message && <p>{message}</p>}

            {/* Loading Indicator */}
            {loading && (
                <div className="loading-spinner">
                    <ReactLoading type="cylon" color="#5514B4" height={60} width={60} /> {/*type: bars,spin,cylon, bubbles */}
                </div>
            )}


            {/* Data Table */}
            {!loading && data.length > 0 && (
                <table className="table table-striped table-hover" style={{ width: "auto", tableLayout: "auto" }}>
                    <thead>
                    <tr>
                        <th>Action</th>  {/*"Details" column header */}
                        <th>Account ID</th>
                        <th>Account Name</th>
                        <th>EB Number</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.accountid}>
                            <td className="icon-cell">
                                <FaSearchPlus className="detail-icon clickable-icon" onClick={() => handleDetailClick(item.accountid)} />
                                <span style={{ marginLeft: '6px' }}> {/* Add a span with a margin for spacing */}
                                    <FaEdit className="edit-icon clickable-icon" onClick={() => handleEditClick(item.accountid)} />
                                </span>
                            </td>
                            <td>{item.accountid}</td>
                            <td>{item.accountname}</td>
                            <td>{item.ebnumber}</td>
                            <td>{item.callcenter}</td>
                            <td>{item.city}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};