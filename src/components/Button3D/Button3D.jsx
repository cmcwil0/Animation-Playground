import './Button3D.css'

const Button3D = ({ children, shape = 'square' }) => {

  

  return (
    <div className='button3d-wrapper'>
      <button className={`button-background background-${shape}`}>
        <span className={`button-front front-${shape}`}>{children}</span>
      </button>
    </div>
  )
}

export default Button3D
