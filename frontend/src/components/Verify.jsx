import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../Context';

const Verify = () => {
    const { token, setCartitems } = useContext(Context);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const success = searchParams.get('success');
            const orderId = searchParams.get('orderId');

            if (!token) {
                toast.error("You must be logged in to verify payment.");
                navigate('/login');
                return;
            }
            if (!success || !orderId) {
                toast.error("Invalid verification link.");
                navigate('/Cart');
                return;
            }

            let userId;
            try {
                userId = JSON.parse(atob(token.split('.')[1])).id;
            } catch (e) {
                toast.error("Invalid token.");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post(
                    "https://backende-commerce-kappa.vercel.app/api/order/verifystripe",
                    { success, orderId, userId },
                    { headers: { token } }
                );
                if (response.data && response.data.success) {
                    setCartitems({});
                    toast.success("Payment verified! Redirecting to your orders...");
                    navigate('/Orders');
                } else {
                    toast.error(response.data?.message || "Payment verification failed.");
                    navigate('/Cart');
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message || "Verification failed");
                navigate('/Cart');
            }
        };

        verifyPayment();
        // eslint-disable-next-line
    }, [token, setCartitems, navigate, searchParams]);

    // Always show a loading spinner while verifying, since navigation will occur after
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-gray-700">Verifying payment...</div>
        </div>
    );
};

export default Verify;