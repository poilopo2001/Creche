import { useEffect, useCallback } from 'react';
import wsService from '../services/websocket';

export function useWebSocket(messageTypes: string[], handlers: Record<string, (data: any) => void>) {
  useEffect(() => {
    // Connect to WebSocket when component mounts
    wsService.connect();

    // Subscribe to message types
    Object.entries(handlers).forEach(([type, handler]) => {
      wsService.subscribe(type, handler);
    });

    // Cleanup on unmount
    return () => {
      Object.entries(handlers).forEach(([type, handler]) => {
        wsService.unsubscribe(type, handler);
      });
    };
  }, [handlers]);

  const sendMessage = useCallback((type: string, payload: any) => {
    wsService.send(type, payload);
  }, []);

  return { sendMessage };
} 