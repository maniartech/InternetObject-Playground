import React, { useState } from 'react';
import { useParseIO } from '../../hooks/use-parse-io-v2';
import Editor from '../../components/editor/Editor';
import Output from '../../components/output/Output';
import { cn } from '../../lib/utils';
import { FileText, Database, Terminal } from 'lucide-react';

interface PlaygroundV2Props {
  showSchema: boolean;
  document: string;
  setDocument: (doc: string) => void;
  schema: string;
  setSchema: (schema: string) => void;
  minifiedOutput: boolean;
  skipErrors: boolean;
}

export default function PlaygroundV2({
  showSchema,
  document,
  setDocument,
  schema,
  setSchema,
  minifiedOutput,
  skipErrors,
}: PlaygroundV2Props) {
  const { markers, defMarkers, jsonText, error, errorMessages, errorItems, isParsing } = useParseIO(
    document,
    schema,
    showSchema,
    minifiedOutput,
    skipErrors,
    { useWorker: true, debug: false }
  );

  const [activeTab, setActiveTab] = useState<'document' | 'schema'>('document');
  const [isOutputExpanded, setIsOutputExpanded] = useState(false);

  return (
    <div className="flex flex-col h-full relative">
      {/* Mobile Layout */}
      <div className="flex flex-col h-full md:hidden">
        {/* Tabs */}
        <div className="flex border-b border-border bg-muted/5">
          <button
            className={cn(
              "flex-1 p-3 text-sm font-medium flex items-center justify-center gap-2 transition-all rounded-t-md border-t-2 relative",
              activeTab === 'document'
                ? "border-t-primary bg-background text-primary border-x border-border border-b-background mb-[-1px] z-10"
                : "border-t-transparent bg-transparent text-muted-foreground border-b-transparent hover:bg-muted/5 hover:text-foreground"
            )}
            onClick={() => setActiveTab('document')}
          >
            <FileText className="w-4 h-4" />
            Document
          </button>
          <button
            className={cn(
              "flex-1 p-3 text-sm font-medium flex items-center justify-center gap-2 transition-all rounded-t-md border-t-2 relative",
              activeTab === 'schema'
                ? "border-t-primary bg-background text-primary border-x border-border border-b-background mb-[-1px] z-10"
                : "border-t-transparent bg-transparent text-muted-foreground border-b-transparent hover:bg-muted/5 hover:text-foreground"
            )}
            onClick={() => setActiveTab('schema')}
          >
            <Database className="w-4 h-4" />
            Schema
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative">
          <div className={cn("absolute inset-0", activeTab === 'document' ? 'z-10' : 'z-0 hidden')}>
            <Editor
              value={document}
              onChange={setDocument}
              markers={markers}
            />
          </div>
            <div className={cn("absolute inset-0", activeTab === 'schema' ? 'z-10' : 'z-0 hidden')}>
              <Editor
                value={schema}
                onChange={setSchema}
                markers={defMarkers}
              />
            </div>
        </div>

        {/* Bottom Result Pane */}
        <div className="flex flex-col border-t bg-background z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div
            className="flex items-center justify-between p-2 bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
            onClick={() => setIsOutputExpanded(!isOutputExpanded)}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Terminal className="w-4 h-4" />
              Result
              <span className="text-xs text-muted-foreground font-normal ml-2">
                {jsonText.length} bytes
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {isOutputExpanded ? 'Collapse' : 'Expand'}
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden relative",
              isOutputExpanded ? "h-[40vh]" : "h-0"
            )}
          >
             <Output
               value={jsonText}
               error={error}
               errorMessages={errorMessages}
               errorItems={errorItems}
               isParsing={isParsing}
             />
          </div>
        </div>
      </div>

      {/* Desktop Layout (Unchanged logic, just hidden on mobile) */}
      <div className="hidden md:flex h-full">
        <div className="w-1/2 flex flex-col border-r">
          {showSchema && (
            <div className="h-1/3 border-b flex flex-col">
              <div className="bg-muted px-3 py-1.5 text-xs font-medium flex items-center gap-2 border-b">
                <Database className="w-3 h-3" /> Schema
              </div>
              <div className="flex-1 relative">
                <Editor
                  value={schema}
                  onChange={setSchema}
                  markers={defMarkers}
                />
              </div>
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <div className="bg-muted px-3 py-1.5 text-xs font-medium flex items-center gap-2 border-b">
              <FileText className="w-3 h-3" /> Document
            </div>
            <div className="flex-1 relative">
              <Editor
                value={document}
                onChange={setDocument}
                markers={markers}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-background">
           <div className="bg-muted px-3 py-1.5 text-xs font-medium flex justify-between items-center border-b">
             <div className="flex items-center gap-2">
               <Terminal className="w-3 h-3" /> JSON Output
             </div>
             <span className="text-[10px] text-muted-foreground">{jsonText.length} bytes</span>
           </div>
           <div className="flex-1 relative">
             <Output
               value={jsonText}
               error={error}
               errorMessages={errorMessages}
               errorItems={errorItems}
               isParsing={isParsing}
             />
           </div>
        </div>
      </div>
    </div>
  );
}
