'use client'

import { useState, useEffect } from 'react'
import { Message } from '@/lib/supabase'

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [response, setResponse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [filter])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const url = filter === 'all' 
        ? '/api/messages' 
        : `/api/messages?status=${filter}`
      
      const res = await fetch(url)
      const data = await res.json()
      
      if (data.success) {
        setMessages(data.data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, status: Message['status'], responseText?: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status,
          response: responseText 
        }),
      })

      const data = await res.json()

      if (data.success) {
        fetchMessages()
        if (selectedMessage?.id === id) {
          setSelectedMessage(data.data)
        }
      }
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Message['status']) => {
    const badges = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      responded: 'bg-green-100 text-green-800',
    }
    return badges[status]
  }

  const getStatusLabel = (status: Message['status']) => {
    const labels = {
      new: 'Nuevo',
      read: 'Leído',
      responded: 'Respondido',
    }
    return labels[status]
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            {(['all', 'new', 'read', 'responded'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'Todos' : getStatusLabel(f)}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar mensajes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-primary">
              Mensajes ({filteredMessages.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-secondary">Cargando...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-secondary">No hay mensajes</div>
            ) : (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-accent/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-primary">{message.name}</div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(message.status)}`}>
                      {getStatusLabel(message.status)}
                    </span>
                  </div>
                  <div className="text-sm text-secondary mb-1">{message.email}</div>
                  <div className="text-sm text-secondary mb-2">{message.service}</div>
                  <div className="text-sm text-secondary line-clamp-2">{message.message}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(message.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-lg shadow-sm">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-primary">{selectedMessage.name}</h3>
                  <p className="text-sm text-secondary mt-1">{selectedMessage.email}</p>
                  <p className="text-sm text-secondary">{selectedMessage.phone}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(selectedMessage.status)}`}>
                  {getStatusLabel(selectedMessage.status)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Servicio</label>
                  <p className="text-secondary">{selectedMessage.service}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Mensaje</label>
                  <p className="text-secondary whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Fecha</label>
                  <p className="text-secondary">
                    {new Date(selectedMessage.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <label htmlFor="response" className="block text-sm font-medium text-primary mb-2">
                    Notas internas
                  </label>
                  <textarea
                    id="response"
                    rows={4}
                    value={response || selectedMessage.response || ''}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Agrega notas o una respuesta..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'read', response || selectedMessage.response || undefined)}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    Marcar como leído
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'responded', response || selectedMessage.response || undefined)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    Marcar como respondido
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-secondary">
              Selecciona un mensaje para ver los detalles
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

