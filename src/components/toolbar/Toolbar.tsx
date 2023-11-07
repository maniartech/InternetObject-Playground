import Tab from '../tab/Tab'
import './Toolbar.css'

export default function Toolbar() {
  return (
    <div className="toolbar">
      <div className='left'>
        <Tab tabs={['IO to JSON', 'JSON to IO']} />
      </div>
      <div className='right'>
        <div className='dropdown'>
          <select name="format">
            <option selected disabled>Hello World</option>
            <option value="Javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>
    </div>
  )
}