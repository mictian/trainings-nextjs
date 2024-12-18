"use client";

import { useActionState } from "react";
import FormSubmit from "./form-submit";
import { useFormState } from "react-dom";

// NOTE that a server component can pass props to a client component.
// In this case we are setting the action function from a server component!
export default function PostForm({ action }) {

    //The second parameter is the initial value of the state.
    // const [state, formAction] = useActionState(action, {});
    const [state, formAction] = useFormState(action, {});


    return (<>
        <h1>Create a new post</h1>
        <form action={formAction}>
            <p className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p className="form-control">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                />
            </p>
            <p className="form-control">
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" />
            </p>
            <p className="form-actions">
                <FormSubmit />
            </p>
            {state.errors && (
                <ul className="form-errors">
                    {state.errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
        </form>
    </>
    );
}