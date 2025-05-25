import { useEffect } from 'react';
import { useSelector } from 'react-redux';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const Payment = ({ amount, onSuccess, onError }: PaymentProps) => {
  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=USD&to=INR`)
      .then((data) => data.json())
      .then((converted) => {
        const options = {
          key: 'rzp_test_4pz2ICBnO3qpos', 
          amount: converted.rates.INR * 100,
          currency: 'INR',
          name: 'Store',
          description: 'Payment for your shopping',
          handler: function (response: any) {
            onSuccess(response);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999'
          },
          theme: {
            color: 'orange'
          }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          onError(response.error);
        });
        rzp.open();
      })
      .catch((e) => console.log(e.message))
    
  };

  return (
    <button
      onClick={initializePayment}
      className="payment-button"
      disabled={cart.products.length === 0}
    >
      Pay Now
    </button>
  );
};

export default Payment; 