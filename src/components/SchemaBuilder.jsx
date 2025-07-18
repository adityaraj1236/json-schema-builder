import { useFieldArray } from 'react-hook-form';
import SchemaRow from './SchemaRow';
import { Plus } from 'lucide-react';

export default function  SchemaBuilder({ control, name, level = 0 }) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <SchemaRow
          key={field.id}
          control={control}
          name={`${name}.${index}`}
          remove={() => remove(index)}
          level={level}
        />
      ))}
      

      {/* Addinf a new field  */}
      <button
        onClick={() => append({ name: '', type: 'string', children: [] })}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
      >
        <Plus size={18} />
        Add Field
      </button>
    </div>
  );
}
