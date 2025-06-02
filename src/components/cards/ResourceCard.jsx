import {
  Phone,
  UserPlus,
  Building2,
  ImageIcon
} from "lucide-react";

const ResourceCard = ({ data, onRemove }) => {
  const {
    id,
    name,
    title,
    phone,
    corporation,
    image
  } = data;

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white w-full">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <UserPlus className="text-blue-500" size={20} />
          <div>
            <div className="font-semibold text-gray-900">{name || "Unnamed"}</div>
            {title && <div className="text-sm text-gray-500">{title}</div>}
          </div>
        </div>
        <button
          className="text-sm text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        {phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} /> <span>{phone}</span>
          </div>
        )}
        {corporation && (
          <div className="flex items-center gap-2">
            <Building2 size={16} /> <span>{corporation}</span>
          </div>
        )}
        {image && (
          <div className="flex items-center gap-2">
            <ImageIcon size={16} />
            <img src={image} alt="Resource" className="w-10 h-10 object-cover rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
