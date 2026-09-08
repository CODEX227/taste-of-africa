import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    try {
      const {
        amount,
        email,
        phone,
        name,
        tx_ref,
        logo
      } = await req.json();

      const secret = Deno.env.get("FLW_SECRET_KEY");

      if (!secret) {
        return Response.json(
          { success: false, message: "Flutterwave Secret Key not found." },
          { status: 500 }
        );
      }

      const flutterwaveResponse = await fetch(
        "https://api.flutterwave.com/v3/payments",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx_ref,
            amount,
            currency: "NGN",
            redirect_url: link,
            payment_options: "card,banktransfer,ussd",
            customer: {
              email,
              phone_number: phone,
              name,
            },
            customizations: {
              title: "Taste Of Africa",
              description: "Food Order Payment",
              logo: logo,
            },
          }),
        }
      );

      const data = await flutterwaveResponse.json();

      return Response.json(data, {
        status: flutterwaveResponse.status,
      
      });
    } catch (err: any) {
      return Response.json(
        {
          success: false,
          message: err.message,
        },
        { status: 500 }
      );
    }
  }),
};