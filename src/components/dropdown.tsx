'use client'
import { useWrapperControl } from '@/store/utils';
import React, { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow';

function Wrapper({ children, className, isOpen, trigger }: { children: React.ReactNode, className: string, trigger:()=>void, isOpen:boolean}) {
   
    const wrapper = useRef<HTMLDivElement>(null);

    const handleClick = (e: Event) => {
        if (wrapper?.current && (!wrapper?.current?.contains(e.target as Node))) trigger()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") trigger()
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [wrapper, isOpen])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [wrapper, isOpen])
    
    return (
        isOpen ? <div ref={wrapper} className={className}>
            {children}
        </div> : null
    )
}

export default Wrapper