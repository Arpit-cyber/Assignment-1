import React from 'react'
import { CustomModal } from '../common/Modal'
import { hideModal, itemToBeRemvoedFromCart$, setAlert, setItemToBeRemovedFromCart, setSelectedModal } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeFromCart } from '../../services'

export const DeleteConfirmation = () => {
    const dispatch = useDispatch();
    const itemToBeRemvoedFromCart = useSelector(itemToBeRemvoedFromCart$)

    const handleReset = () => {
        dispatch(setItemToBeRemovedFromCart())
        dispatch(hideModal())
        dispatch(setSelectedModal())
    }

    const handleSubmit = () => {
        dispatch(removeFromCart(itemToBeRemvoedFromCart)).then(() => {
            dispatch(fetchCart())
            handleReset()
            dispatch(setAlert("Item removed from cart!"));
        })
    }

    return (
        <CustomModal 
            onHide={handleReset} 
            onSubmit={handleSubmit} 
            title="Remove Item from Cart" 
            message={<h4>Are you sure to remove this item from cart</h4>}
            confirmButtonText="Yes"
        />
    )
}
