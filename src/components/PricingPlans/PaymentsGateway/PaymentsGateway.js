import React, { useState } from 'react';
import './PaymentsGateway.css';
import amex from '../../../images/ImageAndIcon/credit-cards_amex.png';
import mastercard from '../../../images/ImageAndIcon/credit-cards_mastercard.png';
import visaCard from '../../../images/ImageAndIcon/credit-cards_visa.png';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../../Shared/Navbar/NavBar';
import Paypal from './Paypal/Paypal';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, } from "@stripe/react-stripe-js";
import CheckoutForm from './Paypal/CheckoutForm/CheckoutForm';
import { toast } from 'react-toastify';
toast.configure()

const creditCardImages = [
    { id: 1, img: mastercard },
    { id: 2, img: visaCard },
    { id: 3, img: amex },
];
const PaymentsGateway = () => {
    const stripePromise = loadStripe("pk_test_51HaKX2FWzFyXdW5KjdYVQtPEcdPZOSLq0nvfi4MfePscvZAop5VwXrGvH9Z0XjenRtpUwNFsX07um8rLzI8yrrB600opOV9Hw9");

    const [checkout, setCheckout] = useState(
        {
            paypal: '',
            credit: ''
        }
    );

    return (
        <>
            <section className="header_main mb-5">
                <div className="overly">
                    <NavBar />
                    <h1 className="text-white text-center">YOUR GYM MEMBERSHIP</h1>
                </div>
            </section>
            <Container>
                <div className="form-check card_content">
                    <Row>
                        <Col xs={8}>
                            <input onClick={
                                () => setCheckout({ credit: "creditCard" })}
                                className="form-check-input check_input" type="radio"
                                name="inlineRadioOptions" id="inlineRadio1"
                                value="option1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                                <h4>Credit Card</h4>
                            </label>
                            <p className="text_color mt-2">Safe money transfer using your bank account. Visa, Maestro, Discover, American Express</p>
                        </Col>
                        <Col>
                            <div className="pl-md-5">
                                {
                                    creditCardImages.map(
                                        cardImage => <img className="pl-2" key={cardImage.id} src={cardImage.img} alt="" />
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
                <Row className="p-5 mt-5 m-0 paypal_content">
                    <Col>
                        <div className="form-check">
                            <input onClick={() => setCheckout({ paypal: "paypal" })} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                <h4>Paypal</h4>
                            </label>
                            <p className="pt-4 text_color">You well be redirected to PayPal website to complete your purchase securely.</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        {checkout.paypal ? <Paypal /> : <img src="https://tse3.mm.bing.net/th?id=OIP.5WodCMcfWx9Gq8jWPTrmGQHaC4&pid=Api&P=0&w=474&h=185" width='200' className="d-flux justify-content-center" alt="" />}
                    </Col>
                </Row>
                {
                    !checkout.credit && !checkout.paypal &&
                    <button onClick={() =>
                        toast.error('Please Choose payment gateway !', { position: toast.POSITION.TOP_CENTER })
                    }
                    >null</button>
                }

                {
                    checkout.paypal && <button onClick={() =>
                        toast.error('Please Choose the Paypal or Debit/Credit Card button !', { position: toast.POSITION.TOP_CENTER })
                    }
                    >Paypal</button>
                }

                {checkout.credit && <button>Credit</button>}
            </Container>
            <Footer />
        </>
    );
};

export default PaymentsGateway;