import { ArrowLeft } from "lucide-react";

export const FormInput = ({
  id,
  OnChange,
  placeholder,
  type,
  value,
  name,
}: {
  type: string;
  value?: any;
  placeholder: string;
  OnChange: any;
  id?: string;
  name?: string;
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={OnChange}
      className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder={placeholder}
      required
    />
  );
};

export const BackButton = ({ OnClick }: { OnClick: any }) => {
  return (
    <button
      onClick={OnClick}
      className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};
