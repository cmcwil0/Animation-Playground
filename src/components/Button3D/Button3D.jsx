import './Button3D.css'

const Button3D = ({ children }) => {
  return (
    <main>
      <button className='button-background'>
        <span className='button-front'>{children}</span>
      </button>
    </main>
  )
}

export default Button3D
