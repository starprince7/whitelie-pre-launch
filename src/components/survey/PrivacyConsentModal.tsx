'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface PrivacyConsentModalProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyConsentModal({
  open,
  onAccept,
  onDecline,
}: PrivacyConsentModalProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-10 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold text-white mb-6"
                >
                  Privacy Policy & Consent
                </Dialog.Title>
                
                <div className="mb-8">
                  <div className="prose prose-invert max-w-none text-neutral-300">
                    <p className="mb-4">
                      At WhiteLie, we take your privacy seriously. Before you participate in our market validation survey, please review how we'll use your data:
                    </p>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Data Collection</h4>
                    <p className="mb-4">
                      We collect the information you provide in this survey, including your preferences, opinions, and contact details if you choose to share them.
                    </p>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Data Usage</h4>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>To validate our market assumptions and improve our service offerings</li>
                      <li>To contact you regarding the beta launch if you opt into our waitlist</li>
                      <li>To analyze market segments and preferences in aggregate</li>
                    </ul>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Data Protection</h4>
                    <p className="mb-4">
                      Your data is stored securely and we implement appropriate measures to protect it from unauthorized access.
                    </p>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Data Retention</h4>
                    <p className="mb-4">
                      We retain your personal information for 12 months, after which it will be anonymized for analytical purposes.
                    </p>
                    
                    <h4 className="text-lg font-medium text-white mt-6 mb-3">Your Rights</h4>
                    <p className="mb-4">
                      You have the right to access, correct, or request deletion of your data by contacting us at privacy@whitelie.com.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg px-6 py-3 text-sm font-medium bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    onClick={handleDecline}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg px-8 py-3 text-sm font-medium bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black transition-colors"
                    onClick={handleAccept}
                  >
                    I Accept
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
