import { Controller, useWatch } from 'react-hook-form';
import SchemaBuilder from './SchemaBuilder';
import { Trash2 } from 'lucide-react';

export default function SchemaRow({ control, name, remove, level = 0 }) {
  const type = useWatch({
    control,
    name: `${name}.type`,
  });

  const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 ${indentClass}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 min-w-0">
            <input
              {...control.register(`${name}.name`, { required: true })}
              placeholder="Field name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
            />
          </div>
          
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Controller
              control={control}
              name={`${name}.type`}
              render={({ field }) => (
                <select 
                  {...field} 
                  className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="array">Array</option>
                  <option value="nested">Nested Object</option>
                </select>
              )}
            />
          </div>
          

          {/* delete logic */}
          <button
            onClick={remove}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>


        {/* Nesting of fields  */}
        {type === 'nested' && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Nested Fields:</span>
            </div>
            <SchemaBuilder control={control} name={`${name}.children`} level={level + 1} />
          </div>
        )}
      </div>
    </div>
  );
}
