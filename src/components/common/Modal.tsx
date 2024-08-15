import React, { useRef, useCallback } from 'react';
import { useNavigate } from '@/hooks/useNavigate';

interface ModalProps {
  options: { code: string; name: string; market_name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: {
    code: string;
    name: string;
    market_name: string;
  }) => void;
  searchTerm: string;
  loadMore: () => void; // 더 많은 데이터를 로드하는 함수
}

const Modal: React.FC<ModalProps> = ({
  options,
  isOpen,
  onClose,
  onSelect,
  searchTerm,
  loadMore,
}) => {
  const { navigateToStockDetail } = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastOptionRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loadMore],
  );

  const handleSelect = (option: {
    code: string;
    name: string;
    market_name: string;
  }) => {
    navigateToStockDetail({
      market: option.market_name,
      code: option.code,
      name: option.name,
    });
    onSelect(option);
    onClose();
  };

  if (!isOpen || !searchTerm) {
    return null;
  }

  return (
    <div
      className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50"
      style={{ width: '100%' }}
    >
      {options.length > 0 ? (
        options.map((option, index) => (
          <div
            key={index}
            ref={index === options.length - 1 ? lastOptionRef : null}
            onClick={() => handleSelect(option)}
            className="flex items-center p-2 cursor-pointer hover:bg-slate-200"
          >
            <div className="text-md mr-2">{option.name}</div>
            <div className="text-sm text-gray-500 border rounded-full px-3 py-1 inline-block mr-2">
              {option.code}
            </div>
            <div className="text-sm text-gray-500 border rounded-full px-3 py-1 inline-block">
              {option.market_name}
            </div>
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">결과 없음</div>
      )}
    </div>
  );
};

export default Modal;
