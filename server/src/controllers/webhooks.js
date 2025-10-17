import { Webhook } from 'svix';
import User from '../models/user.js';

export const clerkwebHook = async (req, res) => {
  try {
    // 1) Build webhook verifier
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 2) Use RAW payload (Buffer) + required headers
    const payload = req.body; // Buffer from express.raw
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    // 3) Verify & parse the trusted event
    const evt = webhook.verify(payload, headers);
    const { data, type } = evt;

    // Helper: resolve primary email safely
    const primaryEmail = (() => {
      const primaryId = data.primary_email_address_id;
      if (primaryId && Array.isArray(data.email_addresses)) {
        const found = data.email_addresses.find(e => e.id === primaryId);
        if (found?.email_address) return found.email_address;
      }
      // fallback to first if primary not present in test payloads
      return data.email_addresses?.[0]?.email_address ?? null;
    })();

    // Map Clerk -> your schema (you’re using custom String _id)
    const baseDoc = {
      name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
      email: primaryEmail,
      image: data.image_url ?? null,
      resume: null,
    };

    switch (type) {
      case 'user.created': {
        // Upsert by _id to avoid duplicate-key on retries
        const result = await User.updateOne(
          { _id: data.id },
          { $setOnInsert: { _id: data.id, ...baseDoc } },
          { upsert: true }
        );
        // 200 even if already existed
        return res.status(200).json({ ok: true, upserted: !!result.upsertedId });
      }

      case 'user.updated': {
        const result = await User.updateOne({ _id: data.id }, { $set: baseDoc });
        return res.status(200).json({ ok: true, modified: result.modifiedCount });
      }

      case 'user.deleted': {
        const result = await User.deleteOne({ _id: data.id });
        return res.status(200).json({ ok: true, deleted: result.deletedCount });
      }

      default:
        // Unhandled event types should still 204 quickly
        return res.status(204).end();
    }
  } catch (err) {
    // If verification failed, respond 401; otherwise 500
    const isVerify = (err?.name || '').toLowerCase().includes('verification');
    console.error('Webhook error:', err.message);
    return res.status(isVerify ? 401 : 500).json({ ok: false, error: err.message });
  }
};
