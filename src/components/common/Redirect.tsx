'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function Redirect({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter()
  useEffect(() => {
    if (replace) router.replace(to)
    else router.push(to)
  }, [to, replace, router])
  return null
}
