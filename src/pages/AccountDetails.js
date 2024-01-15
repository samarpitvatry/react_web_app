import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';

const AccountDetails = () => {
    const { accountId } = useParams();
    const [accountInfo, setAccountInfo] = useState(null);
    const [primaryContactInfo, setPrimaryContactInfo] = useState(null);
    const [flexFields, setFlexFields] = useState(null);
    const [primaryFlexFields, setPrimaryFlexFields] = useState(null);
    const [billingContactInfo, setBillingContactInfo] = useState(null);
    const [billingFlexFields, setBillingFlexFields] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = 'https://ords1.qa.btcitest.com/ords/coss/coss/accounts/details';

        //const baseUrl = 'http://qa1boskube11.qa.btcitest.com:30500/ords/coss/coss/accounts/details';//APIGateway URL

        const fetchData = async (endpoint, setter) => {
            try {
                const response = await fetch(`${baseUrl}${endpoint}`);
                const data = await response.json();
                console.log(`Data from ${endpoint}:`, data); // Logging the fetched data
                setter(data.items);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                setter(null);
            }
        };

        setLoading(true);
        Promise.all([
            fetchData(`/info/${accountId}`, setAccountInfo),
            fetchData(`/primary-contact/${accountId}`, setPrimaryContactInfo),
            fetchData(`/flex-fields/${accountId}`, setFlexFields),
            fetchData(`/primary-flex-fields/${accountId}`, setPrimaryFlexFields),
            fetchData(`/billing-contact/${accountId}`, setBillingContactInfo),
            fetchData(`/billing-flex-fields/${accountId}`, setBillingFlexFields),
        ]).finally(() => {
            setLoading(false);
        });
    }, [accountId]);

    const InfoSection = ({ data }) => (
        <>
            {data && Object.entries(data).map(([key, value]) => (
                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
            ))}
        </>
    );

    const FlexFieldTable = ({ data, isPrimary, isBilling }) => (
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                {isPrimary || isBilling ? (
                    // Headers for Primary and Billing Flex Fields
                    <>
                        <th>Field Name</th>
                        <th>Value</th>
                        <th>Comments</th>
                    </>
                ) : (
                    // Headers for Regular Flex Fields
                    <>
                        <th>Flex Type</th>
                        <th>Field Name</th>
                        <th>Default Value</th>
                        <th>Ordinal Num</th>
                        <th>Required</th>
                        <th>Read Only</th>
                        <th>Comments</th>
                        <th>Customer Visible</th>
                        <th>Pulldown</th>
                        <th>Regex Pattern</th>
                        <th>Validate Regex</th>
                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {data && data.length > 0 ? (
                data.map((field, index) => (
                    <tr key={index}>
                        {(isPrimary || isBilling) ? (
                            // Data rows for Primary and Billing Flex Fields
                            <>
                                <td>{field.fieldname}</td>
                                <td>{field.value}</td>
                                <td>{field.comments}</td>
                            </>
                        ) : (
                            // Data rows for Regular Flex Fields
                            <>
                                <td>{field.flex_type}</td>
                                <td>{field.fieldname}</td>
                                <td>{field.defaultvalue}</td>
                                <td>{field.ordinal_num}</td>
                                <td>{field.required}</td>
                                <td>{field.readonly}</td>
                                <td>{field.comments}</td>
                                <td>{field.customer_visible}</td>
                                <td>{field.pulldown}</td>
                                <td>{field.regex_pattern}</td>
                                <td>{field.validate_regex}</td>
                            </>
                        )}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={(isPrimary || isBilling) ? 3 : 11}>No data available.</td>
                </tr>
            )}
            </tbody>
        </table>
    );

    if (loading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#5514B4" height={70} width={70} />
            </div>
        );
    }

    return (
        <div className="account-details" style={{ fontFamily: "'BTCurve', sans-serif" }}>
            <h1>Account Details</h1>
            <div className="information-container"> {/* Flex container for sections */}
                <section className="info-section">
                    <h2>Account Information</h2>
                    {accountInfo && (
                        <div className="info-container">
                            <p><strong>Account ID:</strong> {accountInfo[0].accountid}</p>
                            <p><strong>EB Number:</strong> {accountInfo[0].ebnumber}</p>
                            <p><strong>City:</strong> {accountInfo[0].city}</p>
                            <p><strong>Country:</strong> {accountInfo[0].country}</p>
                            <p><strong>Timezone:</strong> {accountInfo[0].timezone}</p>
                            <p><strong>Company Name:</strong> {accountInfo[0].companyname}</p>
                            <p><strong>Address:</strong> {accountInfo[0].address}</p>
                            <p><strong>Province:</strong> {accountInfo[0].province}</p>
                            <p><strong>Postal Code:</strong> {accountInfo[0].postalcode}</p>
                            <p><strong>Special Event Threshold:</strong> {accountInfo[0].specialeventthreshold}</p>
                            <p><strong>Status:</strong> {accountInfo[0].status}</p>
                            <p><strong>Account PIN:</strong> {accountInfo[0].account_pin}</p>
                            {/* Add other fields as needed */}
                        </div>
                    )}
                </section>

                <section className="info-section" >
                    <h2>Primary Contact Information</h2>
                    {primaryContactInfo && (
                        <div className="info-container" >
                            <p><strong>Name:</strong> {primaryContactInfo[0].name}</p>
                            <p><strong>Position:</strong> {primaryContactInfo[0].position || 'N/A'}</p>
                            <p><strong>Company Name:</strong> {primaryContactInfo[0].companyname}</p>
                            <p><strong>Address:</strong> {primaryContactInfo[0].address}</p>
                            <p><strong>City:</strong> {primaryContactInfo[0].city}</p>
                            <p><strong>Province:</strong> {primaryContactInfo[0].province}</p>
                            <p><strong>Postal Code:</strong> {primaryContactInfo[0].postalcode}</p>
                            <p><strong>Country:</strong> {primaryContactInfo[0].country}</p>
                            <p><strong>Timezone:</strong> {primaryContactInfo[0].timezone}</p>
                            <p><strong>Email:</strong> {primaryContactInfo[0].email}</p>
                            <p><strong>Phone:</strong> {primaryContactInfo[0].phone}</p>
                            <p><strong>Mobile:</strong> {primaryContactInfo[0].mobile}</p>
                            <p><strong>Fax:</strong> {primaryContactInfo[0].fax}</p>
                            <p><strong>Status:</strong> {primaryContactInfo[0].status}</p>
                            <p><strong>Security Question:</strong> {primaryContactInfo[0].securityquestion || 'N/A'}</p>
                            <p><strong>Security Answer:</strong> {primaryContactInfo[0].securityanswer || 'N/A'}</p>
                            <p><strong>Promotion Code:</strong> {primaryContactInfo[0].promotioncode || 'N/A'}</p>
                            {/* Add other fields as needed */}
                        </div>
                    )}
                </section>

                <section className="info-section">
                    <h2>Billing Contact Information</h2>
                    {billingContactInfo && (
                        <div className="info-container">
                            <p><strong>Invoice Company Name:</strong> {billingContactInfo[0].invoice_companyname}</p>
                            <p><strong>Name:</strong> {billingContactInfo[0].name}</p>
                            <p><strong>Position:</strong> {billingContactInfo[0].position}</p>
                            <p><strong>Address:</strong> {billingContactInfo[0].address}</p>
                            <p><strong>City:</strong> {billingContactInfo[0].city}</p>
                            <p><strong>Province:</strong> {billingContactInfo[0].province}</p>
                            <p><strong>Postal Code:</strong> {billingContactInfo[0].postalcode}</p>
                            <p><strong>Country:</strong> {billingContactInfo[0].country}</p>
                            <p><strong>Timezone:</strong> {billingContactInfo[0].timezone}</p>
                            <p><strong>Email:</strong> {billingContactInfo[0].email}</p>
                            <p><strong>Phone:</strong> {billingContactInfo[0].phone}</p>
                            <p><strong>Mobile:</strong> {billingContactInfo[0].mobile}</p>
                            <p><strong>Fax:</strong> {billingContactInfo[0].fax}</p>
                            {/* Add other fields as needed */}
                        </div>
                    )}
                </section>
            </div>
            {/* Continue with other sections if necessary */}
            <section>
                <h2>Flex Fields</h2>
                <FlexFieldTable data={flexFields} isPrimary={false} />
            </section>

            <section className="primary-contact-flex-fields">
                <h2>Primary Contact Flex Fields</h2>
                <FlexFieldTable data={primaryFlexFields} isPrimary={true} />
            </section>

            <section className="billing-flex-fields">
                <h2>Billing Flex Fields</h2>
                <FlexFieldTable data={billingFlexFields} isBilling={true} />
            </section>

        </div>
    );
};

export default AccountDetails;
