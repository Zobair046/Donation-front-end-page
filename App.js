import React, { useState } from 'react';
import img1 from './images/donation1.jpg';
import img2 from './images/donation12.jpg';
import img3 from './images/donation3.jpg';
import img4 from './images/donation4.jpg';
import './App.css';

function App() {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [cardHolderNameError, setCardHolderNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvcError, setCvcError] = useState('');
 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (!validateCardHolderName(cardHolderName)) {
      setCardHolderNameError('Please enter a valid card holder name');
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setCardNumberError('Please enter a valid card number');
      return;
    }

    if (!validateExpirationDate(expirationDate)) {
      setExpirationDateError('Please enter a valid expiration date');
      return;
    }

    if (!validateCvc(cvc)) {
      setCvcError('Please enter a valid CVC');
      return;
    }

    
    // Send the form data to the backend server
    fetch('/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvc: cvc
      })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      // Clear the form fields after successful submission
      setCardHolderName('');
      setCardNumber('');
      setExpirationDate('');
      setCvc('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  
  const validateCardHolderName = (name) => {
    return /^[a-zA-Z ]+$/.test(name);
  }

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number);
  }

  const validateExpirationDate = (date) => {
    // The expiration date should be in MM/YY format
    const [month, year] = date.split('/');
    const now = new Date();
    const expiration = new Date(parseInt(`20${year}`, 10), parseInt(month, 10) - 1, 1);
    return expiration > now;
  }

  const validateCvc = (cvc) => {
    return /^[0-9]{3}$/.test(cvc);
  }

  

  return (
    
    <div className="container">
<div className="first_page">
  <h1>DONATE</h1>
 </div>

 <div className="images">
  <p classname="morewelcome">Welcome to our Donation page!</p>

  <p className='welcome'> Our mission is to make a positive impact on the environment by promoting sustainable practices and conserving energy. We believe that by working together, we can create a better future for ourselves and future generations.

Your donation will help us to fund projects that protect our natural resources and reduce our carbon footprint. We will use your generous contributions to support initiatives such as tree planting, renewable energy development, and educational programs that promote sustainable living.</p>
 <img src={img1} alt='' />
 </div>




 <div class="cards">
  <div class="card">
    <img src={img2} alt='' />
    <p className='card__header'>How your Donation will be helpful?</p>
    <p class="card__description">Your donation will be instrumental in helping us achieve our mission to save the environment and promote energy conservation. With your support, we will be able to fund important initiatives such as renewable energy projects, conservation efforts, educational programs, tree planting, and green technology investments. These projects and programs will have a direct and positive impact on our planet, reducing our carbon footprint, protecting natural resources, and preserving critical habitats for wildlife. Your donation will help create a cleaner, healthier, and more sustainable future for us all.</p>
    <a href="https://www.gov.uk/government/news/energy-efficiency-what-you-need-to-know#:~:text=Why%20is%20energy%20efficiency%20important,of%20UK%20total%20gas%20use."><button className='card__btn'>Read More</button></a>
  </div>
  <div class="card">
    <img src={img3} alt='' />
    <p className='card__header'>How much of my donation goes directly to the cause?</p>
    <p class="card__description">We strive to ensure that the vast majority of your donation goes directly to supporting the cause. We work hard to keep our administrative and fundraising costs low so that we can maximize the impact of your donation. You can be assured that your donation will be used efficiently and effectively to support our mission.</p>
    <a href="https://www.un.org/en/climatechange/raising-ambition/renewable-energy"><button className='card__btn'>Read More</button></a>
  </div>
  <div class="card">
    <img src={img4} alt='' />
    <p className='card__header'>What impact will my donation have on the environment?</p>
    <p class="card__description">Your donation will have a direct and positive impact on the environment. We will use your donation to fund important initiatives such as renewable energy projects, conservation efforts, educational programs, tree planting, and green technology investments. These projects and programs will help reduce our carbon footprint, protect natural resources, and preserve critical habitats for wildlife. Your donation will make a real difference in the fight against climate change and the degradation of our planet.</p>
    <a href="https://ec.europa.eu/environment/nature/biodiversity/intro/index_en.htm#:~:text=Biodiversity%20is%20the%20key%20indicator,whole%20may%20adapt%20and%20survive."><button className='card__btn'>Read More</button></a>
  </div>
</div> 





       <form onSubmit={handleSubmit}>
        
        <h2>Donate to Save The Earth</h2>

        <div className='subscrip'>
          <p>Please Select one: </p>
          </div>
        <select name="package" id="package">
          <option value="month">Monthly</option>
          <option value="one_off">One-Off</option>
        </select>
       

  <div className='carddetails'><p>Enter Your Card Details: </p></div>

        
        <div className="form-group">
          <label htmlFor="cardHolderName">Card Holder Name:</label>
          <input type="text" className="form-control" id="cardHolderName" placeholder="Enter Full Name" required value={cardHolderName} onChange={event =>{ setCardHolderName(event.target.value);
          setCardHolderNameError('');
          }} />
          {cardHolderNameError && <div className="error-message">{cardHolderNameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" className="form-control" id="cardNumber" placeholder='Enter Your 16 Digit Card Number' pattern="[0-9]{16}" required value={cardNumber} onChange={event =>{ setCardNumber(event.target.value);
          setCardNumberError('');
        }} />
        {setCardNumberError && <div className="error-message">{cardNumberError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" className="form-control" id="expirationDate" placeholder='MM/YY' pattern="^(0[1-9]|1[0-2])\/\d{2}$" required value={expirationDate} onChange={event =>{ setExpirationDate(event.target.value);
          setExpirationDateError('');
        }} />
        {setExpirationDateError && <div className="error-message">{expirationDateError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC:</label>
          <input type="text" className="form-control" id="cvc" placeholder="Enter 3 Digit CVC"pattern="[0-9]{3}" required value={cvc} onChange={event => {setCvc(event.target.value);
          setCvcError('');
        }} />
        {setCvcError && <div className="error-message">{cvcError}</div>}
        </div>
<p className='donate__amount'>Please Select The Amount: </p>
        <select className='amount'>
          <option value="five">5 Pounds</option>
          <option value="ten">10 Pounds</option>
          <option value="twenty">20 Pounds</option>
          <option value="fivety">50 Pounds</option>
          <option value="hundrad">100 Pounds</option>
        </select>
        <button type="submit" className="btn btn-primary">Donate Now</button>
        
      </form>
      </div>
      
  );
}

export default App;   
