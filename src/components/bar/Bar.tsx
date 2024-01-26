
import                             './Bar.css'

interface BarProps {
  label: string;
  bgColor?: string;
  children?: any;
  bytes?: string;
}

const Bar = ({ label, bgColor, children, bytes }: BarProps) => {

  return (
    <div className='bar' style={{backgroundColor: bgColor}}>
      <p>{label} {bytes && <span className="count" title={`${bytes} bytes`}>{bytes}</span>} </p>
      { children }
    </div>
  )
}

export default Bar