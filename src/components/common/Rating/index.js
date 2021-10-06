import React from 'react'
import Rating from 'react-rating'
import Image from 'react-bootstrap/Image'
import { Icons } from '../../../resources'

export const CustomRating = ({ rating, readonly }) => {
    return (
        <Rating 
            stop={5}
            fractions={2}
            initialRating={rating} 
            emptySymbol={<Image src={Icons.starLight} alt="star-light" className="star" />}
            fullSymbol={<Image src={Icons.starFill} alt="star-fill" className="star" />}
            readonly={readonly}
        />
    )
}
