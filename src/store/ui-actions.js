import {uiActions} from './ui-slice';
import {cartSliceAction} from './cart-slice';

export const fetchData=()=>{
    return async (dispatch)=>{
        const fetchData=async()=>{
               const response=await fetch('https://react-http-e9864-default-rtdb.firebaseio.com/cart.json');

               if(!response.ok){
                   throw new Error('Could not fetch cart data!');
               }

               const data=await response.json();

               return data;

        };

        try{
            const cartData=await fetchData();
            dispatch(cartSliceAction.replaceCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity
            }))

        }catch(error){
            uiActions.showNotification({
                status:'error',
                title:'Error!',
                message:'Fetchiong cart data Failed',
            })

        }

    }
}


export const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Sending...',
            message:'Sending cart Data',
        }))

        const sendRequest=async()=>{
        const response= await fetch('https://react-http-e9864-default-rtdb.firebaseio.com/cart.json',{
            method:'PUT',
            body:JSON.stringify({
                items:cart.items,
                totalQuantity:cart.totalQuantity,
            }),
        });

        if(!response.ok){
            throw new Error('Sending cart data failed.');
        }

       }

       try{
           await sendRequest();
           dispatch(
               uiActions.showNotification({
                   status:'success',
                   title:'Success!',
                   message:'Sent cart data successfully',
               })
           )

       }catch(error){
        dispatch(
            uiActions.showNotification({
                status:'error',
                title:'Error!',
                message:'Sent cart data Failed',
            })
        )

       }
    }

    
};