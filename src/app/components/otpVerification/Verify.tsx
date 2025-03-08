'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function OTPVerification() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill('')); // Array to store OTP digits
    const [error, setError] = useState<string>(''); // Error message

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return; // Allow only numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus to the next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    // Handle OTP submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }
        // Add your OTP verification logic here
        console.log('OTP Submitted:', enteredOtp);
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
                    OTP Verification
                </h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter the 6-digit OTP sent to your email/phone.
                </p>

                {/* OTP Input Fields */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-4 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-950 text-white py-2 px-4 rounded-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Verify OTP
                    </button>
                </form>

                {/* Resend OTP Link */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    Didn&apos;t receive the OTP?{' '}
                    <button
                        onClick={() => console.log('Resend OTP')}
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        Resend OTP
                    </button>
                </p>

                {/* Back to Login Link */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}