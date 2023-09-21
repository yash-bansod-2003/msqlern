import { getCurrentUser } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    serverImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            const user = await getCurrentUser();
            if (!user) {
                throw new Error("unauthorized")
            }
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
        }),
        
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;