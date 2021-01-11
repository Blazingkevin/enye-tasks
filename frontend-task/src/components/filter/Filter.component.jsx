import React from 'react';
import './Filter.styles.scss';

export default (props) => {
    const { filter, options } = props
    console.log(options)
    const handlechange = (evt) => {
        const [fieldName, value] = evt.target.value.split('-')
        filter({
            fieldName,
            value
        })
    }
    const paymentOptions = Array.from(options.PaymentMethod)
        .map(item => <option value={`PaymentMethod-` + item}>{item}</option>)
    const genderOptions = Array.from(options.Gender)
        .map(item => <option value={`Gender-` + item}>{item}</option>)
    return <select name="" id="filter" onChange={handlechange}>
                <option value="" selected>none</option>
                <optgroup label="By Payment Method">
                    {paymentOptions}
                </optgroup>
                <optgroup label="By Gender">
                    {genderOptions}
                </optgroup>
    </select>


}