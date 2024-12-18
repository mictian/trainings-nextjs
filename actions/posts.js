"use server"; // THIS IS IMPORTANT

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Server Action are now called Server Functions by react
// https://react.dev/reference/rsc/server-functions
export async function createPost(prevState, formData) { // Note that async in mandatory for server actions
    // "use server"; // This is needed to create a explicit server action.
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length == 0) {
        errors.push('Title is required');
    }
    if (!content || content.trim().length == 0) {
        errors.push('Content is required');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required');
    }

    if (errors.length > 0) {
        return {
            errors
        };
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (e) {
        throw new Error("Image upload files, post wat not created. PLease try again later");
    }


    await storePost({
        imageUrl,
        title,
        content,
        userId: 1
    });

    redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
    await updatePostLikeStatus(postId, 2);
    // More about revalidatePath function, https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    revalidatePath('/feed', 'layout');
}
