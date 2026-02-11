import React from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}

const FormField = React.memo<FormFieldProps>(
  ({
    label,
    type = "text",
    placeholder,
    required = false,
    multiline = false,
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
        {label} {required && "*"}
      </label>
      {multiline ? (
        <textarea
          className="w-full h-32 p-3 bg-[#f6f5ff] rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className="w-full p-3 bg-[#f6f5ff] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          placeholder={placeholder}
        />
      )}
    </div>
  )
);

FormField.displayName = "FormField";

export default FormField;
