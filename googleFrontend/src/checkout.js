import React, { useState } from 'react'
import '../src/App.css'
import { useNavigate } from 'react-router-dom';

 const Checkout = () => {


    const [ShippingName, setShippingName] = useState('');
    const [shippingNameerror, setShippingNameerror] = useState('');
    const [address, setAddress] = useState('');
    const [Addresserror, setAddresserror] = useState('');
    const [cardNumber,setCardNumber] = useState('');
    const[cardNError,setCardNError] = useState('');
    const [year,setYear] = useState('');
    const[yearError,setYearError] = useState('');
    const [CVV,setCVV] = useState('');
    const[CVVerror,setCVVError] = useState('');
    const [CHName,setCHName] = useState('');
    const[CHNameerror,setCHNameError] = useState('');
    const navigate = useNavigate();
    let isError = true;

    const CheckName = (e) => {
        setShippingName(e.target.value);
    };
    const checkAddess = (e)=>{
        setAddress(e.target.value);
    }
    const checkCardNumber = (e) => {
        setCardNumber(e.target.value);
    };
    const checkYear = (e) => {
        setYear(e.target.value);
    };
    const checkCVV = (e) => {
        setCVV(e.target.value);
    };
    const checkCHName = (e) => {
        setCHName(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (ShippingName.trim() === '') {
            setShippingNameerror('Please enter Name');
            isError =true
        }
        else{
            setShippingNameerror('');
            isError =false
        }
        if (address.trim() === '') {
            setAddresserror('Please enter Address');
            isError =true
        }
        else{
            setAddresserror('');
            isError=false
        }
        let cardnumberTest = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
        const isValid = cardnumberTest.test(cardNumber);
        debugger
        if(cardNumber.trim() ==='' || !isValid){
            setCardNError('enter valid card number');
            isError = true;
        }
        else{
            setCardNError('');
            isError = false
        }
        if(year.trim() ==='' || year<=2023 ){
            setYearError('enter valid Expiry Year');
            isError = true
        }
        else{
            setYearError('');
            isError = false
        }
        let CVVTest = /^[0-9]{3}$/;
        const isCVVValid = CVVTest.test(CVV);
        debugger
        if(!isCVVValid ){
            setCVVError('enter valid CVV');
            isError = true
        }
        else{
            setCVVError('');
            isError = false
        }
        if (CHName.trim() === '') {
            setCHNameError('Please enter Card Holder Name');
            isError =true;
        }
        else{
            setCHNameError('');
            isError = false
        }
        if(!isError){debugger
            alert('Payment done');
            navigate('/AllOrders')
        }
    }


    

    return (
        <div class="container mt-4" style={{width: '800px',marginBottom:'120px'}}>
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
            <div class="form-group" >
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Please enter your name" onChange={CheckName}/>
                {shippingNameerror && <p style={{ color: 'red' }}>{shippingNameerror}</p>}
            </div>
            <div class="form-group">
                <label for="ShippingAddress">Shipping Address</label>
                <input type="text" class="form-control" id="ShippingAddress" name="ShippingAddress" placeholder="Please enter address" onChange={checkAddess}/>
                {Addresserror && <p style={{ color: 'red' }}>{Addresserror}</p>}
            </div>
            <h2>Payment Information</h2>
            <div class="form-group">
                <label for="CardNumber">Card Number</label>
                <input type="text" class="form-control" id="CardNumber" name="CardNumber" placeholder="Card number(1234-1234-1234-124)" onChange={checkCardNumber} />
                {cardNError && <p style={{ color: 'red' }}>{cardNError}</p>}
            </div>
            <div className='grid-colamn'>

            <div class="form-group">
                <label for="MonthDropdown">Month</label>
                <select class="form-control" id="MonthDropdown">
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                </select>
            </div>
            <div class="form-group">
                <label for="eYear">Expiry Year</label>
                <input type="Number" class="form-control" id="eYear" name="eYear" placeholder='Year'onChange={checkYear}/>
                {yearError && <p style={{ color: 'red' }}>{yearError}</p>}
            </div>
            <div class="form-group">
                <label for="CVV">CVV</label>
                <input type="text" class="form-control" id="CVV" name="CVV" placeholder='CVV(123)'onChange={checkCVV}/>
                {CVVerror && <p style={{ color: 'red' }}>{CVVerror}</p>}
            </div>
            </div>
            <div class="form-group">
                <label for="CardHolderName">Card Holder Name</label>
                <input type="text" class="form-control" id="CardHolderName" name="CardHolderName" placeholder='Card Holder Name' onChange={checkCHName}/>
                {CHNameerror && <p style={{ color: 'red' }}>{CHNameerror}</p>}
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block my-4">Submit</button>
        </form>
    </div>
    
  )
}
export default Checkout

