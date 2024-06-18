import { 
  Dialog, 
  DialogPanel, 
  Transition, 
  TransitionChild 
} from "@headlessui/react";
import { Fragment } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingModal() {
  return (
    <Transition show as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {}}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-gray-100/50
              transition-opacity
            "
          />
        </TransitionChild>

        <div
          className="fixed inset-0 overflow-y-auto z-10"
        >
          <div
            className="flex min-h-full items-center p-4
              justify-center text-center
            "
          >
            <DialogPanel>
              <ClipLoader size={40} color="#0284c7" />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}