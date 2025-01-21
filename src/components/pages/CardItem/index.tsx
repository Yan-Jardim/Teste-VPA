import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import TextInput from '@/components/global/TextInput/TextInput';
import Button from '@/components/global/Button';

interface CardItemProps {
  id: number;
  text: string;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  setIsEditing: any;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  text,
  onEdit,
  onDelete,
  isEditing,
  setIsEditing,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSaveEdit = () => {
    onEdit(id, editedText);
    setIsEditing(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-4 py-2 border-b border-gray-200">
      {isEditing ? (
        <div className="flex flex-col">
          <TextInput
            type="text"
            value={editedText}
            onInputChange={(e) => setEditedText(e)}
            showIcon={false}
          />
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} text={'Salvar'} />
            <Button
              onClick={() => {
                setEditedText(text);
                setIsEditing(false);
              }}
              text={'Cancelar'}
              color="white"
              textColor="black"
            />
          </div>
        </div>
      ) : (
        <span className="text-gray-700 font-medium text-center w-full">
          {text}
        </span>
      )}

      {!isEditing && (
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
      )}

      {isMenuOpen && !isEditing && (
        <div className="absolute right-4 top-10 bg-white shadow-lg rounded-lg w-40 z-50 border">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
          >
            <AiOutlineEdit className="w-4 h-4" /> Editar
          </button>
          <button
            onClick={() => onDelete(id)}
            className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
          >
            <AiOutlineDelete className="w-4 h-4" /> Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
