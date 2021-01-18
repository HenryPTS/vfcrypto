import { DependencyList, useEffect } from "react"

const useMouseDown = (cb: (ev: MouseEvent, ...args: IArguments[]) => void, deps: DependencyList) => {
  useEffect(() => {
    function handleMouseDown(ev: MouseEvent) {
      cb(ev, arguments)
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [...deps])
}

export default useMouseDown