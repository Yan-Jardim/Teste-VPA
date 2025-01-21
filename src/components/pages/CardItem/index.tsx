import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import TextInput from '@/components/global/TextInput/TextInput';
import Button from '@/components/global/Button';
import Modal from '@/components/global/Modal';

interface CardItemProps {
  id: number;
  text: string;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

const CardItem: React.FC<CardItemProps> = ({ id, text, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'delete' | null>(null);
  const [editedText, setEditedText] = useState(text);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSaveEdit = () => {
    onEdit(id, editedText);
    setIsModalOpen(false);
    setModalMode(null);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
    setModalMode(null);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-4 py-2 border-b border-gray-200">
      <span className="text-gray-700 font-medium text-center w-full">
        {text}
      </span>

      <button
        onClick={toggleMenu}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <BsThreeDotsVertical className="w-5 h-5" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-4 top-10 bg-white shadow-lg rounded-lg w-40 z-50 border">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsModalOpen(true);
              setModalMode('edit');
            }}
            className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
          >
            <AiOutlineEdit className="w-4 h-4" /> Editar
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsModalOpen(true);
              setModalMode('delete');
            }}
            className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
          >
            <AiOutlineDelete className="w-4 h-4" /> Excluir
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalMode(null);
        }}
        title={modalMode === 'edit' ? 'Editar Tarefa' : 'Confirmar Exclusão'}
      >
        {modalMode === 'edit' ? (
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              value={editedText}
              onInputChange={(value) => setEditedText(value)}
              showIcon={false}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={handleSaveEdit} text="Salvar" />
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditedText(text);
                  setModalMode(null);
                }}
                text="Cancelar"
                color="white"
                textColor="black"
              />
            </div>
          </div>
        ) : modalMode === 'delete' ? (
          <div className="flex flex-col gap-4">
            <p className="text-gray-700">
              Tem certeza de que deseja excluir esta tarefa?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleConfirmDelete}
                text="Excluir"
                color="red"
                textColor="white"
              />
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalMode(null);
                }}
                text="Cancelar"
                color="white"
                textColor="black"
              />
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default CardItem;
