"use client";

import React from 'react'
import { ThemeProvider } from "@/components/theme-provider";

const MyThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={true}
        >
            {children}
        </ThemeProvider>
    )
}

export default MyThemeProvider
