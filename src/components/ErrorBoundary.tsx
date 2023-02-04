import {
  Children,
  cloneElement,
  ErrorInfo,
  Fragment,
  ReactElement,
  ReactNode,
  useReducer
} from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

type ErrorState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type ErrorAction =
  | { type: 'SET_ERROR'; error: Error; errorInfo: React.ErrorInfo }
  | { type: 'CLEAR_ERROR' };

const errorReducer = (state: ErrorState, action: ErrorAction) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        hasError: true,
        error: action.error,
        errorInfo: action.errorInfo
      };
    case 'CLEAR_ERROR':
      return {
        hasError: false,
        error: null,
        errorInfo: null
      };
    default:
      return state;
  }
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [state, dispatch] = useReducer(errorReducer, {
    hasError: false,
    error: null,
    errorInfo: null
  });

  const { error, errorInfo, hasError } = state;

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    dispatch({ type: 'SET_ERROR', error, errorInfo });
  };

  if (hasError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-red-100">
        <h1 className="text-3xl font-bold text-red-700">
          Something went wrong.
        </h1>
        <p className="text-red-700">{error && error.toString()}</p>
        <p className="text-red-700">{errorInfo && errorInfo.componentStack}</p>
      </div>
    );
  }

  return (
    <Fragment>
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, {
          onError: handleError
        })
      )}
    </Fragment>
  );
};

export default ErrorBoundary;
