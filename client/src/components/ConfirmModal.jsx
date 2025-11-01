
import { useState, useCallback } from "react";

export function useConfirm() {
  const [state, setState] = useState({ open: false, title: "", message: "", resolve: null });

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => setState({ open: true, title, message, resolve }));
  }, []);

  const onClose = (result) => {
    state.resolve?.(result);
    setState((s) => ({ ...s, open: false, resolve: null }));
  };

  const ConfirmDialog = state.open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose(false)} />
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-lg"
        role="dialog" aria-modal="true" aria-labelledby="confirm-title"
      >
        <h3 id="confirm-title" className="text-lg font-semibold">{state.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{state.message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => onClose(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, ConfirmDialog };
}
