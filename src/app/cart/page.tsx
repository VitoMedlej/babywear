'use client'
import React, { useEffect, useState } from 'react'
import {Box, Divider, Typography} from '@mui/material'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai';

import { useRouter } from 'next/navigation'
import Btn from '@/Components/Btn/Btn';
import CartProduct from '@/Components/Shared/CartProduct/CartProduct';
import { ICartItem } from '@/Types/Types';
import { loadState, saveState } from '@/Utils/LocalstorageFn';
import totalCal from '@/Utils/totalCal';

const titleStyle = {
    fontSize: '1.3em',
    fontWeight: '600 !Important',
    
}
const textStyle = {
    color: '#000000b8'
}
const EmptyCartAlert = () => {
    return (
        <Box sx={{
            py: 10
        }}>
            <Box
                className='flexed'
                sx={{
                flexDirection: 'column',
                textAlign: 'center',
                margin: '0 auto'
            }}>
                  <Box className='auto flex' sx={{
                    width: '60px',

                }}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
                        alt="Empty Cart Image"
                        className="img"/>
                </Box>
                <Typography fontSize='2em' fontWeight='bold'>
                    Your Cart Is Empty!
                </Typography>
              
                <Link className='flex auto decor-none gap' href='/collection/products'>
                    <Btn v2 className='flex auto ' sx={{
                        border:'none',
                        mt: 3
                    }}>
                      Browse Collection
                        <AiOutlineShoppingCart/>
                    </Btn>
                </Link>
            </Box>
        </Box>
    )
}


const Cart = () => {
    const [cartItems,setCartItems] = useState<ICartItem[]>([])
    const total= totalCal(cartItems) || 0; 
    let localCart : ICartItem[] = loadState('bag-list') || []
    useEffect(() => {
        if (localCart) {
            
            setCartItems(localCart)
    }
      
    }, [])
    const refetchState = () => {
        // let localCart : ICartItem[] = loadState('userbag') || []

        setCartItems(loadState('bag-list'))
        
    }
    const remove = (id:string) => {
        let state = cartItems.filter(x => `${x._id}` !== id);
         saveState('bag-list', state);
         setCartItems(state);
     }
    return (
        <Box sx={{
            py: 5,
            maxWidth:'xl',
            margin:'0 auto',
            px: 1
        }}>
      {cartItems?.length >0 &&      <Typography
                sx={{
                fontSize: '1.5em',
                padding: 1,
                fontWeight: '600'
            }}>My Cart</Typography>}
            <Box  sx={{
                display: 'flex',
               flexWrap: 'wrap'
            }}>
                <Box
                    sx={{
                    width: {
                        xs: '100%',
                        md: '70%'
                    }
                }}>
                    {cartItems && cartItems.length > 0 ?
                    cartItems.map(item=>{
                        return <CartProduct 
                        
                        onChange={refetchState}
                        key={item._id}
                        img={item.img} qty={item.qty} remove={remove} title={item.title} _id={item._id} price={item.price}/>
                    }) :
                    <EmptyCartAlert/>     
                }
                </Box>
               
                <Box
                    sx={{
                    padding: '1em',
                    mt:{xs:'2em',sm:0},
                    height: 'fit-content',
                    width: {
                        xs: '100%',
                        md: '25%'
                    },
                    // boxShadow:'1px 1px 3px #0000002b'
                }}>
                  
                    <Typography sx={{
                        ...titleStyle
                    }}>Order Summary</Typography>
                  
                
                    <Divider></Divider>
                    <Box 
                    sx={{
                      mt:1,
                      justifyContent: 'space-between'
                  }}
                    className='flexed'> 

                <span>Total:

                    <Typography sx={{
                        fontWeight: '600'
                    }}>${cartItems?.length > 0 ? total + Number(process.env.NEXT_PUBLIC_FEE || 0) : 0}</Typography>
                    
                    </span>
                    </Box>
                    <Link href='/checkout'
                    
                    className='decor-none bg'>

                    <Btn
                    className='bg'
                    sx={{width:'100%',':hover':{color:'white !important'},bordeRadius:1,mt:2.5}}>Checkout Now</Btn>
                    </Link>

                    <Link href='/collection/products' className='decor-none'>

                    <Btn
                    
                    v2={true} sx={{bordeRadius:1,mx:0,':hover':{background:'white',color:'black'},width:'100%',mt:1}}>Continue Shopping</Btn>
                    </Link>
                    <Box className='flex wrap'> 
                        <Typography sx={{width:'100%',fontWeight:500,pb:.5}}>
                            We Also Accept:
                        </Typography>
                        <Box sx={{width:'80px'}}>
                        <img src="https://whish.money/app/logos/whish_v2.png" alt="Whish Money Payment method logo" className="img contain" />
                        </Box>
                        <Box sx={{width:'80px',ml:2}}>

<img src="https://www.omt.com.lb/storage/services/X0OGLcDfG3zrQ68JDEomA65t9.jpg" alt="Western Union Money Payment method logo" className="img contain" />
</Box>
                    </Box>
                </Box>
                
            </Box>
        </Box>
    )
}

const Index = () => {
    return ( <>
    {
        false
            ? <EmptyCartAlert/>
            : <Cart/>

    } 
    
    </>
  )
}

export default Index