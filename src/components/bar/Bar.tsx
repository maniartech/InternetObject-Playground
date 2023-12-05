import                './Bar.css'

interface BarProps {
  label: string;
  bgColor?: string;
}


const Bar = ({ label, bgColor }: BarProps) => {
  return (
    <div className='bar' style={{backgroundColor: bgColor}}>
      <p>{label}</p>
    </div>
  )
}

export default Bar