
import React from 'react';
import type { FacultyPublication } from '../types';

interface FacultyCardProps {
  publication: FacultyPublication;
  onEdit: () => void;
  onDelete: () => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const FacultyCard: React.FC<FacultyCardProps> = ({ publication, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">{publication.department_name}</p>
          {publication.year && (
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{publication.year}</span>
          )}
        </div>
        <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
          {publication.title || "No Title Provided"}
        </h3>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          {publication.first_name} {publication.last_name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{publication.college_or_school}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onEdit}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <EditIcon />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
