import { useState } from "react"

const portals = [Gradient, ascii, roulette]

const PortalSelector = () => {
    const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="absolute bottom-7 left-10">
      <button
        onClick={() => setIsToggled(!isToggled)}
        className="rounded-full bg-(--secondary-color) w-10 h-10 duration-500 cursor-pointer border-3 border-(--secondary-color)
                    hover:bg-transparent hover:scale-115"
        >
      </button>
        {isToggled === true &&
            <ul>

            </ul>
        }
    </div>
  )
}

export default PortalSelector
