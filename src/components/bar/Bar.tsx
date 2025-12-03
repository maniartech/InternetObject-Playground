import './Bar.css'

interface BarProps {
  label         : string;
  bgColor?      : string;
  children?     : React.ReactNode;
  bytes?        : number;
  outputBytes?  : number;
  minified?     : boolean;
  isError?      : boolean;
  title?        : string;
}

const Bar = ({ label, bgColor, children, bytes, title, outputBytes, minified, isError}: BarProps) => {
  bytes     = bytes || 0
  const perc = 100 - (outputBytes ? (bytes / outputBytes) * 100 : 0)
  const percText = perc > 0 ? `${perc.toFixed(2)}% Smaller` : `${Math.abs(perc).toFixed(2)}% Larger`

  const showBar = !!bytes && !isError
  const barStyle = bgColor ? { '--bar-bg-color': bgColor } as React.CSSProperties : undefined
  return (
    <div className='bar' style={barStyle} title={title}>
      <p>{label} {showBar && <span className="count" title={`${bytes} bytes in ${label}`}>{bytes} Bytes</span>}
      &nbsp;
      </p>
      {showBar && !!outputBytes && <span className="comparision" title={`${bytes} bytes in ${label}`}>{percText} than { minified ? 'minified ' : ''}JSON</span>}
      { children }
    </div>
  )
}

export default Bar
