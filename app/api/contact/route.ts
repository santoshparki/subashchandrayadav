import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { enquirySchema, optionalText } from "@/lib/validation";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (String(body.website || "").trim()) return NextResponse.json({ success: true });
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Please check the form fields." }, { status: 400 });
    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        phone: optionalText(parsed.data.phone),
        location: optionalText(parsed.data.location),
        opportunityType: parsed.data.opportunityType,
        companyName: optionalText(parsed.data.companyName),
        preferredContactMethod: parsed.data.preferredContactMethod,
        message: parsed.data.message
      }
    });

    const profile = await prisma.profile.findUnique({ where: { id: 1 }, select: { email: true, name: true } });
    const recipient = process.env.CONTACT_TO_EMAIL || profile?.email;
    if (recipient && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: recipient,
        replyTo: parsed.data.email,
        subject: `Portfolio enquiry: ${parsed.data.opportunityType}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#101816"><p style="color:#b47a45;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">New portfolio enquiry</p><h1>Message from ${escapeHtml(parsed.data.fullName)}</h1><p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p><p><strong>Phone:</strong> ${escapeHtml(parsed.data.phone || "Not provided")}</p><p><strong>Location:</strong> ${escapeHtml(parsed.data.location || "Not provided")}</p><p><strong>Type:</strong> ${escapeHtml(parsed.data.opportunityType)}</p><p><strong>Company:</strong> ${escapeHtml(parsed.data.companyName || "Not provided")}</p><p><strong>Preferred contact:</strong> ${escapeHtml(parsed.data.preferredContactMethod)}</p><div style="margin-top:24px;padding:24px;background:#f2f0e9;line-height:1.7;white-space:pre-wrap">${escapeHtml(parsed.data.message)}</div><p style="margin-top:24px;color:#68736f;font-size:12px">Saved as enquiry ${escapeHtml(enquiry.id)} in ${escapeHtml(profile?.name || "your portfolio")}.</p></div>`,
        text: `New portfolio enquiry\n\nName: ${parsed.data.fullName}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone || "Not provided"}\nLocation: ${parsed.data.location || "Not provided"}\nType: ${parsed.data.opportunityType}\nCompany: ${parsed.data.companyName || "Not provided"}\nPreferred contact: ${parsed.data.preferredContactMethod}\n\n${parsed.data.message}`
      });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
