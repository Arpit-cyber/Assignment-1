import React from 'react'
import Button from 'react-bootstrap/Button'
import { FaShoppingBag } from 'react-icons/fa'

export const BuyButton = () => {
    return (
        <Button className="bg-orange text-white border-0" variant="danger">
            <FaShoppingBag /> Buy
        </Button>
    )
}
