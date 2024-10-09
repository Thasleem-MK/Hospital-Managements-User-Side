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
