import { ErrorInfo, PropsWithChildren } from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
  onError: (error: Error, errorInfo: ErrorInfo) => void;
  modalTitle: string;
  modalDescription: string;
  buttonTitle: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
