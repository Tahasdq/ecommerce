import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({children , className}: React.ComponentProps<"div">) => {
  return (
    <div
    className={cn("w-full h-auto",className)}
    >{children}</div>
  )
}

export default Container