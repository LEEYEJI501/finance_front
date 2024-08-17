import React from "react";
import SearchInput from "@/components/common/SearchInput";
import Modal from "@/components/common/Modal";
import useSearchStock from "@/hooks/useSearchStock";

const SearchSection: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchCategory,
    setSearchCategory,
    searchResults,
    isModalOpen,
    setIsModalOpen,
    debouncedSearch,
    loadMore,
  } = useSearchStock();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  const handleSelect = (option: {
    code: string;
    name: string;
    market_name: string;
  }) => {
    setSearchTerm(`${option.name} (${option.code})`);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-4/5 relative">
      <SearchInput
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        searchOptions={["name", "code"]}
        selectedOption={searchCategory}
        onOptionChange={handleOptionChange}
        className="w-full"
      />
      <Modal
        options={searchResults}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        searchTerm={searchTerm}
        loadMore={loadMore}
      />
    </div>
  );
};

export default SearchSection;
