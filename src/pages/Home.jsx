import Button3D from '../components/Button3D/Button3D'
import '../css/Home.css'
import Portal from '../components/Portal/Portal'
import PortalSelector from '../components/ui/portalSelector'

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-(--background-primary)">
      <Portal />
      <PortalSelector />


    </div>
  )
}

export default Home
