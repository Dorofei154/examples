import { ErrorInfo, FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { CrashlyticsService } from "@zalgiris-ventures/core";
import {
  ErrorBoundary,
  GradientBackground,
  useTheme,
} from "@zalgiris-ventures/ui";

export const ErrorBoundaryWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [t] = useTranslation("app");
  const theme = useTheme();

  const handleAppError = (error: Error, errorInfo: ErrorInfo) => {
    CrashlyticsService.reportError(error, errorInfo.componentStack);
  };

  const ErrorBoundaryComponent = (
    <ErrorBoundary
      modalTitle={t("errorBoundaryModal.title")}
      modalDescription={t("errorBoundaryModal.description")}
      buttonTitle={t("errorBoundaryModal.ctaBtn")}
      onError={handleAppError}
    >
      {children}
    </ErrorBoundary>
  );

  return Array.isArray(theme.pallette.background) ? (
    <GradientBackground colors={["#000000", "#112920"]}>
      {ErrorBoundaryComponent}
    </GradientBackground>
  ) : (
    ErrorBoundaryComponent
  );
};
