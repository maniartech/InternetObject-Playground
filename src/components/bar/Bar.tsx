import './Bar.css'

interface BarProps {
  label         : string;
  bgColor?      : string;
  children?     : any;
  bytes?        : number;
  outputBytes?  : number;
  compressed?   : boolean;
}

const Bar = ({ label, bgColor, children, bytes, outputBytes, compressed}: BarProps) => {
  bytes     = bytes || 0
  const perc = 100 - (outputBytes ? (bytes / outputBytes) * 100 : 0)
  const percText = perc > 0 ? `${perc.toFixed(2)}% Smaller` : `${Math.abs(perc).toFixed(2)}% Larger`

  return (
    <div className='bar' style={{backgroundColor: bgColor}}>
      <p>{label} {bytes !== 0 && <span className="count" title={`${bytes} bytes in ${label}`}>{bytes} Bytes</span>}
      &nbsp;
      {bytes !== 0 && !!outputBytes && <span className="comparision" title={`${bytes} bytes in ${label}`}>{percText} than { compressed ? 'compressed ' : ''}JSON</span>}
      </p>
      { children }
    </div>
  )
}

export default Bar