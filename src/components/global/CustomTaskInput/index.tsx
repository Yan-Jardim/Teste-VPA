import { IoFlagOutline } from 'react-icons/io5';
import { MdOutlineCalendarMonth, MdOutlineLocalOffer } from 'react-icons/md';
import Divider from '../Divider';
import TextInput from '../TextInput/TextInput';

const CustomTaskInput = ({
  title,
  subtitle,
  onAddClick,
  onCancelClick,
}: {
  title: string;
  subtitle: string;
  onAddClick: () => void;
  onCancelClick: () => void;
}) => {
  return (
    <div className="border-2 border-purple-500 rounded-lg p-4 w-[260px] max-w-md shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">
        Post para "{title}"
      </h3>
      <TextInput showIcon={false} type="text" />
      <Divider />
      <div className="flex space-x-2 mb-1 mt-2">
        <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
          <MdOutlineCalendarMonth color="#8F8F8F" />
        </button>
        <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
          <IoFlagOutline color="#8F8F8F" />
        </button>
        <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
          <MdOutlineLocalOffer color="#8F8F8F" />
        </button>
      </div>
    </div>
  );
};

export default CustomTaskInput;
