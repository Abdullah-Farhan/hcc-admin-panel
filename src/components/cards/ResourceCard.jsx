import {
  Mail,
  Phone,
  MapPin,
  UserPlus
} from 'lucide-react';

const ResourceCard = ({ data, onRemove }) => {
  const {
    name,
    role,
    email,
    phone,
    department,
    location,
    description
  } = data;

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white w-full">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <UserPlus className="text-blue-500" size={20} />
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            {role && <div className="text-sm text-gray-500">{role}</div>}
          </div>
        </div>
        <button className="text-sm text-gray-500 hover:text-red-500 cursor-pointer" onClick={onRemove}>Remove</button>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail size={16} /> <span>{email}</span>
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} /> <span>{phone}</span>
          </div>
        )}
        {department && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Department:</span>
            <span>{department}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} /> <span>{location}</span>
          </div>
        )}
        {description && (
          <div className="pt-2 text-gray-600 border-t text-sm">{description}</div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
