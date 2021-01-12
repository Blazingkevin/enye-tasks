import React from 'react';
import './Filter.styles.scss';

export default (props) => {
    const { filter, options, setDefault } = props
    const handlechange = (evt) => {
        const [fieldName, value] = evt.target.value.split('-')
        filter({
            fieldName,
            value
        })
    }
    const paymentOptions = Array.from(options.PaymentMethod)
        .map((item, index) => <option key={index} value={`PaymentMethod-` + item}>{item}</option>)
    const genderOptions = Array.from(options.Gender)
        .map((item, index) => <option key={index} value={`Gender-` + item}>{item}</option>)
    return <select name="" id="filter" onChange={handlechange}>
                <option value="" selected={setDefault}>none</option>
                <optgroup label="By Payment Method">
                    {paymentOptions}
                </optgroup>
                <optgroup label="By Gender">
                    {genderOptions}
                </optgroup>
    </select>


}