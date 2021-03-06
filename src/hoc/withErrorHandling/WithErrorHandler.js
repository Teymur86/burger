import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxe/Auxe';
import ApplicationMessages from "../../messages/ApplicationMessages";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        }

        componentWillMount() {
            this.requestInterceptors = axios.interceptors.request.use((req) => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptors = axios.interceptors.response.use(res => res, error => this.setState({error}));
        }

        componentWillUnmount() {
            if (!!this.requestInterceptors ||this.requestInterceptors >= 0) {
                axios.interceptors.request.eject(this.requestInterceptors);
            }
            if (!!this.responseInterceptors || this.responseInterceptors  >= 0) {
                axios.interceptors.response.eject(this.responseInterceptors);
            }
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal  modalClosed={ this.errorConfirmedHandler }
                            show={ this.state.error }>
                        { this.state.error ? ApplicationMessages.withErrorHandlerMessage : '' }
                    </Modal>
                    <WrappedComponent { ...this.props }></WrappedComponent>
                </Aux>
            );
        }
    };
}

export default withErrorHandler;

