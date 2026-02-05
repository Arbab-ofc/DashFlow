import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../services/userService";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProfile({ name, email });
      setUser(updated);
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div id="top" className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
        <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

        <div className="grid gap-6 px-4 pb-8 pt-8">
          <section className="rounded-[28px] bg-black/70 px-6 py-8 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Profile</p>
              <h1 className="text-3xl font-semibold font-monoDisplay">Account control</h1>
              <p className="text-sm text-white/70">Manage your personal details and access info.</p>
            </div>
          </section>

          <section className="rounded-[28px] bg-[#141218] p-6 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Profile details</h2>
              <p className="text-sm text-white/60">Update your name and email address.</p>
            </div>
            <div className="grid gap-4">
              <TextField
                label="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                  className: "!text-white",
                  style: { backgroundColor: "rgba(255,255,255,0.05)" }
                }}
                InputLabelProps={{ className: "!text-white/70" }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                  className: "!text-white",
                  style: { backgroundColor: "rgba(255,255,255,0.05)" }
                }}
                InputLabelProps={{ className: "!text-white/70" }}
              />
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                  className="!rounded-xl !bg-white !text-[#1b1b1f]"
                >
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
