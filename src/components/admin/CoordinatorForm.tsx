import { TextField, TextAreaField, SelectField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Coordinator } from "@/types/database";

const TEAM_OPTIONS = [
  { value: "lt_team", label: "Leadership Team" },
  { value: "mc_committee", label: "MC Committee" },
  { value: "visitor_host", label: "Visitor Host Team" },
  { value: "chapter_coordinator", label: "Chapter Coordinators" },
];

export default function CoordinatorForm({
  coordinator,
  action,
}: {
  coordinator?: Coordinator;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="space-y-8">
      {coordinator && <input type="hidden" name="id" value={coordinator.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Photo</label>
        {coordinator?.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coordinator.photo_url} alt="" className="mb-2 h-20 w-20 rounded-xl object-cover" />
        )}
        <input type="file" name="photo" accept="image/*" className="text-sm" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" defaultValue={coordinator?.name} required />
        <SelectField label="Team" name="team" defaultValue={coordinator?.team} required options={TEAM_OPTIONS} />
        <TextField label="Position" name="position" defaultValue={coordinator?.position} />
        <TextField label="Company" name="company" defaultValue={coordinator?.company} />
        <TextField label="Phone" name="phone" type="tel" defaultValue={coordinator?.phone} />
        <TextField label="Email" name="email" type="email" defaultValue={coordinator?.email} />
        <TextField label="LinkedIn" name="linkedin" type="url" defaultValue={coordinator?.linkedin} />
        <TextField label="Instagram" name="instagram" type="url" defaultValue={coordinator?.instagram} />
        <TextField label="Facebook" name="facebook" type="url" defaultValue={coordinator?.facebook} />
      </div>

      <TextAreaField label="Description" name="description" defaultValue={coordinator?.description} rows={3} />
      <TextAreaField label="Responsibilities" name="responsibilities" defaultValue={coordinator?.responsibilities} rows={3} />

      <SubmitButton>{coordinator ? "Save Changes" : "Add Coordinator"}</SubmitButton>
    </form>
  );
}
