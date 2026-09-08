import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import { initializeApp, cert } from "npm:firebase-admin/app";
import { getAuth } from "npm:firebase-admin/auth";

const firebaseApp = initializeApp({
    credential: cert({
        projectId: Deno.env.get("FIREBASE_PROJECT_ID"),
        clientEmail: Deno.env.get("FIREBASE_CLIENT_EMAIL"),
        privateKey: Deno.env.get("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
    }),
});

const auth = getAuth(firebaseApp);

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default {
    fetch: withSupabase({ auth: "none" }, async (req) => {
        if (req.method === "OPTIONS") {
            return new Response("ok", {
                headers: corsHeaders,
            });
        }

        try {
            const { uid } = await req.json();

            if (!uid) {
                return Response.json(
                    { error: "UID is required" },
                    {
                        status: 400,
                        headers: corsHeaders,
                    }
                );
            }

            await auth.updateUser(uid, {
                disabled: true,
            });

            return Response.json(
                {
                    success: true,
                    message: "Account disabled successfully",
                },
                {
                    status: 200,
                    headers: corsHeaders,
                }
            );

        } catch (error) {
            return Response.json(
                {
                    success: false,
                    error: error.message,
                },
                {
                    status: 500,
                    headers: corsHeaders,
                }
            );
        }
    }),
};