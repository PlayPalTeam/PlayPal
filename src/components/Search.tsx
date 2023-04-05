import { ChangeEvent, memo } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  query: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder: string;
}

const SearchBar = ({ query, handleChange, className, placeholder }: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <input type="text" className="input-primary input w-full" placeholder={placeholder} value={query} onChange={handleChange} />
      <motion.span
        className="absolute top-4 right-4 -translate-y-1/2"
        initial={{ opacity: 0, x: 10 }}
        animate={query ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
      >
        <AiOutlineSearch className="h-6 w-6 text-gray-400" />
        {query && (
          <motion.span
            className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {query.length}
          </motion.span>
        )}
      </motion.span>
    </div>
  );
};

export default memo(SearchBar);
