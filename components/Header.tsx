
import React, { useState } from 'react';

interface HeaderProps {
    onAddNew: () => void;
    onSearchChange: (query: string) => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC<HeaderProps> = React.memo(({ onAddNew, onSearchChange }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        onSearchChange(value);
    };

    return (
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 tracking-tight">
                        ND Ethics Research Catalog
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64 md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by title, author, year..."
                                value={searchInput}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                        <button
                            onClick={onAddNew}
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            <PlusIcon />
                            Add New Record
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;
