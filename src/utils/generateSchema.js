//function to generate the schema 
 export function generateSchema(fields) {
  const result = {};
  if (!fields || !Array.isArray(fields)) return result;
  
  fields.forEach((field) => {
    const fieldName = field.name || 'unnamed';
    if (field.type === 'nested') {
      result[fieldName] = generateSchema(field.children || []);
    } else if (field.type === 'boolean') {
      result[fieldName] = false;
    } else if (field.type === 'array') {
      result[fieldName] = [];
    } else if (field.type === 'number') {
      result[fieldName] = 0;
    } else {
      result[fieldName] = '';
    }
  });
  return result;
}

