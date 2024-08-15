import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ModalProps {
  options: { code: string; name: string; market_name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: {
    code: string;
    name: string;
    market_name: string;
  }) => void;
}

const Modal: React.FC<ModalProps> = ({
  options,
  isOpen,
  onClose,
  onSelect,
}) => {
  const router = useRouter();

  const handleSelect = (option: {
    code: string;
    name: string;
    market_name: string;
  }) => {
    console.log(option);
    // router.push(`/stocks/${option.code}`);
    onSelect(option);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-lg max-h-60 overflow-y-auto p-4 w-80"
        onClick={e => e.stopPropagation()}
      >
        {options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md"
            >
              <div className="font-semibold">{option.name}</div>
              <div className="text-sm text-gray-500">
                {option.code} - {option.market_name}
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">결과 없음</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
