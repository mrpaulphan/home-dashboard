import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '#/lib/firebase-client'

export type PackageRecord = {
  id: string
  recipient: 'paul' | 'girlfriend'
  description: string
  carrier: string
  code?: string | null
  arrived_at: Date | null
  last_seen_at: Date | null
  raw_message?: string
}

const STALE_MS = 48 * 60 * 60 * 1000

function toDate(value: unknown) {
  if (value instanceof Timestamp) {
    return value.toDate()
  }

  if (value instanceof Date) {
    return value
  }

  return null
}

function getLastSeen(pkg: PackageRecord) {
  return pkg.last_seen_at ?? pkg.arrived_at
}

export function usePackages() {
  const [packages, setPackages] = useState<PackageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const packagesQuery = query(
      collection(db, 'packages'),
      orderBy('arrived_at', 'desc'),
    )

    const unsubscribe = onSnapshot(
      packagesQuery,
      (snapshot) => {
        const nextPackages = snapshot.docs.map((document) => {
          const data = document.data()

          return {
            id: document.id,
            recipient: data.recipient as PackageRecord['recipient'],
            description: String(data.description ?? ''),
            carrier: String(data.carrier ?? 'Luxor'),
            code: data.code ? String(data.code) : null,
            arrived_at: toDate(data.arrived_at),
            last_seen_at: toDate(data.last_seen_at),
            raw_message: data.raw_message ? String(data.raw_message) : undefined,
          }
        })

        setPackages(nextPackages)
        setLoading(false)
        setError(null)

        const now = Date.now()
        for (const pkg of nextPackages) {
          const lastSeen = getLastSeen(pkg)
          if (!lastSeen) {
            continue
          }

          if (now - lastSeen.getTime() > STALE_MS) {
            void deleteDoc(doc(db, 'packages', pkg.id))
          }
        }
      },
      (nextError) => {
        setError(nextError.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { packages, loading, error }
}

export async function markPackagePickedUp(packageId: string) {
  await deleteDoc(doc(db, 'packages', packageId))
}

export function formatRecipient(recipient: PackageRecord['recipient']) {
  return recipient === 'paul' ? 'Paul' : 'Sarah'
}

export function formatRelativeArrival(date: Date | null) {
  if (!date) {
    return 'Just arrived'
  }

  const diffMs = Date.now() - date.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))

  if (hours < 1) {
    return 'Just arrived'
  }

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
