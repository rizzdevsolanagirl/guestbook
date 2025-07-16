import { IGuestbookEntryWithAuthor } from '@/models/guestbook.models'
import { useCallback, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'guestbook_entries_v1'

function getEntriesFromStorage(): IGuestbookEntryWithAuthor[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveEntriesToStorage(entries: IGuestbookEntryWithAuthor[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries))
}

export function useGuestbookEntries({ page = 1, pageSize = 10 } = {}) {
  const [entries, setEntries] = useState<IGuestbookEntryWithAuthor[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  })

  useEffect(() => {
    const allEntries = getEntriesFromStorage()
    setEntries(allEntries)
    setPagination({
      page,
      pageSize,
      totalCount: allEntries.length,
      totalPages: Math.max(1, Math.ceil(allEntries.length / pageSize)),
    })
  }, [page, pageSize])

  const paginatedEntries = entries.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)

  const addEntry = useCallback((entry: IGuestbookEntryWithAuthor) => {
    setEntries(prev => {
      const updated = [entry, ...prev]
      saveEntriesToStorage(updated)
      setPagination(p => ({
        ...p,
        totalCount: updated.length,
        totalPages: Math.max(1, Math.ceil(updated.length / p.pageSize)),
      }))
      return updated
    })
  }, [])

  const updateEntries = useCallback((newEntries: IGuestbookEntryWithAuthor[]) => {
    setEntries(newEntries)
    saveEntriesToStorage(newEntries)
    setPagination(p => ({
      ...p,
      totalCount: newEntries.length,
      totalPages: Math.max(1, Math.ceil(newEntries.length / p.pageSize)),
    }))
  }, [])

  return {
    entries: paginatedEntries,
    pagination,
    addEntry,
    updateEntries,
    reload: () => setEntries(getEntriesFromStorage()),
  }
}

export { getEntriesFromStorage, saveEntriesToStorage } 