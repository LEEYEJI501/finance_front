import React, { useState } from 'react';
import SelectBox from '@/components/common/SelectBox';

const sortOptions = [
  { label: 'Name Ascending', value: 'name,asc' },
  { label: 'Name Descending', value: 'name,desc' },
  { label: 'Code Ascending', value: 'code,asc' },
  { label: 'Code Descending', value: 'code,desc' },
  { label: 'Transaction Amount Ascending', value: 'transactionAmount,asc' },
  { label: 'Transaction Amount Descending', value: 'transactionAmount,desc' },
  { label: 'Price Change Rate Ascending', value: 'priceChangeRate,asc' },
  { label: 'Price Change Rate Descending', value: 'priceChangeRate,desc' },
];

type SortSelectBoxProps = {
  onSortChange: (sort: string) => void;
};

const SortSelectBox: React.FC<SortSelectBoxProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <SelectBox
      options={sortOptions}
      selectedValue={selectedSort}
      onChange={handleSortChange}
      label="Sort by"
    />
  );
};

export default SortSelectBox;
