import { TextField, TextAreaField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Member } from "@/types/database";

export default function MemberForm({
  member,
  action,
}: {
  member?: Member;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="space-y-8">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Photo</label>
        {member?.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo_url} alt="" className="mb-2 h-20 w-20 rounded-xl object-cover" />
        )}
        <input type="file" name="photo" accept="image/*" className="text-sm" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" defaultValue={member?.name} required />
        <TextField label="Company" name="company" defaultValue={member?.company} />
        <TextField label="Designation" name="designation" defaultValue={member?.designation} />
        <TextField label="Business Category" name="business_category" defaultValue={member?.business_category} />
      </div>

      <TextAreaField label="Description" name="description" defaultValue={member?.description} />
      <TextAreaField label="Referral Expectations" name="referral_expectations" defaultValue={member?.referral_expectations} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone" name="phone" type="tel" defaultValue={member?.phone} />
        <TextField label="WhatsApp" name="whatsapp" type="tel" defaultValue={member?.whatsapp} />
        <TextField label="Email" name="email" type="email" defaultValue={member?.email} />
        <TextField label="Website" name="website" type="url" defaultValue={member?.website} />
        <TextField label="LinkedIn" name="linkedin" type="url" defaultValue={member?.linkedin} />
        <TextField label="Instagram" name="instagram" type="url" defaultValue={member?.instagram} />
        <TextField label="Facebook" name="facebook" type="url" defaultValue={member?.facebook} />
        <TextField label="Google Maps Link" name="google_maps_link" type="url" defaultValue={member?.google_maps_link} />
      </div>

      <TextAreaField label="Address" name="address" defaultValue={member?.address} rows={2} />

      <SubmitButton>{member ? "Save Changes" : "Add Member"}</SubmitButton>
    </form>
  );
}
