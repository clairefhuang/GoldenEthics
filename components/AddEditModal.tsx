
import React, { useState, useEffect } from 'react';
import type { FacultyPublication } from '../types';
import Modal from './Modal';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (publication: Omit<FacultyPublication, 'id'> & { id?: string }) => void;
  publication: FacultyPublication | null;
}

const AddEditModal: React.FC<AddEditModalProps> = ({ isOpen, onClose, onSave, publication }) => {
  const [formData, setFormData] = useState<Omit<FacultyPublication, 'id'>>({
    netID: '',
    first_name: '',
    last_name: '',
    email: '',
    department_name: 'Computer Science and Engineering',
    college_or_school: 'College of Engineering',
    title: '',
    year: new Date().getFullYear(),
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (publication) {
      setFormData({
        netID: publication.netID,
        first_name: publication.first_name,
        last_name: publication.last_name,
        email: publication.email || '',
        department_name: publication.department_name,
        college_or_school: publication.college_or_school,
        title: publication.title || '',
        year: publication.year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        netID: '',
        first_name: '',
        last_name: '',
        email: '',
        department_name: 'Computer Science and Engineering',
        college_or_school: 'College of Engineering',
        title: '',
        year: new Date().getFullYear(),
      });
    }
  }, [publication, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required.';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required.';
    if (!formData.title?.trim()) newErrors.title = 'Publication title is required.';
    if (!formData.year) newErrors.year = 'Year is required.';
    else if (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const dataToSave = { ...formData, year: Number(formData.year) };
      if (publication?.id) {
        onSave({ ...dataToSave, id: publication.id });
      } else {
        onSave(dataToSave);
      }
    }
  };

  const InputField: React.FC<{name: keyof typeof formData, label: string, type?: string}> = ({ name, label, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={String(formData[name] ?? '')}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700`}
        />
        {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={publication ? 'Edit Publication' : 'Add New Publication'}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <InputField name="title" label="Publication Title" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField name="first_name" label="Author First Name" />
            <InputField name="last_name" label="Author Last Name" />
          </div>
          <InputField name="year" label="Year" type="number" />
          <InputField name="netID" label="NetID (Optional)" />
          <InputField name="department_name" label="Department" />
        </div>
        <div className="flex items-center justify-end p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          <button type="button" onClick={onClose} className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
            {publication ? 'Save Changes' : 'Add Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
