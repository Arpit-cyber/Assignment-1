import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { user$ } from '../../../store';

export const AddButton = ({ onClick, isDisabled }) => {
  const currentUser = useSelector(user$);

  return (
      <Button
          variant="warning"
          onClick={onClick}
          disabled={isEmpty(currentUser) || isDisabled}
          className={classNames({"disabled-button": isEmpty(currentUser)})}
        >
          <FaShoppingCart /> Add
        </Button>
  )
}
