import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  query: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar = ({ query, handleChange, className }: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        className="input w-full input-primary"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <motion.span
        className="absolute top-4 right-4 -translate-y-1/2"
        initial={{ opacity: 0, x: 10 }}
        animate={query ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M14.293 14.293a1 1 0 0 1-1.414 0l-3.013-3.013a5.5 5.5 0 1 1 1.414-1.414l3.013 3.013a1 1 0 0 1 0 1.414zM6.5 10a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z"
            clipRule="evenodd"
          />
        </svg>
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

export default SearchBar;
