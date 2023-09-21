'use client';

import * as React from "react";
import { keymap, EditorView, ViewUpdate } from "@codemirror/view"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { syntaxHighlighting } from "@codemirror/language"
import { MySQL } from "@codemirror/lang-sql"
import { oneDark, oneDarkHighlightStyle, oneDarkTheme, color } from "@codemirror/theme-one-dark";
import { Button } from "./ui/button";
import { api } from "@/actions";
import { Icons } from "@/components/icons";

export const CodeEditor = () => {
    const [mounted, setMounted] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [view, setView] = React.useState<EditorView | null>(null);

    const ref = React.useRef<HTMLTextAreaElement | null>(null);

    React.useEffect(() => {
        setMounted(true)
    }, []);

    React.useEffect(() => {
        if (ref.current) {
            let view = new EditorView({
                extensions: [
                    history(),
                    keymap.of([...defaultKeymap, ...historyKeymap]),
                    oneDark,
                    oneDarkTheme,
                    MySQL,
                    syntaxHighlighting(oneDarkHighlightStyle)
                ],
                doc: ref.current.value,
            });
            setView(view)
            ref.current.parentNode?.insertBefore(view.dom, ref.current);
            ref.current.style.display = "none"
        }
    }, [ref, mounted])

    if (!mounted) {
        return null;
    }

    async function handleSubmit() {
        if (!view) {
            return
        }
        const code = view.state.doc.toString();

        try {
            setIsLoading(true);
            const result = await api.post("/api/database", { query: code })
            console.log(result);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="flex flex-col gap-3 min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
        >
            <textarea
                value="select * from users"
                ref={ref}
                disabled={isLoading}
            />
            <Button
                className="w-fit self-end"
                onClick={() => handleSubmit()}
                disabled={isLoading}
            >
                {isLoading && (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                Run Query
            </Button>
        </div>
    )
}


