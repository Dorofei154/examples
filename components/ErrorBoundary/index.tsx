import { Component, ErrorInfo } from 'react';

import { AppButtonProps } from '../AppButton/types';
import { AppModal } from '../AppModal';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error, errorInfo);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const modalButtons: AppButtonProps[] = [
      {
        title: this.props.buttonTitle,
        onPress: () => {
          this.setState({ hasError: false });
        },
      },
    ];
    if (this.state.hasError) {
      return (
        <AppModal
          isVisible={this.state.hasError}
          title={this.props.modalTitle}
          subTitle={this.props.modalDescription}
          buttons={modalButtons}
          iconName="alert"
          iconBackground="error"
          iconColor="white"
          iconSize={40}
          iconBackgroundSize={70}
        />
      );
    }
    return this.props.children;
  }
}
