import React, { useState, useEffect } from 'react';
import { Share2, Settings, Play, Box } from 'lucide-react';
import PlaygroundV2 from './PlaygroundV2';
import sampleData from '../../sample-data';
import { cn } from '../../lib/utils';

export default function AppV2() {
  const [sampleId, setSampleId] = useState<string>('simple');
  const [document, setDocument] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [minifiedOutput, setMinifiedOutput] = useState<boolean>(false);
  const [skipErrors, setSkipErrors] = useState<boolean>(true);

  // Load initial sample
  useEffect(() => {
    const found = sampleData.find(sampleId);
    if (found) {
      setDocument(found.doc || '');
      setSchema(found.schema || '');
      setShowSchema(!!found.schema);
    }
  }, [sampleId]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-4 justify-between shrink-0 bg-card z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Box className="w-6 h-6" />
            <span className="font-bold text-lg hidden sm:inline-block">IO Playground</span>
          </div>

          <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

          <select
            className="bg-transparent border rounded-md px-2 py-1.5 text-sm max-w-[160px] sm:max-w-[240px] focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={sampleId}
            onChange={(e) => setSampleId(e.target.value)}
          >
            {sampleData.groups.map((group, i) => (
              <optgroup key={i} label={group.group}>
                {group.items.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors" title="Run (Auto-runs)">
             <Play className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors" title="Share">
             <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors" title="Settings">
             <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <PlaygroundV2
          showSchema={true}
          document={document}
          setDocument={setDocument}
          schema={schema}
          setSchema={setSchema}
          minifiedOutput={minifiedOutput}
          skipErrors={skipErrors}
        />
      </main>
    </div>
  );
}
