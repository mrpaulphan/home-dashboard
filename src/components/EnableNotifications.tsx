import { useEffect, useState } from 'react'
import {
  canSubscribeToPush,
  ensurePushSubscription,
  isStandalonePwa,
  subscribeToPush,
} from '#/lib/push-client'

export function EnableNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (!('Notification' in window)) {
      return
    }

    setPermission(Notification.permission)

    if (Notification.permission === 'granted') {
      void ensurePushSubscription()
      return
    }

    if (canSubscribeToPush()) {
      setShowPrompt(true)
    }
  }, [])

  if (!showPrompt || permission === 'granted' || permission === 'denied') {
    return null
  }

  const handleEnable = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await subscribeToPush()
      setPermission('granted')
      setShowPrompt(false)
    } catch (nextError) {
      const message =
        nextError instanceof Error
          ? nextError.message
          : 'Could not enable notifications.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const standaloneHint = isStandalonePwa()
    ? null
    : 'Install the app first to enable notifications on iPhone.'

  return (
    <section
      className="mx-4 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
      data-testid="notifications-enable-banner-container"
    >
      <h2
        className="text-sm font-semibold"
        data-testid="notifications-enable-banner-header"
      >
        Enable package alerts
      </h2>
      <p className="mt-2 text-sm" data-testid="notifications-enable-banner-text">
        Get notified when a new package arrives for either of you.
      </p>
      {standaloneHint ? (
        <p className="mt-2 text-sm text-amber-800">{standaloneHint}</p>
      ) : null}
      <button
        type="button"
        className="mt-3 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        data-testid="notifications-enable-button"
        disabled={isLoading || !canSubscribeToPush()}
        onClick={handleEnable}
      >
        {isLoading ? 'Enabling…' : 'Enable notifications'}
      </button>
      {error ? (
        <p
          className="mt-2 text-sm text-red-700"
          data-testid="notifications-enable-error-text"
        >
          {error}
        </p>
      ) : null}
    </section>
  )
}
