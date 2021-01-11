import React, { useEffect, useState } from 'react';
import './ProfileCard.styles.scss';

/**
 * User Info
 * -First Name
 * -Last Name
 * -Gender
 * -email
 * -phone number
 * -username
 * -lastLogin
 * 
 * Card Detail
 * -credit card number
 * -credit card type
 * -payment method
 * 
 * Request Orgin
 * -Latitude
 * -Longitude
 * -domain name
 * -mac address
 * -url
 */

export default (props) => {
    const sampleData = {
        "FirstName": "Malika",
        "LastName": "Mitchell",
        "Gender": "Prefer to skip",
        "Latitude": -51.729115,
        "Longitude": 45.10225,
        "CreditCardNumber": "4916529095670595",
        "CreditCardType": "VISA",
        "Email": "qaSgiUt@sYtckrO.org",
        "DomainName": "ykDVkxC.biz",
        "PhoneNumber": "101-734-6289",
        "MacAddress": "46:77:61:72:0d:7d",
        "URL": "https://erLIjSE.info/",
        "UserName": "PrDHMBW",
        "LastLogin": "2009-08-24 07:50:00",
        "PaymentMethod": "money order"
    }
    const {profileData} = props;

    const userInfo = {
        "FirstName": profileData["FirstName"],
        "LastName": profileData["LastName"],
        "Gender": profileData["Gender"],
        "Email": profileData["Email"],
        "PhoneNumber": profileData["PhoneNumber"],
        "UserName": profileData["UserName"],
        "LastLogin": profileData["LastLogin"]
    }

    const payment = {
        "CreditCardNumber": profileData["CreditCardNumber"],
        "CreditCardType": profileData["CreditCardType"],
        "PaymentMethod": profileData["PaymentMethod"]
    }

    const source = {
        "Latitude": profileData["Latitude"],
        "Longitude": profileData["Longitude"],
        "DomainName": profileData["DomainName"],
        "MacAddress": profileData["MacAddress"],
        "URL": profileData["URL"]
    }

    const fieldNames = {
        "FirstName": "First Name",
        "LastName": "Last Name",
        "Gender": "Gender",
        "Latitude": "Latitude",
        "Longitude": "Longitude",
        "CreditCardNumber": "Card Number",
        "CreditCardType": "Card Type",
        "Email": "Email",
        "DomainName": "Domain",
        "PhoneNumber": "Phone Number",
        "MacAddress": "MAC Address",
        "URL": "URL",
        "UserName": "Username",
        "LastLogin": "Last Login",
        "PaymentMethod": "Payment Method"
    }

    const tabs = { 'source': 0, 'user': 1, 'payment': 2 }
    const [visibleTab, setVisibleTab] = useState(tabs['user']);

    const changeTab = (tabObject) => {
        const li = Object.keys(tabObject).map(fieldName => {
            return <div className="item">{fieldNames[fieldName]}: {tabObject[fieldName]}</div>
        })

        return li
    }
    let list;
    if (visibleTab == tabs['user']) {
        list = changeTab(userInfo);
    }

    if(visibleTab == tabs['payment']){
        list = changeTab(payment);
    }

    if(visibleTab == tabs['source']){
        list = changeTab(source);
    }

    return (
        <div className="card">
            <div className="card__tabs">
                <button onClick={()=>setVisibleTab(tabs['payment'])} className={`tab tab-payment ${visibleTab == tabs['payment'] ? 'tab-active' : ''}`}>Payment</button>
                <button onClick={()=>setVisibleTab(tabs['user'])} className={`tab tab-user ${visibleTab == tabs['user'] ? 'tab-active' : ''}`}>User</button>
                <button onClick={()=>setVisibleTab(tabs['source'])} className={`tab tab-origin ${visibleTab == tabs['source'] ? 'tab-active' : ''}`}>Source</button>
            </div>
            <div className="inner-ring">
                <div className="main-inner">
                    {list}
                </div>
            </div>
        </div>
    )
}