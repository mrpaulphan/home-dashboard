import { useEffect } from 'react'
import { registerServiceWorker } from '#/lib/push-client'
import { EnableNotifications } from '#/components/EnableNotifications'
import { InstallPrompt } from '#/components/InstallPrompt'

export function PwaShell() {
  useEffect(() => {
    if (import.meta.env.PROD) {
      void registerServiceWorker()
    }
  }, [])

  return (
    <>
      <InstallPrompt />
      <EnableNotifications />
    </>
  )
}
