import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: corsHeaders,
      });
    }

    try {
      const { transaction_id } = await req.json();

      if (!transaction_id) {
        return Response.json(
          {
            success: false,
            message: "Transaction ID is required.",
          },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Deno.env.get("FLW_SECRET_KEY")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      return Response.json(
        {
          success: true,
          flutterwave: data,
        },
        {
          headers: corsHeaders,
        }
      );
    } catch (err) {
      return Response.json(
        {
          success: false,
          message: err.message,
        },
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  }),
};