import LZString from 'lz-string';

/** Session/local storage keys — unchanged from the original playground. */
export const SESSION_KEYS = {
  sampleId: 'io-playground-sample-id',
  doc: 'io-playground-doc',
  schema: 'io-playground-schema',
  showSchema: 'io-playground-show-schema',
} as const;

export const LOCAL_KEYS = {
  minified: 'minifiedOutput',
  skipErrors: 'skipErrors',
  visited: 'io-playground-visited',
} as const;

export interface ShareState {
  document: string;
  schema: string;
  showSchema: boolean;
  minifiedOutput: boolean;
  skipErrors: boolean;
}

/** Build the shareable URL with LZ-compressed doc/schema + settings flags. */
export function buildShareUrl(s: ShareState): string {
  const params = {
    d: LZString.compressToEncodedURIComponent(s.document),
    s: LZString.compressToEncodedURIComponent(s.schema),
    sep: s.showSchema ? 'true' : 'false',
    min: s.minifiedOutput ? 'true' : 'false',
    skip: s.skipErrors ? 'true' : 'false',
  };
  const url = new URL(window.location.origin + '/');
  url.search = new URLSearchParams(params).toString();
  return url.toString();
}

export const decodeShared = (v: string | null): string | null =>
  v ? LZString.decompressFromEncodedURIComponent(v) || '' : null;
