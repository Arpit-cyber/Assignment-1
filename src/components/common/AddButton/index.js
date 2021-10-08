import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';

export const AddButton = ({ onClick, isDisabled }) => {
    return (
        <Button
            variant="warning"
            onClick={onClick}
            disabled={isDisabled}
          >
            <FaShoppingCart /> Add
          </Button>
    )
}
