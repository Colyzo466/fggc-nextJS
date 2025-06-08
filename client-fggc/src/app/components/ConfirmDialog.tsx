"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ConfirmDialog({ open, onClose, onConfirm, title, description }: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-gray-900 border border-yellow-700 rounded-xl shadow-xl p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold text-yellow-300 mb-2">{title}</Dialog.Title>
              {description && <Dialog.Description className="text-yellow-100 mb-4">{description}</Dialog.Description>}
              <div className="flex gap-4 justify-end mt-6">
                <button
                  className="px-4 py-2 rounded bg-gray-700 text-yellow-200 hover:bg-gray-600"
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
                  onClick={() => { onConfirm(); onClose(); }}
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
