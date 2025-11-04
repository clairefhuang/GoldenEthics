import React, { useState, useMemo, useCallback } from 'react';
import { facultyData } from './data/faculty_data';
import type { FacultyPublication } from './types';
import FacultyCard from './components/FacultyCard';
import Header from './components/Header';
import AddEditModal from './components/AddEditModal';
import ConfirmationModal from './components/ConfirmationModal';

const App: React.FC = () => {
  const [publications, setPublications] = useState<FacultyPublication[]>(() => {
    const saved = localStorage.getItem('publications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return facultyData
      .filter(p => p.title && p.year)
      .map((p, index) => ({ ...p, id: `${p.netID}-${index}` }));
  });

  React.useEffect(() => {
    localStorage.setItem('publications', JSON.stringify(publications));
  }, [publications]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<FacultyPublication | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletingPublicationId, setDeletingPublicationId] = useState<string | null>(null);

  const filteredPublications = useMemo(() => {
    if (!searchQuery) return publications;
    return publications.filter(p =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.year?.toString().includes(searchQuery)
    );
  }, [searchQuery, publications]);

  // Memoized callbacks to prevent prop identity changes
  const handleAddNew = useCallback(() => {
    setEditingPublication(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((pub: FacultyPublication) => {
    setEditingPublication(pub);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setDeletingPublicationId(id);
    setIsConfirmModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deletingPublicationId) {
      setPublications(pubs => pubs.filter(p => p.id !== deletingPublicationId));
      setIsConfirmModalOpen(false);
      setDeletingPublicationId(null);
    }
  }, [deletingPublicationId]);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleSave = useCallback(
    (pub: Omit<FacultyPublication, 'id'> & { id?: string }) => {
      setPublications(prev => {
        if (pub.id) {
          return prev.map(p => (p.id === pub.id ? { ...p, ...pub } : p));
        } else {
          const newPub = { ...pub, id: `new-${Date.now()}` };
          return [newPub, ...prev];
        }
      });
      setIsModalOpen(false);
      setEditingPublication(null);
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header onAddNew={handleAddNew} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {filteredPublications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map(pub => (
              <FacultyCard
                key={pub.id}
                publication={pub}
                onEdit={() => handleEdit(pub)}
                onDelete={() => handleDelete(pub.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-500">No publications found.</h2>
            <p className="text-gray-400 mt-2">Try adjusting your search query or add a new publication.</p>
          </div>
        )}
      </main>

      {/* Always render modal; control visibility via isOpen */}
      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        publication={editingPublication}
      />

      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Publication"
          message="Are you sure you want to delete this publication record? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default App;
