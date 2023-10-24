"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    body?: React.ReactElement;
    disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    body,
    disabled,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    if (!isOpen) {
        return null;
    }
    return (
        <div
            className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
        "
            onClick={handleClose}
        >
            <div
                className="
            relative
            w-[30rem]
            xs:w-[40rem]
            my-6
            mx-auto
            h-auto
           
        "
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg
                    shadow-lg
                    relative
                    flex
                    flex-col
                    w-full
                    bg-white
                    outline-none
                    focus:outline-none
                "
                    >
                        {/* header*/}
                        <div
                            className="
                        flex
                        items-center
                        p-6
                        rounded-t
                        justify-center
                        relative
                        border-b-[1px]
                    "
                        >
                            <div className="text-lg font-semibold">{title}</div>
                            <button
                                onClick={handleClose}
                                className="
                                p-1
                                border-0
                                hover:opactiy-7
                                transition
                                absolute
                                right-8
                                "
                            >
                                <IoMdClose size={15} />
                            </button>
                        </div>

                        <div className="relative p-4 flex-auto">{body}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
