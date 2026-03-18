import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default CustomPagination;