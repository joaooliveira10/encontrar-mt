'use client';
import React from 'react';

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, info: any) { console.error('Boundary error', error, info); }
  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-sm text-red-700">Ocorreu um erro inesperado. Recarregue a página.</div>;
    }
    return this.props.children;
  }
}
