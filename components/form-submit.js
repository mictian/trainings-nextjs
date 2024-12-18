"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
    const status = useFormStatus();
    // In order to use this react hook, you must use this component inside a form tag.

    if (status.pending) {
        return <span>Creating post...</span>;
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    );
}