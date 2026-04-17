import { useReducer, useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import ReactDOM from 'react-dom';

const initialState = {
    result: null,
    isOpen: false,
    isLoading: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, isLoading: true };
        case 'SUCCESS':
            return {
                ...state,
                isLoading: false,
                result: action.payload,
                isOpen: true,
            };
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                result: { error: 'Failed to connect to backend.' },
                isOpen: true,
            };
        case 'CLOSE_MODAL':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export const SubmitButton = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { result, isOpen, isLoading } = state;

    const { nodes, edges } = useStore(
        (s) => ({ nodes: s.nodes, edges: s.edges }),
        shallow
    );

    const handleSubmit = useCallback(async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(
                'http://localhost:8000/pipelines/parse',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nodes, edges }),
                }
            );

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            dispatch({ type: 'SUCCESS', payload: data });
        } catch (error) {
            console.error('Error submitting:', error);
            dispatch({ type: 'ERROR' });
        }
    }, [nodes, edges]);

    return (
        <div className="submit-container">
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? 'Analyzing...' : 'Submit'}
            </button>

            {isOpen && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Pipeline Analysis</h3>

                        {result?.error ? (
                            <p className="text-danger">{result.error}</p>
                        ) : (
                            <div className="modal-stats-grid">
                                <div className="stat-row">
                                    <span className="stat-label">Nodes</span>
                                    <span className="stat-value">{result?.num_nodes}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Edges</span>
                                    <span className="stat-value">{result?.num_edges}</span>
                                </div>
                                
                                <div className="modal-divider-minimal" />
                                
                                <div className="stat-row">
                                    <span className="stat-label">Is DAG</span>
                                    <span className={`stat-value ${result?.is_dag ? 'text-success' : 'text-danger'}`}>
                                        {result?.is_dag ? 'YES' : 'NO'}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            className="modal-close-btn"
                            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                        >
                            Close
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};