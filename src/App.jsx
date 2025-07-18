import { useForm } from "react-hook-form";
import { generateSchema } from "./utils/generateSchema";
import SchemaBuilder from "./components/SchemaBuilder";
import { useState } from "react";
import { Code, Copy, Download } from "lucide-react";
function App() {
  const [copySuccess, setCopySuccess] = useState(false);
  const { control, watch } = useForm({
    defaultValues: { fields: [] }
  });

  const schema = watch("fields");
  const generatedSchema = generateSchema(schema);
  const jsonString = JSON.stringify(generatedSchema, null, 2);

  // Copying to clipboard fucntion

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };


  // Download schema Function

  const downloadSchema = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            JSON Schema Builder
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Build and visualize JSON schemas with an intuitive interface
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Schema building panel */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Code className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">Schema Fields</h2>
              </div>
              <SchemaBuilder control={control} name="fields" />
            </div>
          </div>

          {/* preview panel */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        copySuccess
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                      }`}
                    >
                      <Copy size={16} />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadSchema}
                      className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-blue-300"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <pre className="overflow-auto text-xs sm:text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono leading-relaxed max-h-96 whitespace-pre-wrap">
                  {jsonString || '{\n  // Add fields to see the schema\n}'}
                </pre>
              </div>
            </div>


            {/* stats card  */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Schema Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {schema?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Fields</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {JSON.stringify(generatedSchema).length}
                  </div>
                  <div className="text-sm text-gray-600">JSON Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;