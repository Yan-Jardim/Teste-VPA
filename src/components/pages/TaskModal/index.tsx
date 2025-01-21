import React, { useState, useEffect } from 'react';
import Divider from '@/components/global/Divider';
import { AiOutlineClose } from 'react-icons/ai';
import { IoFlagOutline } from 'react-icons/io5';
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdMoreVert,
  MdOutlineCalendarMonth,
  MdOutlineLocalOffer,
} from 'react-icons/md';
import { TfiLayoutAccordionSeparated } from 'react-icons/tfi';
import { FaRegFolderOpen } from 'react-icons/fa';
import { AiOutlinePaperClip, AiOutlinePicture } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';

const LOCAL_STORAGE_KEY = 'task_comments';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
  images?: string[];
}

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  labels?: string[];
  comments?: Comment[];
}

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  subProjectName: string;
  task: Task | null;
  onSave: (updatedTask: Task | null) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
  projectName,
  subProjectName,
  onSave,
  onNext,
  onPrevious,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState<Comment[]>(task?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      const savedComments = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_${task.id}`
      );
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments(task.comments || []);
      }
    }
  }, [task]);

  useEffect(() => {
    if (task) {
      localStorage.setItem(
        `${LOCAL_STORAGE_KEY}_${task.id}`,
        JSON.stringify(comments)
      );
    }
  }, [comments, task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      comments,
    };
    onSave(updatedTask);
    onClose();
  };

  const handleDeleteTask = () => {
    setIsDeleting(false);
    onSave(null);
    onClose();
  };

  const handleAddComment = () => {
    if (!newComment.trim() && attachedImages.length === 0) return;

    const newCommentObject: Comment = {
      id: Date.now(),
      author: 'Usuário Atual',
      content: newComment,
      date: new Date(),
      images: attachedImages,
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
    setAttachedImages([]);
  };

  const handleAttachImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setAttachedImages([...attachedImages, ...imageUrls]);
    }
  };

  const handleSelectEmoji = (emoji: string) => {
    setNewComment((prev) => prev + emoji);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative mx-4 scrollbar-thin"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onPrevious}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <MdKeyboardArrowUp className="text-gray-500" size={24} />
          </button>

          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <MdKeyboardArrowDown className="text-gray-500" size={24} />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <MdMoreVert
              onClick={() => setIsDeleting(!isDeleting)}
              className="text-gray-500"
              size={20}
            />
          </button>
          {isDeleting && (
            <div className="absolute right-0 bg-white border shadow-md rounded-lg p-2">
              <button
                onClick={handleDeleteTask}
                className="flex items-center space-x-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <MdDelete />
                <span>Excluir Tarefa</span>
              </button>
              <button
                onClick={() => setIsDeleting(false)}
                className="flex items-center space-x-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <AiOutlineClose />
                <span>Cancelar</span>
              </button>
            </div>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <AiOutlineClose className="text-gray-500" size={20} />
          </button>
        </div>
        <div className="flex items-center w-full mb-5">
          <div
            className="flex items-center text-sm"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#444648',
            }}
          >
            <div className="flex items-center w-40">
              <FaRegFolderOpen className="mr-2" />
              <span className="truncate overflow-hidden whitespace-nowrap max-w-xs">
                {projectName}
              </span>
            </div>

            <span className="px-3">/</span>

            <div className="flex items-center w-40">
              <FaRegFolderOpen className="mr-2" />
              <span className="truncate overflow-hidden whitespace-nowrap max-w-xs">
                {projectName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-semibold text-gray-800 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 pb-2"
              placeholder="Título da Tarefa"
            />

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600"
              >
                Salvar
              </button>
            </div>
          </div>

          <div className="w-full md:w-72 flex-none space-y-4">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Detalhes</h4>
            <div className="flex items-center w-full mb-5">
              <div
                className="flex items-center text-sm"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#444648',
                }}
              >
                <div className="flex items-center w-40">
                  <FaRegFolderOpen className="mr-2" />
                  <span className="truncate overflow-hidden whitespace-nowrap max-w-xs">
                    {projectName}
                  </span>
                </div>

                <span className="px-3">/</span>

                <div className="flex items-center">
                  <TfiLayoutAccordionSeparated className="mr-2" size={20} />
                  <span>{subProjectName}</span>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex justify-between">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                Data de Vencimento
              </h4>
              <MdOutlineCalendarMonth color="#8F8F8F" />
            </div>
            <Divider />
            <div className="flex justify-between">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                Prioridade
              </h4>
              <IoFlagOutline color="#8F8F8F" />
            </div>
            <Divider />
            <div className="flex justify-between">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                Etiquetas
              </h4>
              <MdOutlineLocalOffer color="#8F8F8F" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Comentários</h4>
          <div className="space-y-4 max-h-56 overflow-y-auto p-2 bg-gray-50 rounded-md border scrollbar-thin">
            {comments
              .slice()
              .reverse()
              .map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-3 rounded-md">
                  <p className="text-xs text-gray-500">
                    {comment.author} - {new Date(comment.date).toLocaleString()}
                  </p>
                  <p className="text-sm mt-2">{comment.content}</p>
                  {comment.images && (
                    <div className="mt-2 flex gap-2">
                      {comment.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Anexo"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="flex items-center gap-4 mb-2">
              <button>
                <AiOutlinePaperClip
                  size={20}
                  className="text-gray-600 hover:text-purple-500"
                />
              </button>
              <label>
                <AiOutlinePicture
                  size={20}
                  className="text-gray-600 hover:text-purple-500 cursor-pointer"
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAttachImages}
                  className="hidden"
                />
              </label>
              <button onClick={() => handleSelectEmoji('😊')}>
                <BsEmojiSmile
                  size={20}
                  className="text-gray-600 hover:text-purple-500"
                />
              </button>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comentar"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
              rows={3}
            />
            {attachedImages.length > 0 && (
              <div className="flex gap-2 mt-2">
                {attachedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setNewComment('')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600"
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
