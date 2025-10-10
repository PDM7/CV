import { AvatarUpload } from "../components/form/Avatar";
import { CurriculumHeader } from "../components/Header";

export function UserDetails() {

  return (
    <div className="border rounded-2xl p-8 border-base-300 bg-base-100 m-5 text-base-content">
      <h1 className="font-medium mb-5">Detalhes do usuário (obrigatório)</h1>

      <div className="flex items-start gap-6 mb-4">
        <AvatarUpload />
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <input type="text" placeholder="a" className="input input-bordered w-full" />
            <input type="text" placeholder="b" className="input input-bordered w-full" />
          </div>
          <div className="flex gap-4">
            <input type="text" placeholder="a" className="input input-bordered w-full" />
            <input type="text" placeholder="b" className="input input-bordered w-full" />
          </div>
        </div>
      </div>

      <textarea
        placeholder="Digite mais informações..."
        className="w-full border rounded px-3 py-2 resize-none border-base-300 bg-base-200 text-base-content"
        rows={4}
      />
    </div>
  );
}

export function FormPage() {
  return (
    <main className="min-h-screen bg-base-300">
      <CurriculumHeader />
      <UserDetails />
    </main>
  );
}

export default FormPage;
