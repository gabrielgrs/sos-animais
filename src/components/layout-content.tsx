'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
}

export function LayoutContent({ children }: Props) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, translateY: '50px' }}
      animate={{ opacity: 1, translateY: '0px' }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-6xl p-8"
    >
      {children}
    </motion.div>
  )
}
