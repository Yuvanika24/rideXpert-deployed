import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

function CheckoutForm() {
    const stripe:any=useStripe()
    const elements=useElements()

    const handleSubmit=async (event:any)=>{
        event.preventDefault();
        if(elements==null){
            return
        }
        const {error:submitError}=await elements.submit();
        if (submitError){
            return
        }
        const result=await fetch('/api/create-intent',{
            method:'POST',
            body:JSON.stringify({
                amount:50,
            })
        })
        const secretKey=await result.json()

        const {error}=await stripe.confirmPayment({
            clientSecret:secretKey,
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/"
            },
        })
    }
 
    return (
        <div className='flex flex-col justify-center items-center w-full mt-10'>
            <form onSubmit={handleSubmit}>
                <PaymentElement/>
                <button type="submit" disabled={!stripe || !elements}
                className='w-full bg-blue-800 p-2 mt-2 text-white'>
                    Pay
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm