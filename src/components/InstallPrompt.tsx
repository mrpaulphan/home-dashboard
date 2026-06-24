import { useEffect, useState } from 'react'
import { isIosDevice, isStandalonePwa } from '#/lib/push-client'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    setIsStandalone(isStandalonePwa())
    setIsIos(isIosDevice())

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  if (isStandalone) {
    return null
  }

  if (isIos) {
    return (
      <section
        className="mx-4 mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950"
        data-testid="install-ios-banner-container"
      >
        <h2
          className="text-sm font-semibold"
          data-testid="install-ios-banner-header"
        >
          Add Family Hub to your home screen
        </h2>
        <p className="mt-2 text-sm" data-testid="install-ios-banner-text">
          Push notifications on iPhone only work after installing the app. Tap
          Share, then Add to Home Screen, then open Family Hub from the new
          icon.
        </p>
      </section>
    )
  }

  if (!installEvent) {
    return null
  }

  const handleInstall = async () => {
    await installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  return (
    <section
      className="mx-4 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950"
      data-testid="install-android-banner-container"
    >
      <h2
        className="text-sm font-semibold"
        data-testid="install-android-banner-header"
      >
        Install Family Hub
      </h2>
      <p className="mt-2 text-sm" data-testid="install-android-banner-text">
        Install the app for faster access and package alerts.
      </p>
      <button
        type="button"
        className="mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white"
        data-testid="install-android-install-button"
        onClick={handleInstall}
      >
        Install app
      </button>
    </section>
  )
}
