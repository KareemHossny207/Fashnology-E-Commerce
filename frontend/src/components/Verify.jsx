import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../Context';

const Verify = () => {
    const { token, setCartitems } = useContext(Context);
    const [searchparams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const success = searchparams.get('success');
    const orderId = searchparams.get('orderId');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!token) return;
                // Optionally, get userId from token if needed
                const userId = JSON.parse(atob(token.split('.')[1])).id;
                const response = await axios.post(
                    "http://localhost:5777/api/order/verifystripe",
                    { success, orderId, userId },
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartitems({});
                    navigate('/Orders');
                } else {
                    navigate('/Cart');
                }
            } catch (error) {
                setError(error?.response?.data?.message || error.message || "Verification failed");
                toast.error(error?.response?.data?.message || error.message || "Verification failed");
            } finally {
                setLoading(false);
            }
        };
        verifyPayment();
        // eslint-disable-next-line
    }, [token, success, orderId, setCartitems, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-700">Verifying payment...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }
    return null;
};

export default Verify;