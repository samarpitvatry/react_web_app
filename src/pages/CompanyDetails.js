import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import '../styles/CompanyDetails.css';
import {FaChevronDown, FaEdit, FaSearchPlus} from 'react-icons/fa';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



const CompanyDetails = () => {
    const { companyId } = useParams();
    const [companyDetails, setCompanyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Site');
    const [isNotesExpanded, setIsNotesExpanded] = useState(false); // Make True to open Note section by default
    const [siteDetails, setSiteDetails] = useState([]);
    const [deviceDetails, setDeviceDetails] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const toggleNotes = () => {
        setIsNotesExpanded(!isNotesExpanded);
    };
    const [accountDetails, setAccountDetails] = useState([]);
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);


    };


    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://ords1.qa.btcitest.com/ords/coss/coss/company/detail/${companyId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCompanyDetails(data.items[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [companyId]);


    useEffect(() => {
        const fetchSiteDetails = async () => {
            if (activeTab === 'Site') {
                try {
                    setLoading(true);
                    const response = await fetch(`https://ords1.qa.btcitest.com/ords/coss/coss/company/detail/site/${companyId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setSiteDetails(data.items);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSiteDetails();
    }, [activeTab, companyId]);



    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                setLoading(true); // Set loading state
                const response = await fetch(`https://ords1.qa.btcitest.com/ords/coss/coss/company/detail/acc/${companyId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // If the activeTab is 'Account', set accountDetails
                if (activeTab === 'Account') {
                    setAccountDetails(data.items);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Reset loading state after fetching
            }
        };

        // Call fetchAccountDetails function
        fetchAccountDetails();
    }, [activeTab]); // Fetch details when activeTab changes



    useEffect(() => {
        const fetchDeviceDetails = async () => {
            if (activeTab === 'Device') {
                try {
                    setLoading(true);
                    const response = await fetch(`https://ords1.qa.btcitest.com/ords/coss/coss/company/detail/device/${companyId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setDeviceDetails(data.items);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDeviceDetails();
    }, [activeTab, companyId]);



    // Handle loading and error states
    if (!companyDetails) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#5514B4" height={70} width={70} />
            </div>
        );
    }
    if (error) return <div>Error: {error}</div>;

    // API structure for the company details
    const {
        company_name,
        company_code,
        company_id,
        legal_entity_id,
        system_id,
        production_notes,
        scheduling_notes,
        reservation_notes,
        general_notes,
    } = companyDetails;

    return (
        <div className="company-details-container">
            <header className="company-header">
                <h1>{company_name}</h1>
            </header>

            <div className="company-info-container">
                <div className="company-info-left">
                    <p><strong>Company Code:</strong> {company_code}</p>
                    <p><strong>Legal Entity ID:</strong> {legal_entity_id}</p>
                </div>
                <div className="company-info-right">
                    <p><strong>Company Number:</strong> {company_id}</p>
                    <p><strong>System ID:</strong> {system_id}</p>
                </div>
            </div>

            <div className="notes-section">
                <button className="notes-header" onClick={toggleNotes}>
                    <h2>Notes</h2>
                    {/* Include a chevron icon that rotates when clicked */}
                    <FaChevronDown className={`chevron ${isNotesExpanded ? 'expanded' : ''}`} />
                </button>
                {isNotesExpanded && (
                    <div className="notes-content">
                        <p title={production_notes}><strong>Production Notes:</strong> {production_notes}</p>
                        <p title={scheduling_notes}><strong>Scheduling Notes:</strong> {scheduling_notes}</p>
                        <p title={reservation_notes}><strong>Reservation Notes:</strong> {reservation_notes}</p>
                        <p title={general_notes}><strong>Onboarding / General Notes:</strong> {general_notes}</p>
                    </div>
                )}
            </div>

            <nav className="tab-nav">
                <ul>
                    <li className={activeTab === 'Site' ? 'active' : ''} onClick={() => handleTabClick('Site')}>Site
                    </li>
                    <li className={activeTab === 'Account' ? 'active' : ''}
                        onClick={() => handleTabClick('Account')}>Account
                    </li>
                    <li className={activeTab === 'Device' ? 'active' : ''}
                        onClick={() => handleTabClick('Device')}>Device
                    </li>
                    <li className={activeTab === 'Entitlement' ? 'active' : ''}
                        onClick={() => handleTabClick('Entitlement')}>Entitlement
                    </li>
                    <li className={activeTab === 'Person' ? 'active' : ''}
                        onClick={() => handleTabClick('Person')}>Person
                    </li>
                    {/*
                    <li className={activeTab === 'Service' ? 'active' : ''}
                        onClick={() => handleTabClick('Service')}>Service
                    </li>
                    <li className={activeTab === 'Phone' ? 'active' : ''}
                        onClick={() => handleTabClick('Phone')}>Phone
                    </li>
                    */}

                </ul>
            </nav>
            {/* Account Tab Content */}
            {
                activeTab === 'Account' && (
                    <DataTable value={accountDetails}
                               paginator className="table"
                               first={first} rows={rows}
                               rowClassName={rowData => ({'p-datatable-striped': rowData, 'p-datatable-hover': rowData, 'p-datatable-custom': rowData})}
                               onPage={(e) => { setFirst(e.first); setRows(e.rows); }}
                               rowsPerPageOptions={[10, 25, 50, 100]}
                               tableStyle={{ minWidth: '50rem' }}>
                        <Column body={(rowData, column) =>
                            <React.Fragment>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaSearchPlus/>
                                </button>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaEdit/>
                                </button>
                            </React.Fragment>
                        } header="Action" style={{ width: '90px'}}></Column>
                        <Column field="account_id" header="Account ID" ></Column>
                        <Column field="account_full_name" header="Account Full Name" ></Column>
                        <Column field="address" header="Address" ></Column>
                        <Column field="country" header="Country" ></Column>
                        <Column field="state" header="State" ></Column>
                        <Column field="city" header="City" ></Column>
                        <Column field="postal" header="Postal Code" ></Column>
                        <Column field="status" header="Status" ></Column>
                    </DataTable>
                )
            }

            {/* Site Tab Content */}
            {
                activeTab === 'Site' && (
                    <DataTable value={siteDetails}
                               paginator className="table"
                               first={first} rows={rows}
                               rowClassName={rowData => ({'p-datatable-striped': rowData, 'p-datatable-hover': rowData, 'p-datatable-custom': rowData})}
                               onPage={(e) => { setFirst(e.first); setRows(e.rows); }}
                               rowsPerPageOptions={[10, 25, 50, 100]}
                               tableStyle={{ minWidth: '50rem' }}>
                        <Column body={(rowData, column) =>
                            <React.Fragment>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaSearchPlus/>
                                </button>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaEdit/>
                                </button>
                            </React.Fragment>
                        } header="Action" style={{ width: '6%'}}></Column>
                        <Column field="site_id" header="Site ID" style={{ width: '10%' }}></Column>
                        <Column field="site_name" header="Site Name" style={{ width: '35%' }}></Column>
                        <Column field="type" header="Type" style={{ width: '15%' }}></Column>
                        <Column field="certified" header="Certified" style={{ width: '5%' }}></Column>
                        <Column field="certified_date" header="Certified Date" style={{ width: '10%' }}></Column>
                        <Column field="watch" header="Watch" style={{ width: '5%' }}></Column>
                        <Column field="status" header="Status" style={{ width: '5%' }}></Column>
                    </DataTable>
                )
            }


            {/* Device Tab Content */}
            {
                activeTab === 'Device' && (
                    <DataTable value={deviceDetails}
                               paginator className="table"
                               first={first} rows={rows}
                               rowClassName={rowData => ({'p-datatable-striped': rowData, 'p-datatable-hover': rowData, 'p-datatable-custom': rowData})}
                               onPage={(e) => { setFirst(e.first); setRows(e.rows); }}
                               rowsPerPageOptions={[10, 25, 50, 100]}
                               tableStyle={{ minWidth: '50rem' }}>
                        <Column body={(rowData, column) =>
                            <React.Fragment>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaSearchPlus/>
                                </button>
                                <button className="icon-button"
                                        onClick={() => (rowData.company_id)}>
                                    <FaEdit/>
                                </button>
                            </React.Fragment>
                        } header="Action" style={{ width: '90px'}}></Column>
                        <Column field="device_id" header="Device ID"></Column>
                        <Column field="device_name" header="Device Name"></Column>
                        <Column field="serial_number" header="Serial Number"></Column>
                        <Column field="status" header="Status"></Column>
                    </DataTable>
                )
            }

        </div>
    );
};

export default CompanyDetails;