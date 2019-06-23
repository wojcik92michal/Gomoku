import React from 'react';

interface IErrorHandlerState {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

// TODO add tests
class ErrorHandler extends React.Component<{}, IErrorHandlerState> {
    state = {
        error: null,
        errorInfo: null
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return <div>Something went wrong!</div>;
        }

        return this.props.children;
    }
}

export default ErrorHandler;
