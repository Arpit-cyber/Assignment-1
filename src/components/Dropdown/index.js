import React from 'react';

import Select from 'react-select';

export const CustomDropdown = ({ options, placeholder, value, onChange }) => (
  <Select
    options={options}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="custom-dropdown"
  />
);
