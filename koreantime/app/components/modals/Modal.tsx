"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    disabled,
    children,
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

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

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
        >
            <div
                className="
            relative
            w-[40rem]
            s:3/5
            md : w-4/6
            lg : w-3/6
            xl : w-2/5
            my-6
            mx-auto
            h-auto
           
        "
            >
                <div
                    className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                `}
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
                            <button
                                onClick={handleClose}
                                className="
                                p-1
                                border-0
                                hover:opactiy-7
                                transition
                                absolute
                                left-8
                                "
                            >
                                <IoMdClose size={15} />
                            </button>

                            <div className="text-lg font-semibold">{title}</div>
                        </div>

                        <div className="relative p-6 flex-auto">{body}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
